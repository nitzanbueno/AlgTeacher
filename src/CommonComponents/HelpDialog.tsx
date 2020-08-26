import React, { FC, useState, useEffect } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { Portal, Dialog, Button } from "react-native-paper";
import AsyncStorage from "@react-native-community/async-storage";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    helpModal: {
        backgroundColor: "white",
        height: "85%",
        alignItems: "center",
    }
});

const HelpDialog: FC<{ openKey: string; title: string }> = props => {
    const { openKey, children, title } = props;

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
        <Portal>
            <Dialog style={styles.helpModal} visible={isVisible} onDismiss={close}>
                <Dialog.Title>{title}</Dialog.Title>
                <Dialog.ScrollArea>
                    <ScrollView>{children}</ScrollView>
                </Dialog.ScrollArea>
                <Dialog.Actions>
                    <Button children="Close" onPress={close} />
                </Dialog.Actions>
            </Dialog>
        </Portal>
    );
};

export default HelpDialog;
