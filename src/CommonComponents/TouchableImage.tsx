import React, {Component} from 'react';
import {TouchableNativeFeedback, Platform, GestureResponderEvent} from 'react-native';
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
        return (
            <TouchableNativeFeedback
                onPress={this.props.onPress}
                onLongPress={this.props.onLongPress}
                background={Platform.OS === 'android' ? TouchableNativeFeedback.SelectableBackground() : undefined}>
                <FixedSizeSvgUri {...caseImage} uri={this.props.imageUrl} />
            </TouchableNativeFeedback>
        );
    }
}
