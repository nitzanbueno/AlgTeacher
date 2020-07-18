import React, {FunctionComponent} from 'react';
import {UriProps, SvgUri} from 'react-native-svg';
import {View} from 'react-native';

const FixedSizeSvgUri: FunctionComponent<UriProps> = props => {
    const {width, height} = props;

    return (
        <View style={{width, height}}>
            {/* TODO: This SvgUri calls fetches that may return after it has been unmounted.
                      It then tries to alter the state.
                      This is a bug in react-native-svg. */}
            <SvgUri {...props} />
        </View>
    );
};

export default FixedSizeSvgUri;
