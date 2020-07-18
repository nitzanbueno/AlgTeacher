import React, {FC, useContext} from "react";
import {Text, StyleSheet, ScrollView} from "react-native";
import {Case} from "../Models";
import {CaseStoreContext} from "../CaseStore";
import CheckboxPicker, {CheckboxPickerOptionArray} from "../CommonComponents/CheckboxPicker";
import {observer} from "mobx-react";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        textAlign: "center",
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

const TimeAttackOpeningScreen: FC<Props> = props => {
    const caseStore = useContext(CaseStoreContext);

    function confirmCategorySelection(options: CheckboxPickerOptionArray) {
        let chosenCategories = options.filter(option => option.value).map(option => option.name);

        props.navigation.replace("TimeAttackPlay", {
            categories: chosenCategories,
        });
    }

    function goToAddScreen() {
        props.navigation.replace("Add", {
            caseId: -1,
            callerScreen: "Main",
        });
    }

    function goToImportScreen() {
        props.navigation.replace("ImportAlgorithmSet");
    }

    return (
        <ScrollView style={styles.container}>
            {caseStore.categories.length > 0 ? (
                <>
                    <Text style={styles.header}>Choose categories:</Text>
                    <CheckboxPicker options={caseStore.categories} onSubmit={confirmCategorySelection} />
                </>
            ) : (
                <Text style={styles.header}>
                    {"You don't have any categories.\nHow about "}
                    <Text style={{color: "blue", textDecorationLine: "underline"}} onPress={goToAddScreen}>
                        adding a case with one
                    </Text>
                    {" or maybe "}
                    <Text style={{color: "blue", textDecorationLine: "underline"}} onPress={goToImportScreen}>
                        importing an algorithm set
                    </Text>
                    ?
                </Text>
            )}
        </ScrollView>
    );
};

export default observer(TimeAttackOpeningScreen);
