import * as StoreReview from "expo-store-review";

export { default as Constants } from "./constants";
export { default as Store } from "./store";
export { default as Analytics } from "./analytics";
import convert from "color-convert";

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
  if (status) StoreReview.requestReview();
};

export const handleAction = (action: string) => {
  action = action.replace("tldtdl://", "");
  if (action === "review") requestReview();
};
