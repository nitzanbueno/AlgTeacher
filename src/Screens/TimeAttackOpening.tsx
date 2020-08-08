import React, {FC, useContext, useState} from "react";
import {Text, StyleSheet, ScrollView, CheckBox, Button, View, Image} from "react-native";
import {Case} from "../Models";
import {CaseStoreContext} from "../CaseStore";
import CheckboxPicker, {useCheckboxPickerState} from "../CommonComponents/CheckboxPicker";
import {observer} from "mobx-react";
import CheckboxWithLabel from "../CommonComponents/CheckboxWithLabel";
import HelpModal from "../CommonComponents/HelpModal";
import {H1, P} from "../CommonComponents/TextFormattingElements";

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
            <HelpModal openKey="timeAttackHelpModal">
                <H1>Welcome to Time Attack mode!</H1>
                <P>Time Attack mode trains your recognition and execution time for algorithm sets.</P>
                <P>To get started, select categories from the list:</P>
                <Image source={require("./HelpImages/TimeAttackCategories.png")} style={{width: "100%", height: 120}} resizeMode="contain" />
                <P>You can also choose to randomly mirror or AUF your algorithms:</P>
                <Image source={require("./HelpImages/TimeAttackOptions.png")} style={{width: "100%", height: 81}} resizeMode="contain" />
                <P>Then tap "Start":</P>
                <Image source={require("./HelpImages/TimeAttackStart.png")} style={{width: "100%", height: 160}} resizeMode="contain" />
                <P>The app will then generate scrambles that are solved by each algorithm in the chosen categories.</P>
                <P>After scrambling, start the timer, recognize and solve the case, then stop it to get the next case.</P>
                <Image source={require("./HelpImages/TimeAttackTimer.png")} style={{width: "100%", height: 460}} resizeMode="contain" />
                <P>If you forgot the algorithm, you can tap "Show Solution" to see the solution.</P>
                <Image source={require("./HelpImages/TimeAttackSolution.png")} style={{width: "100%", height: 460}} resizeMode="contain" />
                <P>After you've solved every case in the chosen categories, you will see your score.</P>
                <P>A high score is kept for every category combination, so you can try to beat it!</P>
            </HelpModal>
        </ScrollView>
    );
};

export default observer(TimeAttackOpeningScreen);
