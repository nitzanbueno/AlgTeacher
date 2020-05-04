import React from "react";
import { Component } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import { TouchableNativeFeedback } from "react-native-gesture-handler";
import { TOUCHABLE_BACKGROUND, Case } from "./Models";
import ScrambleLib from "react-native-scramble-lib";
import { GetAllCases } from "./CaseStorage";
import { ShuffleArray } from "./Helpers";
import { CheckboxPicker, CheckboxPickerOptionArray } from "./CheckboxPicker";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        textAlign: "center",
        // justifyContent: "center",
    },
    buttonView: {
        marginTop: 20,
        width: 150,
        borderRadius: 5,
        textAlign: "center",
        height: 50,
    },
    anchoredButton: {
        width: "100%",
        flex: 1,
    },
    yesButton: {
        backgroundColor: "chartreuse",
        color: "black",
    },
    noButton: {
        backgroundColor: "orangered",
    },
    okButton: {
        backgroundColor: "dodgerblue",
    },
    buttonText: {
        height: "100%",
        textAlignVertical: "center",
        textAlign: "center",
    },
    descriptionText: {
        marginTop: 30,
        fontSize: 30,
    },
    header: {
        fontSize: 60,
        marginBottom: 20,
        textAlign: "center",
    },
    algorithmText: {
        fontSize: 30,
        height: 150,
        width: "90%",
        textAlign: "center",
    },
    solutionView: {
        height: 200,
        width: "100%",
        alignItems: "center",
    },
});

const UNDEFINED_SCRAMBLE_TEXT: string = "Loading...";

export class TimeAttackPlayScreen extends Component<
    {
        route: { params: { categories: string[] } };
        navigation: any;
    },
    {
        currentCaseIndex: number;
        scramble: string;
        shouldDisplaySolution: boolean;
        cases: Case[];
    }
> {
    constructor(props: any) {
        super(props);
        this.state = {
            currentCaseIndex: -1,
            scramble: UNDEFINED_SCRAMBLE_TEXT,
            shouldDisplaySolution: false,
            cases: [],
        };
    }

    goToEndScreen = () => {
        this.props.navigation.replace("TimeAttackEnd", {
            someParam: "This is a test."
        });
    }

    getNextCase = () => {
        let nextCaseIndex = this.state.currentCaseIndex + 1;

        if (nextCaseIndex >= this.state.cases.length) {
            this.goToEndScreen();
            return;
        }

        this.setState({
            currentCaseIndex: nextCaseIndex,
            shouldDisplaySolution: false,
            scramble: UNDEFINED_SCRAMBLE_TEXT,
        });

        let nextCase: Case = this.state.cases[nextCaseIndex];

        if (nextCase) {
            ScrambleLib.generateScramble(
                nextCase.algorithm,
                (success, scramble) => {
                    if (success) {
                        this.setState({ scramble: scramble });
                    } else {
                        this.setState({ scramble: "Error" });
                    }
                }
            );
        }
    };

    initCases = (cases: Case[]) => {
        let categories  = this.props.route.params.categories;
        let testedCases = ShuffleArray(cases);
        if (categories) {
            testedCases = testedCases.filter(c => c.category && categories.includes(c.category));
        }
        this.setState({ cases: testedCases, currentCaseIndex: -1 });
        this.getNextCase();
    };

    componentDidMount() {
        GetAllCases().then((cases) => {
            this.initCases(cases);
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.header}>Scramble:</Text>
                <Text style={styles.algorithmText}>{this.state.scramble}</Text>
                <View style={styles.solutionView}>
                    {this.state.shouldDisplaySolution &&
                    this.state.cases[this.state.currentCaseIndex] ? (
                        [
                            <Text key="header" style={styles.header}>
                                Solution:
                            </Text>,
                            <Text key="text" style={styles.algorithmText}>
                                {
                                    this.state.cases[
                                        this.state.currentCaseIndex
                                    ].algorithm
                                }
                            </Text>,
                        ]
                    ) : (
                        <View style={[styles.buttonView, styles.noButton]}>
                            <TouchableNativeFeedback
                                onPress={() => {
                                    this.setState({
                                        shouldDisplaySolution: true,
                                    });
                                }}
                                background={TOUCHABLE_BACKGROUND}
                            >
                                <Text
                                    style={[
                                        styles.buttonText,
                                        { color: "white" },
                                    ]}
                                >
                                    I forgot
                                </Text>
                            </TouchableNativeFeedback>
                        </View>
                    )}
                </View>
                <View style={[styles.anchoredButton, styles.yesButton]}>
                    <TouchableNativeFeedback
                        onPress={this.getNextCase}
                        background={TOUCHABLE_BACKGROUND}
                    >
                        <Text style={styles.buttonText}>Next Case</Text>
                    </TouchableNativeFeedback>
                </View>
            </View>
        );
    }
}

