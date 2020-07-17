import React, {FC} from "react";
import {View, Text, StyleSheet, Alert} from "react-native";
import CaseStorage from "../CaseStorage";
import ALGORITHM_SETS from "../AlgorithmSets.json";
import { Case } from "../Models";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        // alignItems: 'center',
        // textAlign: 'center',
        // justifyContent: "center",
    },
    header: {
        fontSize: 20,
        marginBottom: 20,
        marginTop: 20,
        textAlign: "center",
    },
    algorithmSetOption: {
        marginLeft: 30,
        fontSize: 20,
    },
    link: {
        color: "blue",
    },
});

interface AlgorithmSet {
    name: string;
    cases: Case[];
}

const ImportAlgorithmSetScreen: FC<{navigation: any}> = props => {
    function importAlgorithmSet(algorithmSet: AlgorithmSet) {
        const {cases} = algorithmSet;

        if (!cases || cases.length == 0) return;

        CaseStorage.StoreCaseList(cases).then(() => {
            props.navigation.navigate("Main", {case: cases[0]});
        });
    }

    function promptImportSet(algorithmSet: AlgorithmSet) {
        Alert.alert("Import Set", `Are you sure you want to import the ${algorithmSet.name} set?`, [
            {
                text: "Cancel",
                style: "cancel",
            },
            {text: "Import", onPress: () => importAlgorithmSet(algorithmSet)},
        ]);
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Choose a set to import:</Text>

            {ALGORITHM_SETS.map(algorithmSet => (
                <Text style={styles.algorithmSetOption} key={algorithmSet.name}>
                    {"\u2022 " /* Bullet point */}
                    <Text style={styles.link} onPress={() => promptImportSet(algorithmSet)}>
                        {algorithmSet.name}
                    </Text>
                </Text>
            ))}
        </View>
    );
};

export default ImportAlgorithmSetScreen;
