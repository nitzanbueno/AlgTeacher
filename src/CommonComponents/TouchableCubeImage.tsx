import React, { FunctionComponent } from "react";
import { TouchableNativeFeedback, GestureResponderEvent, View, ViewStyle, StyleProp } from "react-native";
import { TOUCHABLE_BACKGROUND } from "../Models";
import { CubeImage } from "./CubeImage";
import { CubeOptions } from "sr-visualizer";

type Props = CubeOptions & {
    onPress?: (event: GestureResponderEvent) => void;
    onLongPress?: (event: GestureResponderEvent) => void;
    style?: StyleProp<ViewStyle>;
};

const TouchableCubeImage: FunctionComponent<Props> = props => {
    const { onPress, onLongPress, style, ...cubeProps } = props;

    return (
        <TouchableNativeFeedback background={TOUCHABLE_BACKGROUND} onPress={props.onPress} onLongPress={props.onLongPress}>
            <View style={style}>
                <CubeImage width={150} height={150} case={props.algorithm} {...cubeProps} />
                {props.children}
            </View>
        </TouchableNativeFeedback>
    );
};

export default TouchableCubeImage;
