import React, { FC } from "react";
import { StyleSheet, TouchableWithoutFeedback, View, Text, ViewStyle, TextStyle } from "react-native";

const styles = StyleSheet.create({
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

interface ButtonProps {
    onPress: () => void;
    title: string;
    style?: ViewStyle;
    textStyle?: TextStyle;
}

const Button: FC<ButtonProps> = props => {
    const style = props.style || {};
    const textStyle = props.textStyle || {};

    return (
        <TouchableWithoutFeedback onPress={props.onPress}>
            <View style={[styles.button, style]}>
                <Text style={[styles.buttonText, textStyle]}>{props.title}</Text>
            </View>
        </TouchableWithoutFeedback>
    );
};

export default Button;
