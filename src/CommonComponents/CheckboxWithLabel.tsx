import React, { FC } from "react";
import { StyleSheet, View, Text, TouchableWithoutFeedback } from "react-native";
import CheckBox from "@react-native-community/checkbox";

const styles = StyleSheet.create({
    optionRow: {
        flexDirection: "row",
        height: 30,
        alignItems: "center",
    },
});

interface CheckboxWithLabelProps {
    onValueChange: (newValue: boolean) => void;
    value: boolean;
    labelText: string;
}

const CheckboxWithLabel: FC<CheckboxWithLabelProps> = props => {
    return (
        <View style={styles.optionRow}>
            <CheckBox value={props.value} onValueChange={props.onValueChange} />
            <TouchableWithoutFeedback onPress={() => props.onValueChange(!props.value)}>
                <Text>{props.labelText}</Text>
            </TouchableWithoutFeedback>
        </View>
    );
};

export default CheckboxWithLabel;
