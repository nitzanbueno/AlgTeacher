import { SHOULD_DISPLAY_LABELS_KEY } from "../Consts";
import AsyncStorage from "@react-native-community/async-storage";
import { decorate, observable, autorun } from "mobx";
import { createContext } from "react";

export class SettingStore {
    shouldDisplayLabels: boolean = false;
    isLoaded: boolean = false;

    constructor() {
        // Load the setting
        this._getShouldDisplayLabels().then(newShouldDisplayLabels => {
            this.shouldDisplayLabels = newShouldDisplayLabels;
            this.isLoaded = true;

            // This could cause race conditions if two actions are performed in quick succession -
            // the second one might finish before the first one, thus erasing data.
            // This isn't a major concern for this part of the code, though.
            autorun(() => {
                AsyncStorage.setItem(SHOULD_DISPLAY_LABELS_KEY, this.shouldDisplayLabels.toString());
            });
        });
    }

    /**
     * Returns all stored cases in a list (or an empty list if no cases are stored).
     */
    async _getShouldDisplayLabels(): Promise<boolean> {
        const shouldDisplayLabelsString = await AsyncStorage.getItem(SHOULD_DISPLAY_LABELS_KEY);

        if (shouldDisplayLabelsString === null) {
            return false;
        }

        return shouldDisplayLabelsString === "true";
    }
}

decorate(SettingStore, {
    shouldDisplayLabels: observable
});

export const SettingStoreContext = createContext(new SettingStore());
