import React, { FC, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { useMapState } from "../CustomHooks";
import { List, Checkbox } from "react-native-paper";
import CheckboxListItem from "./CheckboxListItem";

const styles = StyleSheet.create({
    header: {
        fontSize: 20,
    },
});

interface Props {
    title: string;
    checkboxes: Map<string, boolean>;
    setCheckboxValue: (key: string, value: boolean) => void;
}

export function useCheckboxPickerState(options: string[]) {
    const [checkboxes, setCheckboxes, setCheckboxValue] = useMapState(generateCheckboxes);

    function generateCheckboxes() {
        // Init all values with false
        return new Map<string, boolean>(options.map(option => [option, false]));
    }

    useEffect(() => {
        setCheckboxes(generateCheckboxes());
    }, [options]);

    function getSelectedOptions() {
        return Array.from(checkboxes.entries(), ([key, value]) => ({ key, value }))
            .filter(option => option.value)
            .map(option => option.key);
    }

    return { checkboxPickerState: { checkboxes, setCheckboxValue }, getSelectedOptions } as const;
}

const CheckboxPicker: FC<Props> = props => {
    return (
        <List.Section>
            <List.Subheader style={styles.header}>{props.title}</List.Subheader>
            {Array.from(props.checkboxes.entries(), ([option, value]) => (
                <CheckboxListItem
                    key={option}
                    value={value}
                    title={option}
                    onValueChange={(newValue) => props.setCheckboxValue(option, newValue)}
                />
            ))}
        </List.Section>
    );
};

export default CheckboxPicker;
