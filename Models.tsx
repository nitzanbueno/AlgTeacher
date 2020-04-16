import { Platform, TouchableNativeFeedback } from "react-native";

export interface Case {
    id: number;
    description: string;
    algorithm: string;
    imageUrl: string;
}

export const TOUCHABLE_BACKGROUND =
    Platform.OS === "android"
        ? TouchableNativeFeedback.SelectableBackground()
        : undefined;
