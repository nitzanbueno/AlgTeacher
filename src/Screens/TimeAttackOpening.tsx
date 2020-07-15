import React from 'react';
import {Component} from 'react';
import {Text, StyleSheet, ScrollView} from 'react-native';
import {Case} from '../Models';
import CaseStorage from '../CaseStorage';
import CheckboxPicker, {CheckboxPickerOptionArray} from '../CommonComponents/CheckboxPicker';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        textAlign: 'center',
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 20,
    },
    header: {
        fontSize: 20,
    },
});

interface Props {
    route: {params: {case: Case}};
    navigation: any;
}

interface State {
    allCategories: string[];
}

export default class TimeAttackOpeningScreen extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            allCategories: ['Loading...'],
        };
    }

    componentDidMount() {
        CaseStorage.GetAllCategories().then(categories => {
            this.setState({allCategories: categories});
        });
    }

    confirmCategorySelection = (options: CheckboxPickerOptionArray) => {
        let chosenCategories = options.filter(option => option.value).map(option => option.name);

        this.props.navigation.replace('TimeAttackPlay', {
            categories: chosenCategories,
        });
    };

    goToAddScreen = () => {
        this.props.navigation.replace('Add', {
            caseId: -1,
            callerScreen: 'Main',
        });
    };

    goToImportScreen = () => {
        this.props.navigation.replace('ImportAlgorithmSet');
    };

    render() {
        return (
            <ScrollView style={styles.container}>
                {this.state.allCategories.length > 0 ? (
                    <>
                        <Text style={styles.header}>Choose categories:</Text>
                        <CheckboxPicker options={this.state.allCategories} onSubmit={this.confirmCategorySelection} />
                    </>
                ) : (
                    <Text style={styles.header}>
                        {"You don't have any categories.\nHow about "}
                        <Text style={{color: 'blue', textDecorationLine: 'underline'}} onPress={this.goToAddScreen}>
                            adding a case with one
                        </Text>
                        {' or maybe '}
                        <Text style={{color: 'blue', textDecorationLine: 'underline'}} onPress={this.goToImportScreen}>
                            importing an algorithm set
                        </Text>
                        ?
                    </Text>
                )}
            </ScrollView>
        );
    }
}
