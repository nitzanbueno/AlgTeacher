import React, {FunctionComponent} from 'react';
import {UriProps, SvgUri} from 'react-native-svg';
import {View} from 'react-native';

const FixedSizeSvgUri: FunctionComponent<UriProps> = props => {
    const {width, height} = props;

    return (
        <View style={{width, height}}>
            <SvgUri {...props} />
        </View>
    );
};

export default FixedSizeSvgUri;
