  /**
 * @flow
 */

import * as Segment from "expo-analytics-segment";
import * as Sentry from 'sentry-expo';

const events = {
  COMPLETE: "Complete To Do",
  PICK_THEME: "Pick Theme",
  COMPLETE_TUTORIAL: "Complete Tutorial",
};

let segmentInitialized = false;
let sentryInitialized = false;

const segmentApiKey = "iM8Q5IFh4sxYndv8jayYX9wscSdxdghv";
const sentryApiKey = "https://6f7c52e459bd40318c91ed8fd4ab7382@sentry.io/2213171";

Segment.initialize({
  androidWriteKey: segmentApiKey,
  iosWriteKey: segmentApiKey
});

Sentry.init({
  dsn: sentryApiKey,
  enableInExpoDevelopment: false,
  debug: true
});


const initializesegment = () => {
  Segment.initialize({
    androidWriteKey: segmentApiKey,
    iosWriteKey: segmentApiKey
  });
  segmentInitialized = true;
};

const initializeSentry = () => {
  Sentry.init({
    dsn: sentryApiKey,
    enableInExpoDevelopment: false,
    debug: true
  });
  sentryInitialized = true;
};

const maybeInitialize = () => {
  if (!segmentInitialized) initializesegment();
  if (!sentryInitialized) initializeSentry();
};

const identify = (id: ?string, options?: ?Object = null) => {
  maybeInitialize();
  Segment.identify();
};

const alias = (id: ?string) => {
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
  Sentry.captureException(error)
}

maybeInitialize();

export {
  events,
  alias,
  track,
  capture,
  identify
};
