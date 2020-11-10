import * as StoreReview from "expo-store-review";
import * as Notifications from "expo-notifications";

export { default as scheduleNotifications } from "./notifications";
export { default as Constants } from "./constants";
export { default as Store } from "./store";
export { default as Analytics } from "./analytics";
import { Alert as NativeAlert } from "react-native";

import convert from "color-convert";
import scheduleNotifications from "./notifications";
import Analytics from "./analytics";

const mod = (n: number, m: number) => ((n % m) + m) % m;

export const fadeColor = (color: string) => {
  const [h, s, l] = convert.hex.hsl(color);
  return "#" + convert.hsl.hex([mod(h - 5, 360), s, l * 1.05 + 3]);
};
export const rippleColor = (color: string) => {
  const [h, s, l] = convert.hex.hsl(color);
  return "#" + convert.hsl.hex([mod(h - 15, 360), s, l * 1.25]);
};

export const requestReview = async () => {
  const status = StoreReview.isAvailableAsync();
  Analytics.track(Analytics.events.ASK_REVIEW);
  if (status) await StoreReview.requestReview();
};

export const requestNotifications = async () => {
  const result = await Notifications.requestPermissionsAsync({
    ios: {
      allowAlert: true,
      allowBadge: true,
    },
  });
  Analytics.track(Analytics.events.ASK_NOTIFICATION, result);
  scheduleNotifications();
};

const dateToString = (date: Date) =>
  `${date.getFullYear()}-${date.getMonth() < 9 ? "0" : ""}${
    date.getMonth() + 1
  }-${date.getDate() < 9 ? "0" : ""}${date.getDate()}`;

export const getDate = () => {
  // Fuck javascript. Fuck it in the date hole.
  return dateToString(new Date());
};

export const getDates = (days: number) => {
  let dates = [],
    endDate = new Date(),
    addDays = function (days: number) {
      var date = new Date(this?.valueOf());
      date.setDate(date.getDate() + days);
      return date;
    };
  let startDate = new Date();
  startDate.setDate(startDate.getDate() - days);
  let currentDate = startDate;

  while (currentDate <= endDate) {
    dates.push(currentDate);
    currentDate = addDays.call(currentDate, 1);
  }

  return dates.map(dateToString);
};

export const AsyncAlert = (title: string, msg: string) =>
  new Promise((resolve, reject) => {
    NativeAlert.alert(
      title,
      msg,
      [
        {
          text: "OK",
          onPress: () => {
            resolve();
          },
        },
      ],
      {
        cancelable: false,
      }
    );
  });
