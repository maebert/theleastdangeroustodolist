import React, { useState, useRef } from "react";
import { Text, View, StyleSheet, Image, Animated } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { rippleColor, fadeColor, getDates, getDate } from "../util";
import { useSettings } from "../hooks";
import Ripple from "react-native-material-ripple";
import { sample, without } from "lodash";

type HTrops = {
  color: string;
};
type BarProps = {
  height: number;
  date: Date;
};

const NUMBERS = ["zero", "one", "two", "three", "four", "five", "six"];
const UNUMBERS = ["Zero", "One", "Two", "Three", "Four", "Five", "Six"];
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
  const opacity = useRef(new Animated.Value(0)).current;
  const [insult, setInsult] = useState<string>("");

  const showText = () => {
    const doneToday = completionHistory[getDate()];
    let insults: string[] = [];
    if (doneToday === 0) {
      insults = insults.concat([
        "Brand new day!",
        "Rise and shine, slacker",
        "You're a... clean slate",
        "Better get going",
        "The word “Failure” comes to mind",
        "You must have done something today!",
        "Looks like you haven't done SH*T today",
        "Least Dangerous User",
        "I bet you have a great personality",
        "Did you loose your thumbs?",
      ]);
    } else if (doneToday < 6) {
      insults = insults.concat([
        `${UNUMBERS[doneToday]} down, ${NUMBERS[6 - doneToday]} to go.`,
        `Only ${NUMBERS[6 - doneToday]} left`,
        "Are you even trying?",
        "Least Dangerous User",
        "You can do better than this. Maybe.",
        "",
      ]);
    }
    if (doneToday === 5) {
      insults = insults.concat(["One more. You can do this."]);
    }
    if (doneToday === 6) {
      insults = insults.concat([
        "Gold Star ⭐️⭐️⭐️",
        "Look at you!",
        "Good job you!",
        "You're trying way too hard.",
        "Who's dynamite? You're dynamite!",
      ]);
    }

    setInsult(sample(without(insults, insult)));
    Animated.timing(opacity, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start(() => {
      Animated.timing(opacity, {
        toValue: 0,
        duration: 2000,
        useNativeDriver: true,
      }).start();
    });
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
        onPress={showText}
      >
        <Text style={styles.title}>HISTORY</Text>
        <Animated.Text style={[styles.text, { opacity: opacity }]}>
          {insult}
        </Animated.Text>
        <Animated.View
          style={[
            styles.history,
            {
              opacity: opacity.interpolate({
                inputRange: [0, 0.7, 1],
                outputRange: [1, 0.2, 0.2],
              }),
            },
          ]}
        >
          {getDates(13).map((d) => (
            <Bar
              key={d}
              date={new Date(d)}
              height={completionHistory[d] || 0}
            />
          ))}
        </Animated.View>
      </Ripple>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  inner: {
    width: "100%",
    height: "100%",
  },
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
    lineHeight: 28,
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
