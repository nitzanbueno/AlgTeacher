import React from "react";
import { Component } from "react";
import { Text, Image, View, StyleSheet, ToastAndroid } from "react-native";
import { TouchableNativeFeedback } from "react-native-gesture-handler";
import { TOUCHABLE_BACKGROUND, Case } from "./Models";
import Cube from "cubejs";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        // justifyContent: "center",
    },
    caseImage: {
        width: 300,
        height: 300,
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
    buttonText: {
        height: "100%",
        textAlignVertical: "center",
        textAlign: "center",
        color: "white",
    },
    descriptionText: {
        marginTop: 30,
        fontSize: 30,
    },
});

export class TestScreen extends Component<
    {
        route: { params: { case: Case } };
        navigation: any;
    },
    { scramble?: string }
> {
    constructor(props: any) {
        super(props);
        this.state = { scramble: undefined };
    }

    renderImage = () => {
        return (
            <Image
                style={styles.caseImage}
                source={{ uri: this.props.route.params.case.imageUrl }}
            />
        );
    };

    onButtonClick = (didRemember: boolean) => {
        ToastAndroid.show(`${didRemember ? "Did" : "Didn't"} remember!`, 1000);
        this.props.navigation.navigate("Main");
    };

    createScramble = () => {
        // We perform the algorithm on the cube, then we solve it.
        // This gives us the inverse of the algorithm, but in an inefficient Kociemba way.
        // This lets us present it to the user without them able to figure out
        // what the algorithm itself is (other than remembering it, which is the goal).
        var cube = new Cube();
        cube.move(this.props.route.params.case.algorithm);
        var scramble = cube.solve();

        return scramble;
    };

    componentDidMount() {
        this.setState({ scramble: this.createScramble() });
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.descriptionText}>
                    Description: {this.props.route.params.case.description}
                </Text>
                {this.renderImage()}
                <Text>Scramble: {this.state.scramble || "Loading..."}</Text>
                <Text>Do you remember the solution to this case?</Text>
                <View style={styles.buttonContainer}>
                    <TouchableNativeFeedback
                        onPress={() => this.onButtonClick(true)}
                        background={TOUCHABLE_BACKGROUND}
                    >
                        <View style={[styles.buttonView, styles.yesButton]}>
                            <Text style={styles.buttonText}>Yes</Text>
                        </View>
                    </TouchableNativeFeedback>
                    <TouchableNativeFeedback
                        onPress={() => this.onButtonClick(false)}
                        background={TOUCHABLE_BACKGROUND}
                    >
                        <View style={[styles.buttonView, styles.noButton]}>
                            <Text style={styles.buttonText}>No</Text>
                        </View>
                    </TouchableNativeFeedback>
                </View>
            </View>
        );
    }
}
