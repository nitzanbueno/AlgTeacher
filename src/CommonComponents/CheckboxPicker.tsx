import React, {Component} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { ArrayEquals } from '../Utils';

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

interface Props {
    options: string[];
    onSubmit: (options: CheckboxPickerOptionArray) => void;
}

interface State {
    checkboxes: Map<string, boolean>;
}

export default class CheckboxPicker extends Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {checkboxes: this.generateCheckboxes()};
    }

    generateCheckboxes = () => {
        // Init all values with false
        return new Map<string, boolean>(this.props.options.map(option => [option, false]));
    }

    componentDidUpdate(prevProps: Props, prevState: State) {
        if (!ArrayEquals(this.props.options, prevProps.options)) {
            this.setState({checkboxes: this.generateCheckboxes()});
        }
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
