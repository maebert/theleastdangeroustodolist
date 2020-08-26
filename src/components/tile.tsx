import React from "react";
import { Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import convert from "color-convert";
import Ripple from "react-native-material-ripple";

type TileProps = {
  title: string;
  text: string;
  color: string;
  onClick?: () => any;
};

const Tile = ({ title, color, text, onClick }: TileProps) => {
  const mod = (n: number, m: number) => ((n % m) + m) % m;

  const [h, s, l] = convert.hex.hsl(color);
  const fadeColor = "#" + convert.hsl.hex(mod(h - 5, 360), s, l * 1.05);
  const rippleColor = "#" + convert.hsl.hex(mod(h - 15, 360), s, l * 1.25);

  return (
    <LinearGradient
      start={[0, 0]}
      end={[1, 1]}
      colors={[fadeColor, color]}
      style={styles.gradient}
    >
      <Ripple
        style={styles.inner}
        rippleColor={rippleColor}
        rippleOpacity={1}
        rippleCentered={true}
        rippleDuration={600}
        onPress={onClick}
      >
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.text}>{text}</Text>
      </Ripple>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  inner: {
    width: "100%",
    height: "100%",
    paddingHorizontal: "6%",
    paddingVertical: "10%",
  },
  gradient: {
    height: "50%",
    width: " 50%",
  },
  title: {
    fontFamily: "Lato Regular",
    color: "#fffefa",
    letterSpacing: 1.05,
    fontSize: 14,
    opacity: 0.8,
  },
  text: {
    fontFamily: "Lato Black",
    color: "#fffefa",
    fontSize: 28,
    marginTop: 6,
  },
});

export default Tile;
