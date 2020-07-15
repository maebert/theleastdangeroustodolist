import React from "react";
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Themes from "./themes";

const options = {
  default: "Least\nDangerous",
  haze: "Toxic\nFumes",
  floss: "Floss\nDaily",
  clear: "Cease &\nDesist",
  pride: "The Letter People",
  lsd: "I think\nit's working",
};

const Swatch = ({ name, colors, active, onPress }) => (
  <View style={styles.swatchView}>
    <TouchableOpacity
      style={[styles.swatch, active && styles.activeSwatch]}
      overflow="hidden"
      onPress={onPress}
    >
      {colors.map((c) => (
        <View key={c} style={{ backgroundColor: c, height: 20 }} />
      ))}
      <Text style={styles.label}>{name}</Text>
    </TouchableOpacity>
  </View>
);

export default ({ active, onChoose }) => (
  <View style={styles.container}>
    <ScrollView
      horizontal={true}
      snapToInterval={140}
      decelerationRate="fast"
      showsHorizontalScrollIndicator={false}
    >
      {Object.keys(options).map((o) => (
        <Swatch
          active={active === o}
          onPress={() => onChoose(o)}
          key={o}
          name={options[o]}
          colors={Themes[o]}
        />
      ))}
    </ScrollView>
  </View>
);

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
