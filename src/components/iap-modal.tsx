import React from "react";
import { Text, View, Image, StyleSheet, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useIAP, useSettings } from "../hooks";
import { fadeColor, rippleColor, Constants } from "../util";
import Ripple from "react-native-material-ripple";

import Modal from "react-native-modal";

type ModalType = {
  visible: boolean;
  onHide: () => any;
  color: string;
};

const IAPModal = ({ visible, onHide, color }: ModalType) => {
  const { purchase, restorePurchases } = useIAP();
  const { hardcorePrice } = useSettings();
  return (
    <Modal
      isVisible={visible}
      onBackdropPress={onHide}
      backdropColor={color}
      animationIn="zoomIn"
      animationOut="fadeOut"
      backdropOpacity={1}
      animationInTiming={200}
      backdropTransitionInTiming={600}
      backdropTransitionOutTiming={0}
      style={styles.container}
      hideModalContentWhileAnimating={true}
    >
      <LinearGradient
        start={[0, 0]}
        end={[1, 1]}
        colors={[fadeColor(color), color]}
        style={styles.gradient}
      >
        <Image
          source={require("../../assets/crown.png")}
          resizeMode={"cover"}
          style={styles.crown}
        />
        <Text style={styles.title}>Hardcore Pass™</Text>
        <Text style={styles.p1}>
          Like to live a little more dangerously? {"\n"}
          How about buying a ridiculously{"\n"}
          overpriced Hardcore Pass™?
        </Text>
        <View style={styles.feature}>
          <Image
            source={require("../../assets/pen2.png")}
            style={styles.icon}
          />
          <Text style={styles.featureText}>Write your own To-Do</Text>
        </View>
        <View style={styles.feature}>
          <Image
            source={require("../../assets/more.png")}
            style={styles.icon}
          />
          <Text style={styles.featureText}>Never run out of stuff to do</Text>
        </View>
        <View style={styles.feature}>
          <Image
            source={require("../../assets/tinycrown.png")}
            style={styles.icon}
          />
          <Text style={styles.featureText}>
            Feel superior for “only” {hardcorePrice}
          </Text>
        </View>
        <Text style={styles.p2}>
          Is that worth the money? Absolutely not! But spending your dough on
          stuff don’t need is going to make you feel sooooo good. Plus, you’ll
          support indie developers and make the world a slightly weirder place.
        </Text>
        <Ripple
          style={styles.cancel}
          rippleColor={rippleColor(color)}
          rippleOpacity={1}
          rippleCentered={true}
          rippleDuration={600}
          onPress={onHide}
        >
          <Image
            source={require("../../assets/cancel.png")}
            style={styles.cancelInner}
          />
        </Ripple>
        <View style={{ flex: 1 }} />
        <Ripple
          style={styles.button}
          rippleColor={rippleColor(color)}
          rippleOpacity={1}
          rippleCentered={true}
          rippleDuration={600}
          onPress={async () => {
            await purchase("hardcore");
            onHide();
          }}
        >
          <Text style={styles.buttonText}>Go all in</Text>
        </Ripple>
        <TouchableOpacity
          onPress={async () => {
            await restorePurchases();
          }}
        >
          <Text style={styles.restore}>
            Already Hardcore? Restore Purchase ➜
          </Text>
        </TouchableOpacity>
      </LinearGradient>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 0,
  },
  crown: {
    height: Constants.screenHeight > 700 ? 80 : 40,
    width: Constants.screenHeight > 700 ? 80 : 40,
  },
  cancel: {
    width: 40,
    height: 40,
    position: "absolute",
    right: 20,
    top: Constants.statusBarHeight + 20,
    borderRadius: 20,
  },
  cancelInner: {
    width: "100%",
    height: "100%",
  },
  gradient: {
    height: "100%",
    width: " 100%",
    padding: 20,
    paddingTop: Constants.statusBarHeight + 20,
  },
  title: {
    color: "#ffffff",
    fontFamily: "Lato Black",
    fontSize: 30,
    letterSpacing: -1,
  },
  restore: {
    color: "#ffffffaa",
    fontFamily: "Lato Bold",
    textAlign: "center",
    marginTop: 20,
    marginBottom: Constants.screenHeight > 700 ? 20 : 10,
  },
  icon: {
    width: Constants.screenHeight > 700 ? 24 : 18,
    height: Constants.screenHeight > 700 ? 24 : 18,
    marginRight: 10,
    opacity: 0.85,
  },
  p1: {
    color: "#ffffff",
    fontFamily: "Lato Regular",
    fontSize: 20,
    marginTop: 18,
    marginBottom: 16,
    lineHeight: 30,
  },
  feature: {
    backgroundColor: "#0002",
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: Constants.screenHeight > 700 ? 16 : 12,
    paddingHorizontal: Constants.screenHeight > 700 ? 20 : 12,
    marginTop: 10,
  },
  featureText: {
    color: "#ffffff",
    fontFamily: Constants.screenHeight > 700 ? "Lato Black" : "Lato Bold",
    fontSize: Constants.screenHeight > 700 ? 20 : 18,
  },
  p2: {
    color: "#ffffffaa",
    fontFamily: "Lato Regular",
    fontSize: Constants.screenHeight > 700 ? 16 : 14,
    marginTop: 26,
    lineHeight: Constants.screenHeight > 700 ? 24 : 20,
  },
  button: {
    backgroundColor: "white",
    paddingVertical: 12,
    width: Constants.screenWidth - 80,
    shadowColor: "#000",
    textAlign: "center",
    borderRadius: 50,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 12,
    marginHorizontal: 20,
  },
  buttonText: {
    color: "#36494E",
    fontFamily: "Lato Black",
    fontSize: 20,
    textAlign: "center",
  },
});

export default IAPModal;
