import * as Notifications from "expo-notifications";
import { sample } from "lodash";

const TITLES_DAY2 = [
  "Time to check things off",
  "Let's do this",
  "This won't hurt a bit",
  "It's check-off time",
  "Need a confidence boost?",
];

const TITLES_DAY3 = [
  "Are you seeing another to-do app...?",
  "Come back, we can work this out",
  "It's never too late to check things off",
  "Hey, I missed you yesterday",
];

const BODIES = [
  "There must be SOMETHING you already did",
  "Six brand new tasks are waiting for you",
  "We've got another six decidedly low effort tasks for you",
  "Six easy tasks the government doesn't want you to know about. Number 3 will blow your mind!",
  "If we made theses tasks any easier they'd just do themselves",
  "It's not like you're going to do anything more meaningful with your day anyway.",
];

const scheduleNotifications = async () => {
  await Notifications.cancelAllScheduledNotificationsAsync();
  let next = new Date();

  // 11:30 after 2 days of not opening
  next.setDate(next.getDate() + 2);
  next.setHours(11, 30, 0, 0);
  Notifications.scheduleNotificationAsync({
    content: {
      title: sample(TITLES_DAY2),
      body: sample(BODIES),
    },
    trigger: next,
  });

  // 16:30 after 3 days of not opening
  next.setDate(next.getDate() + 1);
  next.setHours(16, 30, 0, 0);
  Notifications.scheduleNotificationAsync({
    content: {
      title: sample(TITLES_DAY3),
      body: sample(BODIES),
    },
    trigger: next,
  });

  // 9:30 after 6 days of not opening
  next.setDate(next.getDate() + 3);
  next.setHours(9, 30, 0, 0);
  Notifications.scheduleNotificationAsync({
    content: {
      title: sample(TITLES_DAY3),
      body: sample(BODIES),
    },
    trigger: next,
  });
};

export default scheduleNotifications;
