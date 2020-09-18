/**
 * @flow
 */

import * as Segment from "expo-analytics-segment";
// import * as Sentry from "sentry-expo";
import * as Application from "expo-application";
import * as manifest from "../../app.json";
import Constants from "expo-constants";

if (!Constants.manifest) {
  Constants.manifest = manifest.expo;
}

const events = {
  COMPLETE: "Complete To Do",
  PICK_THEME: "Pick Theme",
  COMPLETE_TUTORIAL: "Complete Tutorial",
};

let segmentInitialized = false;
let sentryInitialized = false;

const segmentApiKey = "iM8Q5IFh4sxYndv8jayYX9wscSdxdghv";
const sentryApiKey =
  "https://6f7c52e459bd40318c91ed8fd4ab7382@sentry.io/2213171";

// Sentry.init({
//   dsn: sentryApiKey,
//   enableInExpoDevelopment: false,
//   debug: true,
// });

const initializesegment = () => {
  Segment.initialize({
    androidWriteKey: segmentApiKey,
    iosWriteKey: segmentApiKey,
  });
  segmentInitialized = true;
};

const initializeSentry = () => {
  // Sentry.init({
  //   dsn: sentryApiKey,
  //   enableInExpoDevelopment: false,
  //   debug: true,
  // });
  sentryInitialized = true;
};

const maybeInitialize = () => {
  if (!segmentInitialized) initializesegment();
  if (!sentryInitialized) initializeSentry();
};

const identify = async (id?: string) => {
  const idForVendor = await Application.getIosIdForVendorAsync();
  maybeInitialize();
  Segment.identify(id || idForVendor || "anonymous");
};

const alias = (id: string) => {
  maybeInitialize();
  Segment.alias(id);
};

const track = (event: string, options: any = null) => {
  maybeInitialize();
  if (options) {
    Segment.trackWithProperties(event, options);
  } else {
    Segment.track(event);
  }
};

const capture = (error: any) => {
  maybeInitialize();
  // Sentry.captureException(error);
};

maybeInitialize();

export default { events, alias, track, capture, identify };
