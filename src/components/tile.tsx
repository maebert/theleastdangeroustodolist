import React, { useRef } from "react";
import {
  Text,
  Animated,
  Easing,
  StyleSheet,
  ImageSourcePropType,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { fadeColor, rippleColor } from "../util";
import Ripple from "react-native-material-ripple";
import * as Haptics from "expo-haptics";

type TileProps = {
  title: string;
  text: string;
  color: string;
  img?: ImageSourcePropType;
  onClick: () => any | null;
};

const Tile = ({ title, color, text, img, onClick }: TileProps) => {
  const wob = useRef(new Animated.Value(0)).current;
  const wobble = () => {
    Animated.timing(wob, {
      toValue: 1 - Math.random() * 2,
      duration: 600,
      easing: Easing.elastic(5),
      useNativeDriver: true,
    }).start(() =>
      Animated.timing(wob, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start()
    );
  };
  return (
    <LinearGradient
      start={[0, 0]}
      end={[1, 1]}
      colors={[fadeColor(color), color]}
      style={styles.gradient}
    >
      <Ripple
        style={styles.inner}
        rippleColor={rippleColor(color)}
        rippleOpacity={1}
        rippleCentered={true}
        rippleDuration={600}
        onPress={() => {
          if (onClick) {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            onClick();
          } else {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
            wobble();
          }
        }}
      >
        <Text style={styles.title}>{title}</Text>

        {img && (
          <Animated.Image
            source={img}
            resizeMode={"cover"}
            style={[
              styles.fuckyeah,
              {
                transform: [
                  {
                    rotate: wob.interpolate({
                      inputRange: [-1, 0, 1],
                      outputRange: ["30deg", "0deg", "-20deg"],
                    }),
                  },
                  {
                    scale: wob.interpolate({
                      inputRange: [-1, -0.3, 0, 0.3, 1],
                      outputRange: [1.4, 1.2, 1, 1.2, 1.4],
                    }),
                  },
                ],
              },
            ]}
          />
        )}
        <Text style={styles.text}>{text}</Text>
      </Ripple>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  inner: {
    width: "100%",
    height: "100%",
  },
  gradient: {
    height: "50%",
    width: " 50%",
  },
  fuckyeah: {
    opacity: 0.9,
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
  },
  title: {
    fontFamily: "Lato Regular",
    color: "#fffefa",
    letterSpacing: 1.05,
    marginTop: "10%",
    fontSize: 14,
    opacity: 0.8,
    paddingTop: "5%",
    paddingHorizontal: "10%",
  },
  text: {
    fontFamily: "Lato Black",
    color: "#fffefa",
    fontSize: 28,
    marginTop: 6,
    paddingHorizontal: "10%",
  },
  extra: {
    fontFamily: "Lato Black",
    color: "#fffefacc",
    fontSize: 80,
    lineHeight: 80,
    transform: [{ rotate: "-25deg" }, { translateX: 15 }, { translateY: -15 }],
  },
});

export default Tile;
