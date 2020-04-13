import { Platform, TouchableNativeFeedback } from "react-native";

export interface Case {
    imageUrl: string;
    id: string;
    description: string;
}

export const TOUCHABLE_BACKGROUND = Platform.OS === "android"
        ? TouchableNativeFeedback.SelectableBackground()
        : undefined;