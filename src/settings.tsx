import React from "react";
import { Text, View, Button, StyleSheet } from "react-native";
import Constants from "./constants";
import Swatch from "./swatch";
import { Theme } from "./themes";

type SettingsProps = {
  onPickTheme: (theme: Theme) => any;
  onReshuffle: () => any;
  activeTheme: Theme;
};

const Settings = ({ onPickTheme, activeTheme, onReshuffle }: SettingsProps) => (
  <View style={styles.container}>
    <View
      style={{ marginTop: Constants.statusBarHeight + 40, marginBottom: 40 }}
    >
      <Text style={styles.title}>The Least</Text>
      <Text style={[styles.title, styles.titleBold]}>Dangerous</Text>
      <Text style={styles.title}>To Do List</Text>
      <Text style={styles.subtitle}>
        A charmingly antagonistic app{"\n"}by Kari Tarr & Manu Ebert
      </Text>
    </View>
    <View style={{ flex: 1 }}>
      <Swatch onChoose={(id: Theme) => onPickTheme(id)} active={activeTheme} />
    </View>
    <View style={{ marginBottom: 40 }}>
      <Button onPress={onReshuffle} title="Gimme something new" />
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: -Constants.screenHeight,
    height: Constants.screenHeight,
    width: "100%",
    backgroundColor: "#fffefa",
    justifyContent: "center",
    paddingHorizontal: 30,
  },
  title: {
    fontFamily: "Lato Black",
    color: "#51565e",
    textAlign: "left",
    fontSize: 48,
    margin: 0,
    lineHeight: 48,
  },
  titleBold: {
    fontFamily: "Lato Black",
    color: "#B64B5A",
  },
  subtitle: {
    textAlign: "left",
    fontFamily: "Lato Regular",
    color: "#51565e",
    fontWeight: "400",
    marginTop: 20,
    fontSize: 18,
  },
});

export default Settings;
