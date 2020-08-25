import React from "react";
import { Text, View, Button, Switch, StyleSheet } from "react-native";
import { Constants } from "../util";
import { useSettings, useTheme } from "../hooks";
import { Swatch } from ".";

type SettingsProps = {
  onPickTheme: () => any;
  onReshuffle: () => any;
};

const Settings = ({ onPickTheme, onReshuffle }: SettingsProps) => {
  const { debug, addTodo, dispatch } = useSettings();
  const { theme } = useTheme();
  return (
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
        <Swatch onChoose={onPickTheme} />
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            borderRadius: 4,
            backgroundColor: "white",
            borderWidth: 1,
            borderColor: "#51565e33",
            padding: 8,
            shadowColor: "#0003",
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.2,
            shadowRadius: 1.41,
          }}
        >
          <View style={{ flex: 1, marginRight: 8 }}>
            <Text style={styles.hardcore}>Hardcore Mode</Text>
            <Text style={styles.hardcoreSub}>
              Lets you add one task yourself each day.
            </Text>
          </View>
          <Switch
            style={{ alignSelf: "center" }}
            trackColor={{ false: "#51565e", true: "#B64B5A" }}
            onValueChange={() => dispatch({ addTodo: !addTodo })}
            value={addTodo}
          />
        </View>
      </View>

      <View style={{ marginBottom: 40 }}>
        {debug && <Button onPress={onReshuffle} title="Gimme something new" />}
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
    backgroundColor: "#fffefa",
    justifyContent: "center",
    paddingHorizontal: 30,
  },
  hardcore: {
    fontFamily: "Lato Black",
    color: "#B64B5A",
    fontSize: 16,
    marginBottom: 4,
  },
  hardcoreSub: {
    fontFamily: "Lato Regular",
    color: "#51565e",
    opacity: 0.8,
    fontSize: 14,
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
