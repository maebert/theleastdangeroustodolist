import React from "react";
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  TouchableHighlight,
} from "react-native";
import { useTheme } from "../hooks/themes";
import { Theme, ThemeDef } from "../types";
import { Constants } from "../util";

const AvailableThemes = [
  Theme.Default,
  Theme.Dark,
  Theme.Clear,
  Theme.Haze,
  Theme.Floss,
  Theme.NotOk,
  Theme.Pride,
];

type SingleSwatchProps = {
  name: string;
  colors: ThemeDef;
  active: boolean;
  onPress: () => any;
};

const SingleSwatch = ({ name, colors, active, onPress }: SingleSwatchProps) => (
  <View style={styles.swatchView}>
    <TouchableHighlight
      style={[styles.swatch, active && styles.activeSwatch]}
      onPress={onPress}
    >
      <>
        {colors.map((c) => (
          <View
            key={c}
            style={[
              styles.stripe,
              active && styles.activeStripe,
              { backgroundColor: c },
            ]}
          />
        ))}
        <Text style={styles.label}>{name}</Text>
      </>
    </TouchableHighlight>
  </View>
);

type SwatchProps = {
  onChoose: () => any;
};

const Swatch = ({ onChoose }: SwatchProps) => {
  const { themeName, setTheme, colors } = useTheme();

  const pickTheme = (theme: Theme) => {
    setTheme(theme);
    onChoose();
  };

  return (
    <View style={styles.container}>
      {AvailableThemes.map((o) => (
        <SingleSwatch
          active={themeName === o}
          onPress={() => pickTheme(o)}
          key={o}
          name={o} //Theme[o] as string
          colors={colors[o]}
        />
      ))}
    </View>
  );
};

export default Swatch;

const stripeHeight = (Constants.screenWidth - 60) / 12;

const styles = StyleSheet.create({
  container: {
    marginTop: 60,
    marginLeft: 20,
    width: Constants.screenWidth - 20,
    flexWrap: "wrap",
    flexDirection: "column",
    alignContent: "stretch",
  },
  swatchView: {
    shadowRadius: 8,
    shadowColor: "black",
    shadowOffset: { height: 6, width: 0 },
    shadowOpacity: 0.4,
    height: stripeHeight * 6,
    width: stripeHeight * 6,
    marginRight: 20,
    marginBottom: 20,
  },
  stripe: {
    height: stripeHeight,
    opacity: 0.6,
  },
  activeStripe: {
    opacity: 1,
  },
  swatch: {
    width: "100%",
    height: "100%",
    borderRadius: 4,
    overflow: "hidden",
    backgroundColor: "white",
    opacity: 0.8,
  },
  activeSwatch: {
    opacity: 1,
    borderWidth: 4,
    borderColor: "#fffefa",
  },
  label: {
    fontFamily: "Lato Bold",
    lineHeight: stripeHeight,
    fontSize: stripeHeight * 0.8,
    textAlign: "center",
    color: "white",
    paddingHorizontal: 5,
    top: stripeHeight * 2,
    position: "absolute",
    width: "100%",
  },
});
