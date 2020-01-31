import React from "react";
import { Text, View, Animated, Image, Button, StyleSheet } from "react-native";
import Constants from "./constants";
import Swatch from "./swatch";

export default class Settings extends React.Component {
    render() {
        return (
            <View style={[styles.container, this.props.style]}>
                <View style={{marginTop: Constants.statusBarHeight + 40, marginBottom: 40}}>
                    <Text style={styles.title}>The Least</Text>
                    <Text style={[styles.title, styles.titleBold]}>Dangerous</Text>
                    <Text style={styles.title}>To-Do list</Text>
                    <Text style={styles.subtitle}>
                        A charmingly antagonistic app{"\n"}by Kari Tarr & Manu Ebert
                    </Text>
                </View>
                <View style={{flex: 1}}>
                <Swatch
                    onChoose={id => this.props.onPickPalette(id)}
                    active={this.props.activePalette}
                />
                </View>
                <View style={{ marginBottom: 40 }}>
                <Button
                    onPress={this.props.onReshuffle}
                    title="Gimme something new"

                />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: Constants.screenHeight,
        width: "100%",
        backgroundColor: "#fffefa",
        justifyContent: "center",
        paddingHorizontal: 30
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
        color: "#f45654",

    },
    subtitle: {
        textAlign: "left",
        fontFamily: "Lato Regular",
        color: "#51565e",
        fontWeight: "400",
        marginTop: 20,
        fontSize: 18
    }
});
