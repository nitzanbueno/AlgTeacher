import React, { FC, useState, useEffect } from 'react';
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

const TimeAttackOpeningScreen: FC<Props> = (props) => {
    const [allCategories, setAllCategories] = useState<string[]>([]);

    function confirmCategorySelection(options: CheckboxPickerOptionArray) {
        let chosenCategories = options.filter(option => option.value).map(option => option.name);

        props.navigation.replace('TimeAttackPlay', {
            categories: chosenCategories,
        });
    };

    function goToAddScreen() {
        props.navigation.replace('Add', {
            caseId: -1,
            callerScreen: 'Main',
        });
    };

    function goToImportScreen() {
        props.navigation.replace('ImportAlgorithmSet');
    };

    useEffect(() => {
        CaseStorage.GetAllCategories().then(categories => {
            setAllCategories(categories);
        }); 
    }, []);

    return (
        <ScrollView style={styles.container}>
            {allCategories.length > 0 ? (
                <>
                    <Text style={styles.header}>Choose categories:</Text>
                    <CheckboxPicker options={allCategories} onSubmit={confirmCategorySelection} />
                </>
            ) : (
                <Text style={styles.header}>
                    {"You don't have any categories.\nHow about "}
                    <Text style={{color: 'blue', textDecorationLine: 'underline'}} onPress={goToAddScreen}>
                        adding a case with one
                    </Text>
                    {' or maybe '}
                    <Text style={{color: 'blue', textDecorationLine: 'underline'}} onPress={goToImportScreen}>
                        importing an algorithm set
                    </Text>
                    ?
                </Text>
            )}
        </ScrollView>
    );
}

export default TimeAttackOpeningScreen;
