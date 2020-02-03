import React from "react";
import { Text, View, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import Palette from "./palette";

const options = {
    default: "Least Dangerous",
    haze: "Toxic Fumes",
    floss: "Floss Daily",
    clear: "Cease & Desist",
    pride: "The Letter People",
    lsd: "I think it's working",
}

const Swatch = ({ name, colors, active, onPress }) => (
    <View
        style={styles.swatchView}
    >
        <TouchableOpacity style={[styles.swatch, active && styles.activeSwatch]} overflow="hidden" onPress={onPress}>
            {colors.map(c => (
                <View key={c} style={{ backgroundColor: c, height: 20 }} />
            ))}
        </TouchableOpacity>
        <Text style={styles.label}>{name}</Text>
    </View>
);

export default ({active, onChoose }) => (
    <View style={styles.container}>
        <ScrollView horizontal={true} snapToInterval={140} decelerationRate="fast" showsHorizontalScrollIndicator={false}>
        {Object.keys(options).map(o => <Swatch active={active===o} onPress={() => onChoose(o)} key={o} name={options[o]} colors={Palette[o]} />)}
        </ScrollView>
    </View>
);

const styles = StyleSheet.create({
    container: {
        height: 150,
        marginTop: 20
    },
    swatchView: {
        marginRight: 20,
    },
    swatch: {
        shadowRadius: 4,
        shadowColor: 'black',
        shadowOffset: {height: 4, width: 0},
        shadowOpacity: .2,
        width: 120,
        height: 120,
        borderRadius: 4,
        overflow: "hidden",
        backgroundColor: "white",
    },
    activeSwatch: {
        borderWidth: 3,
        borderColor: "#51565e"
    },
    label: {
        fontFamily: "Lato Bold",
        textAlign: "center",
        marginTop: 10,
        color: "#51565e"
    }
});
