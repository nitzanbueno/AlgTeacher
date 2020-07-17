import React, {Component} from "react";
import {Text, View, StyleSheet, TextInput, Button, TouchableWithoutFeedback} from "react-native";

const styles = StyleSheet.create({
    backdrop: {
        position: "absolute",
        width: "100%",
        height: "100%",
        opacity: 0.5,
        backgroundColor: "black",
        zIndex: 1000,
    },
    promptContainer: {
        position: "absolute",
        top: "25%",
        width: "90%",
        backgroundColor: "white",
        borderStyle: "solid",
        borderColor: "black",
        borderWidth: 2,
        borderRadius: 10,
        left: "5%",
        padding: 5,
        zIndex: 1001,
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
});

interface Props {
    prompt: string;
    onSubmit: (result: string) => void;
    onCancel: () => void;
}

interface State {
    input: string;
}

export default class TextPrompt extends Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {input: ""};
    }

    render() {
        return [
            <TouchableWithoutFeedback key="backdrop" onPress={this.props.onCancel}>
                <View style={styles.backdrop} />
            </TouchableWithoutFeedback>,
            <View style={styles.promptContainer} key="prompt">
                <Text style={styles.promptText}>{this.props.prompt}</Text>
                <TextInput
                    style={styles.promptInput}
                    value={this.state.input}
                    onChangeText={(value: string) => this.setState({input: value})}
                />
                <Button title="OK" onPress={() => this.props.onSubmit(this.state.input)} />
            </View>,
        ];
    }
}
