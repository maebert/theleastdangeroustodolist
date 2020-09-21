import React from "react";
import Swatch from "./swatch";
import { ScrollView, View } from "react-native";
import Modal from "react-native-modal";

type ModalType = {
  visible: boolean;
  onHide: () => any;
  color: string;
};

const SwatchModal = ({ visible, onHide, color }: ModalType) => (
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
    style={{ margin: 0 }}
    hideModalContentWhileAnimating={true}
  >
    <ScrollView
      style={{
        width: "100%",
      }}
    >
      <Swatch onChoose={onHide} />
    </ScrollView>
  </Modal>
);

export default SwatchModal;
