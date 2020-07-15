import React, {Component} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import CheckBox from '@react-native-community/checkbox';

const styles = StyleSheet.create({
    optionRow: {
        flexDirection: 'row',
        height: 30,
        alignItems: 'center',
        marginTop: 5,
        marginBottom: 5,
    },
    optionContainer: {
        marginBottom: 10,
    },
});

export type CheckboxPickerOptionArray = Array<{name: string; value: boolean}>;

interface PropsType {
    options: string[];
    onSubmit: (options: CheckboxPickerOptionArray) => void;
}

interface StateType {
    checkboxes: Map<string, boolean>;
}

export class CheckboxPicker extends Component<PropsType, StateType> {
    constructor(props: PropsType) {
        super(props);

        // Init all values with false
        const checkboxes = new Map<string, boolean>(props.options.map(option => [option, false]));
        this.state = {checkboxes};
    }

    changeCheckboxValue = (key: string, value: boolean) => {
        const newCheckboxes = new Map(this.state.checkboxes);
        newCheckboxes.set(key, value);
        this.setState({checkboxes: newCheckboxes});
    };

    onSubmit = () => {
        const optionArray = Array.from(this.state.checkboxes.entries(), ([name, value]) => ({name, value}));

        this.props.onSubmit(optionArray);
    };

    render() {
        return (
            <View>
                <View style={styles.optionContainer}>
                    {Array.from(this.state.checkboxes.entries(), ([option, value]) => (
                        <View style={styles.optionRow} key={option}>
                            <CheckBox value={value} onValueChange={newValue => this.changeCheckboxValue(option, newValue)} />
                            <Text>{option}</Text>
                        </View>
                    ))}
                </View>
                <Button title="Done" onPress={this.onSubmit} />
            </View>
        );
    }
}
