import React, {FC, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import CheckboxWithLabel from './CheckboxWithLabel';
import { useMapState } from '../CustomHooks';

const styles = StyleSheet.create({
    optionContainer: {
        marginBottom: 10,
    },
});

interface Props {
    checkboxes: Map<string, boolean>;
    setCheckboxValue: (key: string, value: boolean) => void;
}

export function useCheckboxPickerState(options: string[]): {checkboxPickerState: Props, getSelectedOptions: (() => string[])} {
    const [checkboxes, setCheckboxes, setCheckboxValue] = useMapState(generateCheckboxes);

    function generateCheckboxes() {
        // Init all values with false
        return new Map<string, boolean>(options.map(option => [option, false]));
    }

    useEffect(() => {
        setCheckboxes(generateCheckboxes());
    }, [options]);

    function getSelectedOptions() {
        return Array.from(checkboxes.entries(), ([key, value]) => ({key, value})).filter(option => option.value).map(option => option.key);
    }

    return {checkboxPickerState: {checkboxes, setCheckboxValue}, getSelectedOptions};
}

const CheckboxPicker: FC<Props> = (props) => {
    return (
        <View style={styles.optionContainer}>
            {Array.from(props.checkboxes.entries(), ([option, value]) => (
                <CheckboxWithLabel key={option} value={value} onValueChange={newValue => props.setCheckboxValue(option, newValue)} labelText={option} />
            ))}
        </View>
    );
}

export default CheckboxPicker;
