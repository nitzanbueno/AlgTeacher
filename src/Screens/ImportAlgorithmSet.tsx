import React, { FC, useContext } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { CaseStoreContext } from "../CaseStore";
import ALGORITHM_SETS from "../AlgorithmSets.json";
import { Case } from "../Models";
import { observer } from "mobx-react";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../RootStackParamList";
import { List } from "react-native-paper";

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

const ImportAlgorithmSetScreen: FC<{ navigation: StackNavigationProp<RootStackParamList, "ImportAlgorithmSet"> }> = props => {
    const caseStore = useContext(CaseStoreContext);

    function importAlgorithmSet(algorithmSet: AlgorithmSet) {
        const { cases } = algorithmSet;

        if (!cases || cases.length == 0) return;

        caseStore.StoreCaseList(cases);

        props.navigation.goBack();
    }

    function promptImportSet(algorithmSet: AlgorithmSet) {
        Alert.alert("Import Set", `Are you sure you want to import the ${algorithmSet.name} set?`, [
            {
                text: "Cancel",
                style: "cancel",
            },
            { text: "Import", onPress: () => importAlgorithmSet(algorithmSet) },
        ]);
    }

    return (
        <View style={styles.container}>
            <List.Section>
                <List.Subheader>Choose a set to import:</List.Subheader>
                {ALGORITHM_SETS.map(algorithmSet => (
                    <List.Item
                        key={algorithmSet.name}
                        titleStyle={{marginLeft: -10}}
                        left={(props) => <List.Icon {...props} icon="circle-medium" color="#000" />}
                        title={algorithmSet.name}
                        onPress={() => promptImportSet(algorithmSet)}
                    />
                ))}
            </List.Section>
        </View>
    );
};

export default observer(ImportAlgorithmSetScreen);
