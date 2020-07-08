import React, { Component } from "react";
import {
    StyleSheet,
    Image,
    TouchableNativeFeedback,
    Platform,
    GestureResponderEvent,
} from "react-native";
import SvgUri from "react-native-svg-uri";

const caseImage = {
    width: 150,
    height: 150,
};

export class TouchableImage extends Component<
    {
        imageUrl: string;
        onPress?: (event: GestureResponderEvent) => void;
        onLongPress?: (event: GestureResponderEvent) => void;
    },
    {}
> {
    render() {
        return (
            <TouchableNativeFeedback
                onPress={this.props.onPress}
                onLongPress={this.props.onLongPress}
                background={
                    Platform.OS === "android"
                        ? TouchableNativeFeedback.SelectableBackground()
                        : undefined
                }
            >
                <SvgUri
                    {...caseImage}
                    source={{ uri: this.props.imageUrl }}
                />
            </TouchableNativeFeedback>
        );
    }
}
