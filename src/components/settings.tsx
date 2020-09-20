import React, { useState } from "react";
import { Text, View, Button, StyleSheet } from "react-native";
import { Constants } from "../util";
import { useSettings, useTheme } from "../hooks";
import Tile from "./tile";

type SettingsProps = {
  onReshuffle: () => any;
  onShowThemes: () => any;
  onShowIAP: () => any;
};

const Settings = ({ onReshuffle, onShowThemes, onShowIAP }: SettingsProps) => {
  const { debug, hardcore, addTodo, dispatch } = useSettings();
  const { theme, themeName } = useTheme();

  return (
    <View style={{ ...styles.container, backgroundColor: theme[0] }}>
      <View
        style={{
          marginTop: Constants.statusBarHeight + 40,
          paddingHorizontal: 30,
          flex: 1,
        }}
      >
        <Text style={styles.title}>
          The Least{"\n"}Dangerous{"\n"}To-Do List
        </Text>
        <Text style={styles.subtitle}>
          A charmingly antagonistic app{"\n"}by Kari Tarr & Manu Ebert
        </Text>
      </View>

      {(debug || Constants.debug) && (
        <View style={{ marginBottom: 40 }}>
          <Button onPress={onReshuffle} title="Gimme something new" />
          <Button
            onPress={() => dispatch({ hardcore: !hardcore })}
            title="Toggle Hardcore"
          />
        </View>
      )}

      <View
        style={{
          // flex: 1,
          height: Constants.screenWidth,
          flexWrap: "wrap",
          flexDirection: "column",
          alignContent: "stretch",
        }}
      >
        <Tile
          title="THEME"
          text={themeName}
          color={theme[2]}
          onClick={onShowThemes}
        />
        <Tile
          title="CUSTOM TO-DOs"
          text={addTodo ? "On" : "Off"}
          img={!hardcore && require("../../assets/lock.png")}
          color={theme[4]}
          onClick={() =>
            hardcore ? dispatch({ addTodo: !addTodo }) : onShowIAP()
          }
        />
        <Tile
          title="HARDCORE PASS"
          text={hardcore ? "F*CK YEAH" : "Nope."}
          img={hardcore && require("../../assets/fuckyeah.png")}
          color={theme[3]}
          onClick={onShowIAP}
        />
        <Tile title="PACK" text="Basic" color={theme[5]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: -Constants.screenHeight,
    height: Constants.screenHeight,
    width: "100%",
    justifyContent: "center",
  },
  title: {
    fontFamily: "Lato Black",
    color: "#fffefa",
    textAlign: "left",
    fontSize: 48,
    margin: 0,
    lineHeight: 48,
    letterSpacing: 0.7,
  },
  subtitle: {
    textAlign: "left",
    fontFamily: "Lato Regular",
    color: "#fffefa",
    opacity: 0.8,
    letterSpacing: 0.1,
    marginTop: 10,
    fontSize: 14,
  },
});

export default Settings;