import React, { useState, FC, useEffect, useContext } from "react";
import { Text, View, StyleSheet, TouchableWithoutFeedback, TouchableNativeFeedback } from "react-native";
import { TOUCHABLE_BACKGROUND, Case } from "../Models";
import { CaseStoreContext } from "../CaseStore";
import { GenerateScrambleAsync, MirrorAlgorithm } from "../ScrambleLib";
import { GetTimeText, ShuffleArray, RandomChoice } from "../Utils";
import Timer from "../CommonComponents/Timer";
import { observer } from "mobx-react";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../RootStackParamList";
import { RouteProp } from "@react-navigation/native";
import { Button, useTheme } from "react-native-paper";

const UNDEFINED_SCRAMBLE_TEXT: string = "Loading...";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        textAlign: "center",
        // justifyContent: "center",
    },
    anchoredButton: {
        width: "100%",
        flex: 1,
    },
    buttonText: {
        height: "100%",
        textAlignVertical: "center",
        textAlign: "center",
    },
    bigButtonText: {
        fontSize: 55,
    },
    header: {
        fontSize: 40,
        marginBottom: 20,
        textAlign: "center",
    },
    algorithmText: {
        fontSize: 30,
        height: 150,
        width: "90%",
        textAlign: "center",
    },
    scrambleText: {
        marginTop: 50,
    },
    solutionView: {
        height: 200,
        width: "100%",
        alignItems: "center",
    },
    timerText: {
        marginTop: 40,
        fontSize: 50,
    },
});

enum TimeAttackButtonOption {
    START_TIMER,
    STOP_TIMER,
    NEXT_CASE,
}

function BottomScreenButton(props: { color?: string; onPress?: () => void; onTouchStart?: () => void; text: string }) {
    return (
        <Button
            uppercase={false}
            contentStyle={styles.buttonText}
            onTouchStart={props.onTouchStart}
            onPress={props.onPress}
            labelStyle={styles.bigButtonText}
            style={styles.anchoredButton}
            mode="contained"
            color={props.color}
        >
            {props.text}
        </Button>
    );
}

interface Props {
    navigation: StackNavigationProp<RootStackParamList, "TimeAttackPlay">;
    route: RouteProp<RootStackParamList, "TimeAttackPlay">;
}

const TimeAttackPlayScreen: FC<Props> = props => {
    const caseStore = useContext(CaseStoreContext);
    const [currentCaseIndex, setCurrentCaseIndex] = useState(-1);
    const [scramble, setScramble] = useState(UNDEFINED_SCRAMBLE_TEXT);
    const [shouldDisplaySolution, setShouldDisplaySolution] = useState(false);
    const [cases, setCases] = useState<Case[]>([]);
    const [buttonToDisplay, setButtonToDisplay] = useState(TimeAttackButtonOption.START_TIMER);
    const [timerStartTimestamp, setTimerStartTimestamp] = useState<Date | null>(null);
    const [totalTime, setTotalTime] = useState(0);
    const [solveCount, setSolveCount] = useState(0);
    const theme = useTheme();

    function goToEndScreen() {
        props.navigation.replace("TimeAttackEnd", {
            ...props.route.params,
            totalTime,
            solveCount,
            totalCount: cases.length,
        });
    }

    function stopTimer() {
        const timerStopTimestamp = new Date();

        if (!timerStartTimestamp) return;

        let caseTime = timerStopTimestamp.getTime() - timerStartTimestamp.getTime();

        setScramble(UNDEFINED_SCRAMBLE_TEXT);
        setTotalTime(prevTotalTime => prevTotalTime + caseTime);
        setTimerStartTimestamp(null);
        setSolveCount(prevSolveCount => prevSolveCount + 1);
        setCurrentCaseIndex(x => x + 1);
    }

    function skipCase() {
        setTimerStartTimestamp(null);
        setCurrentCaseIndex(x => x + 1);
    }

    useEffect(
        function updateDisplayedCase() {
            if (currentCaseIndex >= cases.length) {
                goToEndScreen();
                return;
            }

            const newCase = cases[currentCaseIndex];

            setShouldDisplaySolution(false);
            setButtonToDisplay(TimeAttackButtonOption.START_TIMER);

            if (newCase) {
                GenerateScrambleAsync(newCase.algorithm)
                    .then(newScramble => setScramble(newScramble))
                    .catch(() => setScramble("Error"));
            }
        },
        [currentCaseIndex, cases],
    );

    useEffect(
        function initializeCases() {
            const { shouldRandomlyAUF, shouldRandomlyMirror } = props.route.params.options;
            // Detach the cases from mobx, so that when we randomly mirror and AUF, the actual cases don't get edited
            let testedCases = ShuffleArray(props.route.params.cases.map(x => ({ ...x })));

            if (shouldRandomlyMirror) {
                for (const testedCase of testedCases) {
                    if (RandomChoice([true, false])) {
                        testedCase.algorithm = MirrorAlgorithm(testedCase.algorithm);
                    }
                }
            }

            if (shouldRandomlyAUF) {
                for (const testedCase of testedCases) {
                    const randomAUF = RandomChoice(["", "(U) ", "(U') ", "(U2) "]);
                    testedCase.algorithm = randomAUF + testedCase.algorithm;
                }
            }

            setCases(testedCases);
            setCurrentCaseIndex(0);
        },
        [props.route.params.cases],
    );

    function startTimer() {
        setButtonToDisplay(TimeAttackButtonOption.STOP_TIMER);
        setTimerStartTimestamp(new Date());
    }

    function BottomButton() {
        switch (buttonToDisplay) {
            case TimeAttackButtonOption.STOP_TIMER:
                return <BottomScreenButton text="Stop" onPress={stopTimer} color={theme.colors.stopButton} />;
            case TimeAttackButtonOption.START_TIMER:
                return <BottomScreenButton text="Start" onPress={startTimer} color={theme.colors.startButton} />;
            case TimeAttackButtonOption.NEXT_CASE:
                return <BottomScreenButton text="Next Case" onPress={skipCase} color={theme.colors.stopButton} />;
        }
    }

    return (
        <View style={styles.container}>
            <Text style={[styles.scrambleText, styles.algorithmText]}>{scramble}</Text>
            <View style={styles.solutionView}>
                {shouldDisplaySolution && cases[currentCaseIndex] ? (
                    [
                        <Text key="header" style={styles.header}>
                            Solution:
                        </Text>,
                        <Text key="text" style={styles.algorithmText}>
                            {cases[currentCaseIndex].algorithm}
                        </Text>,
                    ]
                ) : (
                    <>
                        <Button
                            mode="contained"
                            color={theme.colors.solutionButton}
                            onPress={() => {
                                setShouldDisplaySolution(true);
                                setButtonToDisplay(TimeAttackButtonOption.NEXT_CASE);
                            }}
                            children="Show solution"
                        />
                        <View style={{ height: 20 }}>
                            {timerStartTimestamp ? (
                                <Timer style={styles.timerText} startTimestamp={timerStartTimestamp.getTime()} extraTime={totalTime} />
                            ) : (
                                <Text style={styles.timerText}>{GetTimeText(totalTime)}</Text>
                            )}
                        </View>
                    </>
                )}
            </View>
            <BottomButton />
        </View>
    );
};

export default observer(TimeAttackPlayScreen);
