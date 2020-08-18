import { Platform, TouchableNativeFeedback } from "react-native";
import { CubeOptions } from "sr-visualizer";

export interface Case {
    id: number;
    description: string;
    algorithm: string;
    imageOptions: CubeOptions;
    algorithmSet?: string;
}

export const TOUCHABLE_BACKGROUND = Platform.OS === "android" ? TouchableNativeFeedback.SelectableBackground() : undefined;
