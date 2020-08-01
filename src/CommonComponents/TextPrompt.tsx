import React, {useEffect, FC, useState} from "react";
import {Text, View, StyleSheet, TextInput, TouchableWithoutFeedback} from "react-native";
import Modal from "react-native-modal";

const styles = StyleSheet.create({
    promptContainer: {
        backgroundColor: "white",
        borderStyle: "solid",
        borderColor: "black",
        borderWidth: 2,
        borderRadius: 10,
        padding: 5,
    },
    promptText: {
        fontSize: 20,
        textAlign: "center",
    },
    promptInput: {
        borderWidth: 1,
        borderColor: "#444",
        marginBottom: 10,
        marginTop: 10,
    },
    button: {
        backgroundColor: "#2194f2",
        height: 30,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    buttonText: {
        color: "white",
    },
});

interface Props {
    prompt: string;
    onSubmit: (result: string) => void;
    onCancel: () => void;
    visible: boolean;
}

const TextPrompt: FC<Props> = props => {
    const [input, setInput] = useState("");

    useEffect(() => setInput(""), [props.visible]);

    return (
        <Modal
            animationIn="fadeIn"
            animationOut="fadeOut"
            isVisible={props.visible}
            hideModalContentWhileAnimating={true}
            onBackdropPress={props.onCancel}
            onBackButtonPress={props.onCancel}
            backdropTransitionOutTiming={0} // This fixes flickering when leaving the modal
        >
            <View style={styles.promptContainer} key="prompt">
                <Text style={styles.promptText}>{props.prompt}</Text>
                <TextInput style={styles.promptInput} value={input} onChangeText={(value: string) => setInput(value)} />
                {/* <Button> elements render weirdly when the backdrop fades so I used a Touchable instead */}
                <TouchableWithoutFeedback onPress={() => props.onSubmit(input)}>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>OK</Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        </Modal>
    );
};

export default TextPrompt;
