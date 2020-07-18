import React, { useState, FC, useEffect, useContext } from 'react';
import {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {TouchableNativeFeedback} from 'react-native-gesture-handler';
import {TOUCHABLE_BACKGROUND, Case} from '../Models';
import { CaseStoreContext } from '../CaseStore';
import {GenerateScramble} from '../ScrambleLib';
import {GetTimeText, ShuffleArray} from '../Utils';
import Timer from '../CommonComponents/Timer';
import { observer } from 'mobx-react';

const UNDEFINED_SCRAMBLE_TEXT: string = 'Loading...';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        textAlign: 'center',
        // justifyContent: "center",
    },
    buttonView: {
        marginTop: 20,
        width: 150,
        borderRadius: 5,
        textAlign: 'center',
        height: 50,
    },
    anchoredButton: {
        width: '100%',
        flex: 1,
    },
    nextCaseButton: {
        backgroundColor: 'chartreuse',
        color: 'black',
    },
    noButton: {
        backgroundColor: 'orangered',
    },
    okButton: {
        backgroundColor: 'dodgerblue',
    },
    buttonText: {
        height: '100%',
        textAlignVertical: 'center',
        textAlign: 'center',
    },
    descriptionText: {
        marginTop: 30,
        fontSize: 30,
    },
    header: {
        fontSize: 60,
        marginBottom: 20,
        textAlign: 'center',
    },
    algorithmText: {
        fontSize: 30,
        height: 150,
        width: '90%',
        textAlign: 'center',
    },
    solutionView: {
        height: 200,
        width: '100%',
        alignItems: 'center',
    },
    timerText: {
        fontSize: 20,
    },
});

enum TimeAttackButtonOption {
    START_TIMER,
    STOP_TIMER,
    NEXT_CASE,
}

function BottomScreenButton(props: {style: Object; onPress: () => void; text: string}) {
    return (
        <View style={[styles.anchoredButton, props.style]}>
            <TouchableNativeFeedback onPress={props.onPress} background={TOUCHABLE_BACKGROUND}>
                <Text style={[props.style, styles.buttonText]}>{props.text}</Text>
            </TouchableNativeFeedback>
        </View>
    );
}

interface Props {
    route: {params: {categories: string[]}};
    navigation: any;
}

const TimeAttackPlayScreen: FC<Props> = (props) => {
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
        props.navigation.replace('TimeAttackEnd', {
            totalTime: totalTime,
            cases: cases,
            solveCount: solveCount,
        });
    };

    function stopTimer() {
        const timerStopTimestamp = new Date();

        if (!timerStartTimestamp) return;

        let caseTime = timerStopTimestamp.getTime() - timerStartTimestamp.getTime();

        setScramble(UNDEFINED_SCRAMBLE_TEXT);
        setTotalTime(prevTotalTime => prevTotalTime + caseTime)
        setTimerStartTimestamp(null);
        setSolveCount(prevSolveCount => prevSolveCount + 1);
        setCurrentCaseIndex(x => x + 1);
    };

    function skipCase() {
        setTimerStartTimestamp(null);
        setCurrentCaseIndex(x => x + 1);
    };

    useEffect(() => {
        if (currentCaseIndex >= cases.length) {
            goToEndScreen();
            return;
        }

        const newCase = cases[currentCaseIndex];

        setShouldDisplaySolution(false);
        setButtonToDisplay(TimeAttackButtonOption.START_TIMER);

        if (newCase) {
            GenerateScramble(newCase.algorithm, (success, scramble) => {
                setScramble(success ? scramble : 'Error');
            });
        }
    }, [currentCaseIndex, cases]);

    useEffect(() => {
        let categories = props.route.params.categories;
        let testedCases = ShuffleArray(caseStore.cases);

        if (categories) {
            testedCases = testedCases.filter(c => c.category && categories.includes(c.category));
        }

        setCases(testedCases);
        setCurrentCaseIndex(0);
    }, [caseStore.cases]);

    function startTimer() {
        setButtonToDisplay(TimeAttackButtonOption.STOP_TIMER);
        setTimerStartTimestamp(new Date());
    };

    function BottomButton() {
        switch (buttonToDisplay) {
            case TimeAttackButtonOption.STOP_TIMER:
                return <BottomScreenButton text="Stop" onPress={stopTimer} style={styles.nextCaseButton} />;
            case TimeAttackButtonOption.START_TIMER:
                return <BottomScreenButton text="Start" onPress={startTimer} style={styles.nextCaseButton} />;
            case TimeAttackButtonOption.NEXT_CASE:
                return <BottomScreenButton text="Next Case" onPress={skipCase} style={styles.nextCaseButton} />;
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Scramble:</Text>
            <Text style={styles.algorithmText}>{scramble}</Text>
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
                        <View style={{height: 20}}>
                            {timerStartTimestamp ? (
                                <Timer
                                    style={styles.timerText}
                                    startTimestamp={timerStartTimestamp.getTime()}
                                    extraTime={totalTime}
                                />
                            ) : (
                                <Text style={styles.timerText}>{GetTimeText(totalTime)}</Text>
                            )}
                        </View>
                        <View style={[styles.buttonView, styles.noButton]}>
                            <TouchableNativeFeedback
                                onPress={() => {
                                    setShouldDisplaySolution(true);
                                    setButtonToDisplay(TimeAttackButtonOption.NEXT_CASE);
                                }}
                                background={TOUCHABLE_BACKGROUND}>
                                <Text style={[styles.buttonText, {color: 'white'}]}>I forgot</Text>
                            </TouchableNativeFeedback>
                        </View>
                    </>
                )}
            </View>
            <BottomButton />
        </View>
    );
}

export default observer(TimeAttackPlayScreen);
