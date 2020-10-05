import React, { useRef, useEffect, useState } from "react";
import { Animated, View, Text, StyleSheet, Image, Easing } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Analytics, Constants } from "../util";
import { useTheme, useSettings } from "../hooks";
import ConfettiCannon from "react-native-confetti-cannon";
import Ripple from "react-native-material-ripple";

type EODProps = {
  visible: boolean;
  onClick: () => any;
};

const EndOfDay = ({ visible, onClick }: EODProps) => {
  const [shouldRender, setRender] = useState(visible);
  const [showConfetti, setShowConfetti] = useState(true);
  const opacity = useRef(new Animated.Value(0)).current;
  const translateMore = useRef(new Animated.Value(140)).current;

  const { theme, greys } = useTheme();
  const { hardcore } = useSettings();

  useEffect(() => {
    if (visible) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5200);
      Animated.timing(opacity, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      }).start();
      Animated.timing(translateMore, {
        toValue: 0,
        easing: Easing.elastic(1.1),
        duration: 3000,
        delay: 4000,
        useNativeDriver: true,
      }).start();
      setRender(true);
    } else {
      Animated.timing(opacity, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        translateMore.setValue(140);
        setRender(false);
      });
    }
  }, [visible]);

  useEffect(() => {
    if (visible) {
      setRender(true);
      translateMore.setValue(0);
      opacity.setValue(1);
      setShowConfetti(false);
    }
  }, []);

  if (!shouldRender) return null;

  const getMore = () => {
    Analytics.track(Analytics.events.GET_MORE, { hardcore });
    onClick();
  };

  return (
    <Animated.View
      style={{
        opacity,
        position: "absolute",
        top: 0,
        left: 0,
        height: Constants.screenHeight,
        width: Constants.screenWidth,
      }}
    >
      <LinearGradient
        start={[1, 0]}
        end={[1, 1]}
        colors={[greys[0], greys[5]]}
        style={styles.container}
      >
        {showConfetti && (
          <ConfettiCannon
            count={300}
            origin={{ x: Constants.screenWidth / 2, y: 0 }}
            colors={theme}
            explosionSpeed={500}
            fallSpeed={4000}
            fadeOut={true}
          />
        )}
        <View style={{ flex: 1 }} />
        <Text style={styles.text}>
          You're done for today.{"\n"}Check back tomorrow.
        </Text>
        <View style={{ flex: 1 }} />
        <View>
          <Animated.View
            style={{
              transform: [{ translateY: translateMore }],
            }}
          >
            <Ripple
              style={styles.more}
              rippleColor={greys[0]}
              rippleOpacity={1}
              rippleCentered={true}
              rippleDuration={600}
              onPress={getMore}
            >
              {!hardcore && (
                <Image
                  source={require("../../assets/tinylock.png")}
                  style={styles.morelock}
                />
              )}
              <Text style={styles.moretext}>But I want more</Text>
            </Ripple>
          </Animated.View>
        </View>
      </LinearGradient>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 0,
    height: "100%",
    paddingHorizontal: 30,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  text: {
    textAlign: "center",
    color: "#fffefaaa",
    width: "100%",
    fontFamily: "Lato Bold",
    fontSize: 24,
  },
  more: {
    backgroundColor: "#fffd",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 50,
    paddingVertical: 12,
    paddingHorizontal: 32,
    marginTop: 40,
    marginBottom: 60,
    shadowColor: "#000",
    textAlign: "center",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 12,
  },
  morelock: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  moretext: {
    color: "#36494E",
    fontFamily: "Lato Bold",
    fontSize: 20,
  },
  firstTodo: {
    paddingTop: Constants.statusBarHeight,
    height: Constants.itemHeight + Constants.statusBarHeight,
  },
});

export default EndOfDay;
