import React from "react";
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Colors, { Theme, ThemeDef } from "./themes";

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
    <TouchableOpacity
      style={[styles.swatch, active && styles.activeSwatch]}
      onPress={onPress}
    >
      {colors.map((c) => (
        <View key={c} style={{ backgroundColor: c, height: 20 }} />
      ))}
      <Text style={styles.label}>{name}</Text>
    </TouchableOpacity>
  </View>
);

type SwatchProps = {
  active: Theme;
  onChoose: (theme: Theme) => any;
};

const Swatch = ({ active, onChoose }: SwatchProps) => (
  <View style={styles.container}>
    <ScrollView
      horizontal={true}
      snapToInterval={140}
      decelerationRate="fast"
      showsHorizontalScrollIndicator={false}
    >
      {AvailableThemes.map((o) => (
        <SingleSwatch
          active={active === o}
          onPress={() => onChoose(o)}
          key={o}
          name={o} //Theme[o] as string
          colors={Colors[o]}
        />
      ))}
    </ScrollView>
  </View>
);

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
    opacity: 0.6,
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
