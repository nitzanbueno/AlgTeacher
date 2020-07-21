import React, { FC } from "react";
import {CubeSvg, CubeOptions} from "sr-visualizer";
import { InvertAlgorithm } from "../ScrambleLib";

type CubeImageProps = CubeOptions & {case?: string};

export const CubeImage: FC<CubeImageProps> = (props) => {
    let invertedAlgorithm = {}

    if (props.case && !props.algorithm) {
        invertedAlgorithm = {algorithm: InvertAlgorithm(props.case)}
    }

    return <CubeSvg extraOptions={{...props, ...invertedAlgorithm}} />;
}
