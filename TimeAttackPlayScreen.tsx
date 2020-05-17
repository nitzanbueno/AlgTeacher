import React from 'react';
import {Component} from 'react';
import {Text, View, StyleSheet, Button} from 'react-native';
import {TouchableNativeFeedback} from 'react-native-gesture-handler';
import {TOUCHABLE_BACKGROUND, Case} from './Models';
import ScrambleLib from 'react-native-scramble-lib';
import {GetAllCases} from './CaseStorage';
import {ShuffleArray} from './Helpers';
import {CheckboxPicker, CheckboxPickerOptionArray} from './CheckboxPicker';
import {GenerateScramble} from './ScrambleLib';
import {getTimeText} from './Utils';

const UNDEFINED_SCRAMBLE_TEXT: string = 'Loading...';
const TIMEOUT = 11;

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

class Timer extends Component<{startTimestamp: number; style: any; extraTime?: number}, {timeText: string}> {
    intervalCallback: any;
    isUnmounted = false;

    constructor(props: any) {
        super(props);

        this.state = {timeText: getTimeText(props.extraTime)};
    }

    updateTime = () => {
        if (this.isUnmounted) return;
        const currentTime = new Date();
        const timeAmount = currentTime.getTime() - this.props.startTimestamp + (this.props.extraTime || 0);

        this.setState({timeText: getTimeText(timeAmount)});
    };

    componentDidMount() {
        this.intervalCallback = setInterval(this.updateTime, TIMEOUT);
    }

    componentWillUnmount() {
        clearInterval(this.intervalCallback);
        this.isUnmounted = true;
    }

    render() {
        return <Text style={this.props.style}>{this.state.timeText}</Text>;
    }
}

export class TimeAttackPlayScreen extends Component<
    {
        route: {params: {categories: string[]}};
        navigation: any;
    },
    {
        currentCaseIndex: number;
        scramble: string;
        shouldDisplaySolution: boolean;
        cases: Case[];
        buttonToDisplay: TimeAttackButtonOption;
        timerStartTimestamp?: Date;
        totalTime: number;
    }
> {
    constructor(props: any) {
        super(props);
        this.state = {
            currentCaseIndex: -1,
            scramble: UNDEFINED_SCRAMBLE_TEXT,
            shouldDisplaySolution: false,
            cases: [],
            buttonToDisplay: TimeAttackButtonOption.START_TIMER,
            timerStartTimestamp: undefined,
            totalTime: 0,
        };
    }

    goToEndScreen = () => {
        this.props.navigation.replace('TimeAttackEnd', {
            totalTime: this.state.totalTime,
            cases: this.state.cases
        });
    };

    stopTimer = () => {
        const timerStopTimestamp = new Date();

        if (!this.state.timerStartTimestamp) return;

        let caseTime = timerStopTimestamp.getTime() - this.state.timerStartTimestamp.getTime();

        this.setState(prevState => {
            return {
                scramble: UNDEFINED_SCRAMBLE_TEXT,
                totalTime: prevState.totalTime + caseTime,
                timerStartTimestamp: undefined,
            };
        }, this.getNextCase);
    };

    skipCase = () => {
        this.setState({timerStartTimestamp: undefined}, this.getNextCase);
    };

    getNextCase = () => {
        let nextCaseIndex = this.state.currentCaseIndex + 1;

        if (nextCaseIndex >= this.state.cases.length) {
            this.goToEndScreen();
            return;
        }

        this.setState({
            currentCaseIndex: nextCaseIndex,
            shouldDisplaySolution: false,
            buttonToDisplay: TimeAttackButtonOption.START_TIMER,
        });

        let nextCase: Case = this.state.cases[nextCaseIndex];

        if (nextCase) {
            GenerateScramble(nextCase.algorithm, (success, scramble) => {
                this.setState({
                    scramble: success ? scramble : 'Error',
                });
            });
        }
    };

    initCases = (cases: Case[]) => {
        let categories = this.props.route.params.categories;
        let testedCases = ShuffleArray(cases);
        if (categories) {
            testedCases = testedCases.filter(c => c.category && categories.includes(c.category));
        }
        this.setState({cases: testedCases, currentCaseIndex: -1});
        this.getNextCase();
    };

    componentDidMount() {
        GetAllCases().then(cases => {
            this.initCases(cases);
        });
    }

    startTimer = () => {
        this.setState({
            buttonToDisplay: TimeAttackButtonOption.STOP_TIMER,
            timerStartTimestamp: new Date(),
        });
    };

    renderBottomButton = () => {
        switch (this.state.buttonToDisplay) {
            case TimeAttackButtonOption.STOP_TIMER:
                return <BottomScreenButton text="Stop" onPress={this.stopTimer} style={styles.nextCaseButton} />;
            case TimeAttackButtonOption.START_TIMER:
                return <BottomScreenButton text="Start" onPress={this.startTimer} style={styles.nextCaseButton} />;
            case TimeAttackButtonOption.NEXT_CASE:
                return <BottomScreenButton text="Next Case" onPress={this.skipCase} style={styles.nextCaseButton} />;
        }
    };

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.header}>Scramble:</Text>
                <Text style={styles.algorithmText}>{this.state.scramble}</Text>
                <View style={styles.solutionView}>
                    {this.state.shouldDisplaySolution && this.state.cases[this.state.currentCaseIndex] ? (
                        [
                            <Text key="header" style={styles.header}>
                                Solution:
                            </Text>,
                            <Text key="text" style={styles.algorithmText}>
                                {this.state.cases[this.state.currentCaseIndex].algorithm}
                            </Text>,
                        ]
                    ) : (
                        <>
                            <View style={{height: 20}}>
                                {this.state.timerStartTimestamp ? (
                                    <Timer
                                        style={styles.timerText}
                                        startTimestamp={this.state.timerStartTimestamp.getTime()}
                                        extraTime={this.state.totalTime}
                                    />
                                ) : (
                                    <Text style={styles.timerText}>{getTimeText(this.state.totalTime)}</Text>
                                )}
                            </View>
                            <View style={[styles.buttonView, styles.noButton]}>
                                <TouchableNativeFeedback
                                    onPress={() => {
                                        this.setState({
                                            shouldDisplaySolution: true,
                                            buttonToDisplay: TimeAttackButtonOption.NEXT_CASE,
                                        });
                                    }}
                                    background={TOUCHABLE_BACKGROUND}>
                                    <Text style={[styles.buttonText, {color: 'white'}]}>I forgot</Text>
                                </TouchableNativeFeedback>
                            </View>
                        </>
                    )}
                </View>
                {this.renderBottomButton()}
            </View>
        );
    }
}
