import React, { Component } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import CheckBox from "@react-native-community/checkbox";

const styles = StyleSheet.create({
    optionRow: {
        flexDirection: "row",
        height: 30,
        alignItems: "center",
        marginTop: 5,
        marginBottom: 5,
    },
    optionContainer: {
        marginBottom: 10
    }
});

export type CheckboxPickerOptionArray = Array<{ name: string; value: boolean }>;

export class CheckboxPicker extends Component<
    {
        options: string[];
        onSubmit: (options: CheckboxPickerOptionArray) => void;
    },
    { checkboxValues: boolean[] }
> {
    constructor(props: any) {
        super(props);

        // Init all values with false
        this.state = { checkboxValues: this.props.options.map((_) => false) };
    }

    changeCheckboxValue = (value: boolean, index: number) => {
        let newCheckboxValues = this.state.checkboxValues.slice();
        newCheckboxValues[index] = value;
        this.setState({ checkboxValues: newCheckboxValues });
    };

    render() {
        return (
            <View>
                <View style={styles.optionContainer}>
                {this.props.options.map((option, index) => (
                    <View style={styles.optionRow} key={option}>
                        <CheckBox
                            value={this.state.checkboxValues[index]}
                            onValueChange={(value) =>
                                this.changeCheckboxValue(value, index)
                            }
                        />
                        <Text>{option}</Text>
                    </View>
                ))}
                </View>
                <Button
                    title="Done"
                    onPress={() =>
                        this.props.onSubmit(
                            this.state.checkboxValues.map((value, index) => {
                                return {
                                    name: this.props.options[index],
                                    value: value,
                                };
                            })
                        )
                    }
                />
            </View>
        );
    }
}
