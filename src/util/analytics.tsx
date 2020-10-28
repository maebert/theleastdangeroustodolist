import * as Segment from "expo-analytics-segment";
import * as Sentry from "@sentry/react-native";
import * as Application from "expo-application";
import * as manifest from "../../app.json";
import Constants from "expo-constants";

if (!Constants.manifest) {
  Constants.manifest = manifest.expo;
}

const events = {
  OPEN_IAP: "open IAP",
  WRITE: "Write To-Do",
  GET_MORE: "Get more todos",
  SETTINGS: "Open Settings",
  COMPLETE: "Complete To-Do",
  UNDO: "Undo To-Do",
  PICK_THEME: "Pick Theme",
  COMPLETE_TUTORIAL: "Complete Tutorial",
  ASK_NOTIFICATION: "Ask for notification permissions",
  ASK_REVIEW: "Ask for AppStore Review",
};

let segmentInitialized = false;
let sentryInitialized = false;

const segmentApiKey = "iM8Q5IFh4sxYndv8jayYX9wscSdxdghv";
const sentryApiKey =
  "https://6f7c52e459bd40318c91ed8fd4ab7382@o348404.ingest.sentry.io/2213171";

const initializesegment = () => {
  Segment.initialize({
    androidWriteKey: segmentApiKey,
    iosWriteKey: segmentApiKey,
  });
  segmentInitialized = true;
};

const initializeSentry = () => {
  const sentryOptions = {
    dsn: sentryApiKey,
    debug: true,
    enableAutoSessionTracking: true,
  };
  try {
    Sentry.init(sentryOptions);
  } catch {
    Sentry.init({ enableNative: false, ...sentryOptions });
  }
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
  Sentry.captureMessage(event);
  if (options) {
    Segment.trackWithProperties(event, options);
  } else {
    Segment.track(event);
  }
};

const capture = (error: any) => {
  maybeInitialize();
  Sentry.captureException(error);
};

maybeInitialize();

export default { events, alias, track, capture, identify };
