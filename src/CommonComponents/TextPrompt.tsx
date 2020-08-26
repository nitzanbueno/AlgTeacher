import React, { useEffect, FC, useState } from "react";
import { StyleSheet, TouchableWithoutFeedback } from "react-native";
import { Button, Portal, Dialog, TextInput } from "react-native-paper";

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
        <Portal>
            <Dialog visible={props.visible} onDismiss={props.onCancel}>
                <Dialog.Title>{props.prompt}</Dialog.Title>
                <Dialog.Content>
                    <TextInput placeholder="e.g. OLL" mode="outlined" value={input} onChangeText={(value: string) => setInput(value)} />
                </Dialog.Content>
                <Dialog.Actions>
                    <Button onPress={() => props.onSubmit(input)} children="OK" />
                </Dialog.Actions>
            </Dialog>
        </Portal>
    );
};

export default TextPrompt;
