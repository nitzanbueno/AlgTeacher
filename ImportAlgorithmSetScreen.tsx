import React, {Component} from 'react';
import {View, Text, StyleSheet, Alert} from 'react-native';
import {StoreCaseList} from './CaseStorage';
import {ALGORITHM_SETS} from './AlgorithmSets';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        // alignItems: 'center',
        // textAlign: 'center',
        // justifyContent: "center",
    },
    header: {
        fontSize: 20,
        marginBottom: 20,
        marginTop: 20,
        textAlign: 'center',
    },
    algorithmSetOption: {
        marginLeft: 30,
        fontSize: 20,
    },
    link: {
        color: 'blue',
    },
});

export class ImportAlgorithmSetScreen extends Component<{navigation: any}> {
    importAlgorithmSet = (algorithmSetKey: string) => {
        const cases = ALGORITHM_SETS.get(algorithmSetKey);

        if (!cases || cases.length == 0) return;

        StoreCaseList(cases).then(() => {
            this.props.navigation.navigate('Main', {case: cases[0]});
        });
    };

    promptImportSet = (algorithmSetKey: string) => {
        Alert.alert('Import Set', `Are you sure you want to import the ${algorithmSetKey} set?`, [
            {
                text: 'Cancel',
                style: 'cancel',
            },
            {text: 'Import', onPress: () => this.importAlgorithmSet(algorithmSetKey)},
        ]);
    };

    getAlgorithmSetItems = () => {
        let algorithmSetItems = [];

        for (const algorithmSet of ALGORITHM_SETS.keys()) {
            algorithmSetItems.push(
                <Text style={styles.algorithmSetOption} key={algorithmSet}>
                    {'\u2022 '}
                    <Text style={styles.link} onPress={() => this.promptImportSet(algorithmSet)}>
                        {algorithmSet}
                    </Text>
                </Text>,
            );
        }

        return algorithmSetItems;
    };

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.header}>Choose a set to import:</Text>
                {this.getAlgorithmSetItems()}
            </View>
        );
    }
}
