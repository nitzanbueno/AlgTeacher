import React, {FC, useContext, useState} from "react";
import {Text, StyleSheet, ScrollView, CheckBox, Button, View} from "react-native";
import {Case} from "../Models";
import {CaseStoreContext} from "../CaseStore";
import CheckboxPicker, {useCheckboxPickerState} from "../CommonComponents/CheckboxPicker";
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
    paragraph: {
        marginBottom: 20,
    },
});

interface Props {
    route: {params: {case: Case}};
    navigation: any;
}

const TimeAttackOpeningScreen: FC<Props> = props => {
    const caseStore = useContext(CaseStoreContext);
    const [shouldRandomlyMirror, setShouldRandomlyMirror] = useState(false);
    const [shouldRandomlyAUF, setShouldRandomlyAUF] = useState(false);
    const {getSelectedOptions: getSelectedCategories, checkboxPickerState} = useCheckboxPickerState(caseStore.categories);

    function confirmCategorySelection() {
        props.navigation.replace("TimeAttackPlay", {
            categories: getSelectedCategories(),
            shouldRandomlyMirror,
            shouldRandomlyAUF,
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
                    <View style={styles.paragraph}>
                        <Text style={styles.header}>Choose options:</Text>
                        <CheckboxWithLabel
                            value={shouldRandomlyMirror}
                            onValueChange={setShouldRandomlyMirror}
                            labelText="Randomly mirror"
                        />
                        <CheckboxWithLabel
                            value={shouldRandomlyAUF}
                            onValueChange={setShouldRandomlyAUF}
                            labelText="Add random U moves at start"
                        />
                    </View>
                    <View style={styles.paragraph}>
                        <Text style={styles.header}>Select algorithm categories:</Text>
                        <CheckboxPicker {...checkboxPickerState} />
                    </View>
                    <Button title="Start!" onPress={confirmCategorySelection} />
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
