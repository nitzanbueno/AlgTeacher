import React, { FC, useState, useEffect, ReactNode } from "react";
import Modal, { ModalProps } from "react-native-modal";
import AsyncStorage from "@react-native-community/async-storage";

interface FirstUsageModalProps extends Partial<ModalProps> {
    /**
     * The key to test if this is the first open of this modal.
     */
    openKey: string;

    children: (close: () => void) => ReactNode;
}

/**
 * A modal that is shown only on the first time the user opens the page (i.e. mounts this component).
 * The state of the first open is stored in async storaged using the given key.
 */
const FirstUsageModal: FC<Omit<FirstUsageModalProps, "isVisible">> = props => {
    const { openKey, children, ...modalProps } = props;

    const [isVisible, setIsVisible] = useState(false);

    async function openIfFirstUsage() {
        const shouldShow = await AsyncStorage.getItem(openKey);

        if (shouldShow === null || shouldShow === "true") {
            setIsVisible(true);
            await AsyncStorage.setItem(openKey, "false");
        }
    }

    function close() {
        setIsVisible(false);
    }

    useEffect(() => {
        openIfFirstUsage();
    }, [openKey]);

    return (
        <Modal
            {...modalProps}
            onBackButtonPress={close}
            isVisible={isVisible}
            backdropTransitionOutTiming={0} // This fixes flickering when leaving the modal
        >
            {children(close)}
        </Modal>
    );
};

export default FirstUsageModal;
