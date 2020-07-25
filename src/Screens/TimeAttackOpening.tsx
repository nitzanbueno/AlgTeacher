import React, {FC, useContext, useState} from "react";
import {Text, StyleSheet, ScrollView, CheckBox, Button} from "react-native";
import {Case} from "../Models";
import {CaseStoreContext} from "../CaseStore";
import CheckboxPicker, {CheckboxPickerOptionArray, useCheckboxPickerState} from "../CommonComponents/CheckboxPicker";
import {observer} from "mobx-react";
import CheckboxWithLabel from "../CommonComponents/CheckboxWithLabel";

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
    const [shouldRandomlyMirror, setShouldRandomlyMirror] = useState(false);
    const {getSelectedOptions: getSelectedCategories, checkboxPickerState} = useCheckboxPickerState(caseStore.categories);

    function confirmCategorySelection() {
        props.navigation.replace("TimeAttackPlay", {
            categories: getSelectedCategories(),
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
                    <CheckboxPicker {...checkboxPickerState} />
                    <Text style={styles.header}>Choose options:</Text>
                    <CheckboxWithLabel value={shouldRandomlyMirror} onValueChange={setShouldRandomlyMirror} labelText="Randomly mirror" />
                    <Button title="Done" onPress={confirmCategorySelection} />
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
