import React, { useState } from "react";
import { Text, View, Button, StyleSheet } from "react-native";
import { Constants } from "../util";
import { useSettings, useTheme } from "../hooks";
import { Swatch, Tile } from ".";
import Modal from "react-native-modal";

type SettingsProps = {
  onReshuffle: () => any;
};

const Settings = ({ onReshuffle }: SettingsProps) => {
  const { debug, addTodo, dispatch } = useSettings();
  const { theme, themeName } = useTheme();
  const [showThemes, setShowThemes] = useState(false);

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

      <View style={{ marginBottom: 40 }}>
        {debug && <Button onPress={onReshuffle} title="Gimme something new" />}
      </View>

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
          onClick={() => setShowThemes(true)}
        />
        <Tile
          title="CUSTOM TO-DOs"
          text={addTodo ? "On" : "Off"}
          color={theme[3]}
          onClick={() => dispatch({ addTodo: !addTodo })}
        />
        <Tile title="HARDCORE PASS" text="Nope" color={theme[4]} />
        <Tile title="PACK" text="Basic" color={theme[5]} />
      </View>
      <Modal
        isVisible={showThemes}
        onBackdropPress={() => setShowThemes(false)}
        backdropColor={theme[0]}
        animationIn="zoomIn"
        animationOut="fadeOut"
        backdropOpacity={1}
        animationInTiming={200}
        backdropTransitionInTiming={600}
        backdropTransitionOutTiming={0}
        style={{ margin: 0 }}
        hideModalContentWhileAnimating={true}
      >
        <Swatch onChoose={() => setShowThemes(false)} />
      </Modal>
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
