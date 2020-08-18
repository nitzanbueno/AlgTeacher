import React, { FC } from "react";
import FirstUsageModal from "./FirstUsageModal";
import { StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Button from "./Button";

const styles = StyleSheet.create({
    helpModal: {
        backgroundColor: "white",
        height: "85%",
        borderRadius: 10,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    helpModalTextContainer: {
        width: "100%",
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 20,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        backgroundColor: "#eee",
    },
});

const HelpModal: FC<{ openKey: string }> = props => (
    <FirstUsageModal openKey={props.openKey} animationIn="zoomIn" animationOut="fadeOut" animationInTiming={250}>
        {close => (
            <View style={styles.helpModal}>
                <ScrollView style={styles.helpModalTextContainer}>{props.children}</ScrollView>
                <Button
                    style={{ width: "80%", backgroundColor: "transparent", marginBottom: 10, marginTop: 10 }}
                    textStyle={{ color: "#00897b", fontWeight: "bold", fontSize: 20 }}
                    onPress={close}
                    title="CLOSE"
                />
            </View>
        )}
    </FirstUsageModal>
);

export default HelpModal;
