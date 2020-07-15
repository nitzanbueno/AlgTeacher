import React from "react";
import { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import { TouchableNativeFeedback } from "react-native-gesture-handler";
import { TOUCHABLE_BACKGROUND, Case } from "../Models";
import Icon from "react-native-vector-icons/FontAwesome";
import { GenerateScramble } from "../ScrambleLib";
import FixedSizeSvgUri from "../CommonComponents/FixedSizeSvgUri";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        // justifyContent: "center",
    },
    buttonContainer: {
        marginTop: 10,
        height: 50,
        width: 350,
        flexDirection: "row",
        justifyContent: "space-around",
    },
    buttonView: {
        width: 150,
        borderRadius: 5,
        color: "white",
        textAlign: "center",
    },
    yesButton: {
        backgroundColor: "chartreuse",
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
        color: "white",
    },
    categoryText: {
        marginTop: 30,
        fontSize: 30,
    },
    descriptionText: {
        marginTop: 30,
        fontSize: 20,
    },
    scrambleText: {
        fontSize: 15,
        textAlign: "center",
    },
    iconContainer: {
        flexDirection: "row",
        height: "100%",
        alignItems: "center",
        marginRight: 5,
    },
    icon: {
        marginRight: 10,
        marginLeft: 10,
        height: "100%",
        textAlignVertical: "center",
    },
});

const caseImageSize = {
    width: 300,
    height: 300,
};

export class TestScreen extends Component<
    {
        route: { params: { case: Case } };
        navigation: any;
    },
    { shouldDisplaySolution: boolean; scramble: string }
> {
    constructor(props: any) {
        super(props);
        this.state = { shouldDisplaySolution: false, scramble: "Loading..." };
    }

    renderImage = () => {
        return (
            <FixedSizeSvgUri
                {...caseImageSize}
                uri={this.props.route.params.case.imageUrl}
            />
        );
    };

    onClickYes = () => {
        this.props.navigation.navigate("Main");
    };

    onClickNo = () => {
        this.setState({ shouldDisplaySolution: true });
    };

    onClickOk = this.onClickYes;

    openEditScreen = () => {
        this.props.navigation.navigate("Add", {
            caseId: this.props.route.params.case.id,
            algorithm: this.props.route.params.case.algorithm,
            description: this.props.route.params.case.description,
            imageUrl: this.props.route.params.case.imageUrl,
            category: this.props.route.params.case.category,
            title: "Edit",
            callerScreen: "Test"
        })
    }

    componentDidMount() {
        this.props.navigation.setOptions({
            headerRight: () => (
                <View style={styles.iconContainer}>
                    <TouchableNativeFeedback onPress={this.openEditScreen}>
                        <Icon style={styles.icon} name="pencil" size={20} />
                    </TouchableNativeFeedback>
                </View>
            ),
        });

        GenerateScramble(
            this.props.route.params.case.algorithm,
            (success, scramble) => {
                if (success) {
                    this.setState({ scramble: scramble });
                } else {
                    this.setState({ scramble: "Error" });
                }
            }
        );
    }

    render() {
        return (
            <View style={styles.container}>
                {!!this.props.route.params.case.category && (
                    <Text style={styles.categoryText}>
                        {this.props.route.params.case.category}
                    </Text>
                )}
                {!!this.props.route.params.case.description && (
                    <Text style={styles.descriptionText}>
                        Description: {this.props.route.params.case.description}
                    </Text>
                )}
                {this.renderImage()}
                {!this.state.shouldDisplaySolution ? (
                    <View>
                        <Text style={styles.scrambleText}>Scramble:</Text>
                        <Text style={styles.scrambleText}>
                            {this.state.scramble}
                        </Text>
                        <Text style={styles.scrambleText}>
                            Do you remember the solution to this case?
                        </Text>
                    </View>
                ) : (
                    <View>
                        <Text style={styles.scrambleText}>Solution:</Text>
                        <Text style={styles.scrambleText}>
                            {this.props.route.params.case.algorithm}
                        </Text>
                    </View>
                )}
                <View style={styles.buttonContainer}>
                    {!this.state.shouldDisplaySolution ? (
                        [
                            <TouchableNativeFeedback
                                onPress={() => this.onClickYes()}
                                background={TOUCHABLE_BACKGROUND}
                                key="yesButton"
                            >
                                <View
                                    style={[
                                        styles.buttonView,
                                        styles.yesButton,
                                    ]}
                                >
                                    <Text style={styles.buttonText}>Yes</Text>
                                </View>
                            </TouchableNativeFeedback>,
                            <TouchableNativeFeedback
                                onPress={() => this.onClickNo()}
                                background={TOUCHABLE_BACKGROUND}
                                key="noButton"
                            >
                                <View
                                    style={[styles.buttonView, styles.noButton]}
                                >
                                    <Text style={styles.buttonText}>No</Text>
                                </View>
                            </TouchableNativeFeedback>,
                        ]
                    ) : (
                        <TouchableNativeFeedback
                            onPress={() => this.onClickOk()}
                            background={TOUCHABLE_BACKGROUND}
                        >
                            <View style={[styles.buttonView, styles.okButton]}>
                                <Text style={styles.buttonText}>Got it!</Text>
                            </View>
                        </TouchableNativeFeedback>
                    )}
                </View>
            </View>
        );
    }
}
