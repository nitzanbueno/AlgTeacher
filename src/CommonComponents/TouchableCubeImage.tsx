import React, { FunctionComponent } from "react";
import { TouchableNativeFeedback, GestureResponderEvent, Text, View } from "react-native";
import { TOUCHABLE_BACKGROUND } from "../Models";
import { CubeImage } from "./CubeImage";
import { CubeOptions } from "sr-visualizer";

type Props = CubeOptions & {
    onPress?: (event: GestureResponderEvent) => void;
    onLongPress?: (event: GestureResponderEvent) => void;
};

const TouchableCubeImage: FunctionComponent<Props> = props => {
    return (
        <TouchableNativeFeedback background={TOUCHABLE_BACKGROUND} onPress={props.onPress} onLongPress={props.onLongPress}>
            <View>
                <CubeImage width={150} height={150} case={props.algorithm} {...props} />
            </View>
        </TouchableNativeFeedback>
    );
};

export default TouchableCubeImage;
