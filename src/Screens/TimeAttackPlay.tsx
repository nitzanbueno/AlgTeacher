import React, { useState, FC, useEffect, useContext } from "react";
import { Text, View, StyleSheet, TouchableWithoutFeedback, TouchableNativeFeedback } from "react-native";
import { TOUCHABLE_BACKGROUND, Case } from "../Models";
import { CaseStoreContext } from "../CaseStore";
import { GenerateScramble, MirrorAlgorithm } from "../ScrambleLib";
import { GetTimeText, ShuffleArray, RandomChoice } from "../Utils";
import Timer from "../CommonComponents/Timer";
import { observer } from "mobx-react";

const UNDEFINED_SCRAMBLE_TEXT: string = "Loading...";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        textAlign: "center",
        // justifyContent: "center",
    },
    buttonView: {
        marginTop: 0,
        width: 150,
        borderRadius: 5,
        textAlign: "center",
        height: 50,
    },
    anchoredButton: {
        width: "100%",
        flex: 1,
    },
    startButton: {
        backgroundColor: "#26C281",
        color: "black",
    },
    showSolutionButton: {
        backgroundColor: "grey",
    },
    buttonText: {
        height: "100%",
        textAlignVertical: "center",
        textAlign: "center",
        color: "white",
    },
    bigButtonText: {
        fontSize: 55,
    },
    descriptionText: {
        marginTop: 30,
        fontSize: 30,
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
    stopButton: {
        backgroundColor: "#22A7F0",
    },
});

enum TimeAttackButtonOption {
    START_TIMER,
    STOP_TIMER,
    NEXT_CASE,
}

function BottomScreenButton(props: { style: Object; onPress: () => void; text: string }) {
    return (
        <View style={[styles.anchoredButton, props.style]}>
            <TouchableNativeFeedback onPress={props.onPress} background={TOUCHABLE_BACKGROUND}>
                <Text style={[props.style, styles.buttonText, styles.bigButtonText]}>{props.text}</Text>
            </TouchableNativeFeedback>
        </View>
    );
}

interface Props {
    route: { params: { cases: Case[]; highScoreKey: string; shouldRandomlyMirror: boolean; shouldRandomlyAUF: boolean } };
    navigation: any;
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

    function goToEndScreen() {
        props.navigation.replace("TimeAttackEnd", {
            totalTime,
            highScoreKey: props.route.params.highScoreKey,
            solveCount,
            totalCount: cases.length
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
                GenerateScramble(newCase.algorithm, (success, scramble) => {
                    setScramble(success ? scramble : "Error");
                });
            }
        },
        [currentCaseIndex, cases],
    );

    useEffect(
        function initializeCases() {
            const { shouldRandomlyAUF, shouldRandomlyMirror } = props.route.params;
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
                return <BottomScreenButton text="Stop" onPress={stopTimer} style={styles.stopButton} />;
            case TimeAttackButtonOption.START_TIMER:
                return <BottomScreenButton text="Start" onPress={startTimer} style={styles.startButton} />;
            case TimeAttackButtonOption.NEXT_CASE:
                return <BottomScreenButton text="Next Case" onPress={skipCase} style={styles.stopButton} />;
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
                        <View style={[styles.buttonView, styles.showSolutionButton]}>
                            <TouchableWithoutFeedback
                                onPress={() => {
                                    setShouldDisplaySolution(true);
                                    setButtonToDisplay(TimeAttackButtonOption.NEXT_CASE);
                                }}
                            >
                                <Text style={styles.buttonText}>Show solution</Text>
                            </TouchableWithoutFeedback>
                        </View>
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
