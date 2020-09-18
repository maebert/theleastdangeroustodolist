import React from "react";
import Swatch from "./swatch";
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
    <Swatch onChoose={onHide} />
  </Modal>
);

export default SwatchModal;
