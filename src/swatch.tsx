import React from "react";
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  TouchableHighlight,
} from "react-native";
import { useTheme, Theme, ThemeDef } from "./themes";

const AvailableThemes = [
  Theme.Default,
  Theme.Clear,
  Theme.Haze,
  Theme.LSD,
  Theme.Pride,
  Theme.Floss,
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
          <View key={c} style={{ backgroundColor: c, height: 20 }} />
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

  console.log(AvailableThemes.map((o) => [o, themeName === o]));

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal={true}
        snapToInterval={140}
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
      >
        {AvailableThemes.map((o) => (
          <SingleSwatch
            active={themeName === o}
            onPress={() => pickTheme(o)}
            key={o}
            name={o} //Theme[o] as string
            colors={colors[o]}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default Swatch;

const styles = StyleSheet.create({
  container: {
    height: 150,
    marginTop: 20,
  },
  swatchView: {
    marginRight: 20,
    shadowRadius: 4,
    shadowColor: "black",
    shadowOffset: { height: 2, width: 0 },
    shadowOpacity: 0.2,
  },
  swatch: {
    width: 120,
    height: 120,
    borderRadius: 4,
    overflow: "hidden",
    backgroundColor: "white",
    opacity: 0.5,
  },
  activeSwatch: {
    opacity: 1,
  },
  label: {
    fontFamily: "Lato Bold",
    lineHeight: 20,
    fontSize: 20,
    textAlign: "center",
    color: "white",
    paddingHorizontal: 5,
    top: 40,
    position: "absolute",
    width: "100%",
  },
});
