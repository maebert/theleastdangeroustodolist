import { Animated } from "react-native";
import { Pack } from "./generated/data";

export type Line = {
  todo: number | null;
  startX: number | Animated.Value;
  startY: number | Animated.Value;
  length: number | Animated.Value;
  direction: boolean;
  style: number;
};

export enum Theme {
  Default = "Least\nDangerous",
  Haze = "Toxic\nFumes",
  Floss = "Floss\nDaily",
  Clear = "Cease &\nDesist",
  Pride = "The Letter People",
  Dark = "Darkwad",
  NotOk = "Ok, not Ok",
  Greys = "Why bother",
}
export type ThemeDef = [string, string, string, string, string, string, string];

export type TodoData = {
  index: number;
  text: string;
  done: boolean;
  pack: Pack;
};