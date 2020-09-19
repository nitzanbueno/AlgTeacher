import React, { FC, useEffect, useState } from "react";
import { Image } from "react-native";

/**
 * An image that takes up 100% of the element width, and auto-scales accordingly.
 */
export const ScaledImage: FC<{ source: any, style?: any }> = props => {
    const [aspectRatio, setAspectRatio] = useState<number | null>(null);

    useEffect(() => {
        Image.getSize(
            Image.resolveAssetSource(props.source).uri,
            (width, height) => setAspectRatio(width / height),
            () => setAspectRatio(null),
        );
    }, [props.source]);

    return aspectRatio ? (
        <Image source={props.source} style={{ width: "100%", height: undefined, aspectRatio, ...props.style }} resizeMode="contain" />
    ) : null;
};
