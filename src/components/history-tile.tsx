import React from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Constants, fadeColor, getDates } from "../util";
import { useSettings } from "../hooks";

type HTrops = {
  color: string;
};
type BarProps = {
  height: number;
  date: Date;
};

const DAYS = ["S", "M", "T", "W", "T", "F", "S"];
const Bar = ({ height, date }: BarProps) => (
  <View style={styles.bar}>
    {height >= 6 && (
      <Image
        source={require("../../assets/crown.png")}
        resizeMode={"cover"}
        style={styles.crown}
      />
    )}
    <View
      style={[
        styles.barInner,
        {
          height: `${15 * Math.min(6, height)}%`,
        },
      ]}
    />
    {/* <Text style={styles.barDay}>{DAYS[date.getDay()]}</Text> */}
  </View>
);

const Tile = ({ color }: HTrops) => {
  const { completionHistory } = useSettings();

  return (
    <LinearGradient
      start={[0, 0]}
      end={[1, 1]}
      colors={[fadeColor(color), color]}
      style={styles.gradient}
    >
      <Text style={styles.title}>HISTORY</Text>
      <View style={styles.history}>
        {getDates(13).map((d) => (
          <Bar date={new Date(d)} height={completionHistory[d] || 0} />
        ))}
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  barInner: {
    width: 5,
    backgroundColor: "#fff9",
    minHeight: 2,
  },
  crown: {
    height: "10%",
    width: "100%",
    opacity: 0.5,
  },
  bar: {
    width: "7%",
    height: "100%",
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  barDay: {
    fontFamily: "Lato Black",
    color: "#fffc",
    width: "100%",
    textAlign: "center",
    fontSize: 9,
    marginTop: 2,
  },
  history: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "flex-end",
    top: "20%",
    left: "10%",
    width: "80%",
    height: "70%",
    position: "absolute",
  },
  gradient: {
    height: "50%",
    width: "50%",
    flexDirection: "column",
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
