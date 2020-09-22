import * as StoreReview from "expo-store-review";
import * as Notifications from "expo-notifications";

export { default as scheduleNotifications } from "./notifications";
export { default as Constants } from "./constants";
export { default as Store } from "./store";
export { default as Analytics } from "./analytics";
import convert from "color-convert";
import Analytics from "./analytics";

const mod = (n: number, m: number) => ((n % m) + m) % m;

export const fadeColor = (color: string) => {
  const [h, s, l] = convert.hex.hsl(color);
  return "#" + convert.hsl.hex(mod(h - 5, 360), s, l * 1.05);
};
export const rippleColor = (color: string) => {
  const [h, s, l] = convert.hex.hsl(color);
  return "#" + convert.hsl.hex(mod(h - 15, 360), s, l * 1.25);
};

const requestReview = async () => {
  const status = StoreReview.isAvailableAsync();
  Analytics.track(Analytics.events.ASK_REVIEW);
  if (status) await StoreReview.requestReview();
};

const requestNotifications = async () => {
  const result = await Notifications.requestPermissionsAsync({
    ios: {
      allowAlert: true,
      allowBadge: true,
    },
  });
  Analytics.track(Analytics.events.ASK_NOTIFICATION, result);
};

export const handleAction = (action: string) => {
  action = action.replace("ldtdl://", "");
  if (action === "review") requestReview();
  if (action === "notif") requestNotifications();
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
