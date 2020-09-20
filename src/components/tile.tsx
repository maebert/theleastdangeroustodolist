import React from "react";
import { Text, StyleSheet, Image, ImageSourcePropType } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { fadeColor, rippleColor } from "../util";
import Ripple from "react-native-material-ripple";

type TileProps = {
  title: string;
  text: string;
  color: string;
  img?: ImageSourcePropType;
  locked?: boolean;
  onClick?: () => any;
};

const Tile = ({ title, color, text, img, onClick }: TileProps) => {
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
        onPress={onClick}
      >
        <Text style={styles.title}>{title}</Text>

        {img && (
          <Image source={img} resizeMode={"cover"} style={styles.fuckyeah} />
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
