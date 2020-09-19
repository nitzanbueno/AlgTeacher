import React, { FC, useContext, useState } from "react";
import { Text, StyleSheet, ScrollView, View, Image } from "react-native";
import { Case } from "../Models";
import { CaseStoreContext } from "../CaseStore";
import CheckboxPicker, { useCheckboxPickerState } from "../CommonComponents/CheckboxPicker";
import { observer } from "mobx-react";
import CheckboxListItem from "../CommonComponents/CheckboxListItem";
import HelpDialog from "../CommonComponents/HelpDialog";
import { P } from "../CommonComponents/TextFormattingElements";
import { HashCode } from "../Utils";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../RootStackParamList";
import { Button, Caption, List } from "react-native-paper";
import { ScaledImage } from "../CommonComponents/ScaledImage";

const styles = StyleSheet.create({
    container: {
        textAlign: "center",
        paddingLeft: 10,
        paddingRight: 10,
    },
    header: {
        fontSize: 20,
        textAlign: "center",
    },
    helpTextContainer: {
        display: "flex",
        justifyContent: "center",
        height: "100%",
    },
    startButton: {
        marginTop: 20,
    },
    image: {
        marginTop: 5,
        marginBottom: 5
    }
});

const HIGHSCORE_PREFIX = "@high_score/";

function getHighScoreKeyByAlgorithmSets(cases: Case[]) {
    const sets = [...new Set(cases.map(c => c.algorithmSet))].sort();

    // If the number of algorithms changes, I want to reset the high score
    return HIGHSCORE_PREFIX + HashCode(JSON.stringify([sets, cases.length]));
}

function getHighScoreKeyByAlgorithms(cases: Case[]) {
    // Hash the algorithms themselves (after sorting)
    return HIGHSCORE_PREFIX + HashCode(JSON.stringify(cases.map(c => c.algorithm).sort()));
}

interface Props {
    navigation: StackNavigationProp<RootStackParamList, "TimeAttackOpening">;
    route: RouteProp<RootStackParamList, "TimeAttackOpening">;
}

const HelpScreen: FC<{}> = props => (
    <HelpDialog title="Welcome to Time Attack mode!" openKey="timeAttackHelpModal">
        <P>Time Attack mode trains your recognition and execution time for algorithm sets.</P>
        <P>To get started, select algorithm sets from the list.</P>
        <ScaledImage style={styles.image} source={require("./HelpImages/TimeAttackAlgorithmSets.png")} />
        <P>You can also select cases from the main screen and press the Time Attack button,</P>
        <ScaledImage style={styles.image} source={require("./HelpImages/TimeAttackFromSelection.png")} />
        <P>or tap on an algorithm to open its test screen and press the Time Attack button there.</P>
        <ScaledImage style={styles.image} source={require("./HelpImages/TimeAttackFromTest.png")} />
        <P>Then choose if you want to randomly mirror or AUF your algorithms.</P>
        <ScaledImage style={styles.image} source={require("./HelpImages/TimeAttackOptions.png")} />
        <P>Then tap "Start":</P>
        <ScaledImage style={styles.image} source={require("./HelpImages/TimeAttackStart.png")} />
        <P>The app will then generate scrambles that are solved by each algorithm in the chosen sets.</P>
        <P>After scrambling, start the timer, recognize and solve the case, then stop it to get the next case.</P>
        <ScaledImage style={styles.image} source={require("./HelpImages/TimeAttackTimer.png")} />
        <P>If you forgot the algorithm, you can tap "Show Solution" to see the solution.</P>
        <ScaledImage style={styles.image} source={require("./HelpImages/TimeAttackSolution.png")} />
        <P>After you've solved every case in the chosen sets, you will see your score.</P>
        <P>A high score is kept for every algorithm set combination, so you can try to beat it!</P>
    </HelpDialog>
);

const TimeAttackOpeningScreen: FC<Props> = props => {
    const caseStore = useContext(CaseStoreContext);
    const [shouldRandomlyMirror, setShouldRandomlyMirror] = useState(false);
    const [shouldRandomlyAUF, setShouldRandomlyAUF] = useState(false);
    const { getSelectedOptions: getSelectedSets, checkboxPickerState } = useCheckboxPickerState(caseStore.algorithmSets);

    const selectedCases = props.route.params.cases;
    const areCasesSelected = selectedCases.length > 0;

    function getChosenCases(): Case[] {
        if (areCasesSelected) return selectedCases;

        const selectedSets = getSelectedSets();

        if (selectedSets.length === 0) return caseStore.cases;

        return caseStore.cases.filter(c => c.algorithmSet && selectedSets.includes(c.algorithmSet));
    }

    function startTimeAttack() {
        const chosenCaseList = getChosenCases();

        // If the cases were given as a selection, I want the high score to be remembered by algorithm.
        // (If an algorithm changes, the high score will be lost. I don't remember by
        // case ID, because cases can be deleted, and this may cause unexpected behavior.)
        // If the cases weren't given and the user chose sets, I want to remember the high score by the sets.
        const highScoreKey = areCasesSelected
            ? getHighScoreKeyByAlgorithms(chosenCaseList)
            : getHighScoreKeyByAlgorithmSets(chosenCaseList);

        props.navigation.replace("TimeAttackPlay", {
            cases: chosenCaseList,
            highScoreKey,
            options: { shouldRandomlyMirror, shouldRandomlyAUF },
        });
    }

    function goToAddScreen() {
        props.navigation.replace("Add", {
            caseId: -1,
        });
    }

    function goToImportScreen() {
        props.navigation.replace("ImportAlgorithmSet");
    }

    return (
        <View style={styles.container}>
            {caseStore.algorithmSets.length > 0 || areCasesSelected ? (
                <ScrollView>
                    <List.Section>
                        <List.Subheader style={styles.header}>Choose options:</List.Subheader>
                        <CheckboxListItem value={shouldRandomlyMirror} onValueChange={setShouldRandomlyMirror} title="Randomly mirror" />
                        <CheckboxListItem
                            value={shouldRandomlyAUF}
                            onValueChange={setShouldRandomlyAUF}
                            title="Add random U moves at start"
                        />
                    </List.Section>
                    {!areCasesSelected && <CheckboxPicker title="Select algorithm sets:" {...checkboxPickerState} />}
                    <Button style={styles.startButton} mode="contained" children="Start!" onPress={startTimeAttack} />
                </ScrollView>
            ) : (
                <View style={styles.helpTextContainer}>
                    <Caption style={styles.header}>
                        {"You don't have any algorithm sets.\nHow about "}
                        <Text style={{ color: "blue", textDecorationLine: "underline" }} onPress={goToAddScreen}>
                            adding a case with one
                        </Text>
                        {" or maybe "}
                        <Text style={{ color: "blue", textDecorationLine: "underline" }} onPress={goToImportScreen}>
                            importing one
                        </Text>
                        ?
                    </Caption>
                </View>
            )}
            <HelpScreen />
        </View>
    );
};

export default observer(TimeAttackOpeningScreen);
