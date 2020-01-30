import React from "react";
import { Text, View, Animated, Image, Button } from "react-native";
import Constants from "./constants";

export default class Settings extends React.Component {
    render() {
        return (
            <View
                style={[
                    {
                        height: Constants.screenHeight,
                        width: "100%",
                        // flex: 1,
                        backgroundColor: "#D39070FF",
                        justifyContent: "center",
                        paddingHorizontal: 30,
                    },
                    this.props.style
                ]}
            >
                <Text style={{
                    textAlign: "center",
                    fontWeight: "700",
                    fontSize: 40,
                }}>The Least Dangerous{"\n"}To Do List</Text>
                <Text style={{
                    textAlign: "center",
                    fontWeight: "400",
                    marginTop: 20,
                    fontSize: 18,
                }}>A charmingly antagonistic app{"\n"}by Kari Tarr & Manu Ebert</Text>
                <Button onPress={this.props.onReshuffle} title="Gimme something new" />
            </View>
        );
    }
}
