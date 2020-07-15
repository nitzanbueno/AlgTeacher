import React, {Component} from 'react';
import {TouchableWithoutFeedback, GestureResponderEvent} from 'react-native';
import FixedSizeSvgUri from '../FixedSizeSvgUri';

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
        // The code crashes if this is a TouchableNativeFeedback
        // Something about "trying to send command to a non-existing view"
        // Maybe it should be fixed one day, but it's not that big a deal
        return (
            <TouchableWithoutFeedback
                onPress={this.props.onPress}
                onLongPress={this.props.onLongPress}>
                <FixedSizeSvgUri {...caseImage} uri={this.props.imageUrl} />
            </TouchableWithoutFeedback>
        );
    }
}
