import { Platform, TouchableNativeFeedback } from "react-native";
import { CubeOptions } from "sr-visualizer";

export interface Case {
    id: number;
    description: string;
    algorithm: string;
    imageOptions: CubeOptions;
    algorithmSet?: string;
}

export interface TimeAttackOptions {
    shouldRandomlyMirror: boolean;
    shouldRandomlyAUF: boolean;
}

export const TOUCHABLE_BACKGROUND = Platform.OS === "android" ? TouchableNativeFeedback.SelectableBackground() : undefined;

export const CURRENT_VERSION = "1.3.0";
