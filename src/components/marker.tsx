import React from "react";
import { Animated, Image } from "react-native";
import { Constants } from "../util";
import { Line } from "../types";

const Marker = ({ startX, startY, length, direction, style }: Line) => (
  <Animated.View
    style={[
      {
        height: (Constants.screenWidth - 80) / 10,
        width: length,
        position: "absolute",
        top: startY,
      },
      direction ? { left: startX } : { right: startX },
    ]}
    overflow="hidden"
    pointerEvents="none"
  >
    <Image
      source={require("../../assets/line1.png")}
      resizeMode={"cover"}
      style={[
        {
          opacity: 0.9,
          width: Constants.screenWidth - 80,
          height: ((Constants.screenWidth - 80) * 6) / 10,
          position: "absolute",
          top: 0,
          transform: [
            {
              translateY: (-(Constants.screenWidth - 80) / 10) * style,
            },
            { rotateY: direction ? "0deg" : "180deg" },
          ],
        },
        direction ? { left: 0 } : { right: 0 },
      ]}
    />
  </Animated.View>
);

export default Marker;
