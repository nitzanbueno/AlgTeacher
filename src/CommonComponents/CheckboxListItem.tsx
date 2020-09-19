import React, { FC } from "react";
import { StyleSheet } from "react-native";
import { List, Checkbox } from "react-native-paper";

const styles = StyleSheet.create({
    optionRow: {
        flexDirection: "row",
        height: 30,
        alignItems: "center",
    },
});

interface Props {
    onValueChange: (newValue: boolean) => void;
    value: boolean;
    title: string;
}

const CheckboxListItem: FC<Props> = props => (
    <List.Item
        title={props.title}
        left={() => <Checkbox status={props.value ? "checked" : "unchecked"} />}
        onPress={() => props.onValueChange(!props.value)}
    />
);

export default CheckboxListItem;
