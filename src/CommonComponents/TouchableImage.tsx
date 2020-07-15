import React, {FunctionComponent} from "react";
import {TouchableWithoutFeedback, GestureResponderEvent} from "react-native";
import FixedSizeSvgUri from "./FixedSizeSvgUri";

interface Props {
    imageUrl: string;
    onPress?: (event: GestureResponderEvent) => void;
    onLongPress?: (event: GestureResponderEvent) => void;
}

const TouchableImage: FunctionComponent<Props> = props => {
    // The code crashes if this is a TouchableNativeFeedback
    // Something about "trying to send command to a non-existing view"
    // Maybe it should be fixed one day, but it's not that big a deal
    return (
        <TouchableWithoutFeedback onPress={props.onPress} onLongPress={props.onLongPress}>
            <FixedSizeSvgUri width={150} height={150} uri={props.imageUrl} />
        </TouchableWithoutFeedback>
    );
};

export default TouchableImage;
