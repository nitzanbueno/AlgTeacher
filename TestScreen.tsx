import React from "react";
import { Component } from "react";
import { Text, Image, View, StyleSheet, ToastAndroid } from "react-native";
import { TouchableNativeFeedback } from "react-native-gesture-handler";
import { TOUCHABLE_BACKGROUND, Case } from "./Models";

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
    any
> {
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

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.descriptionText}>
                    Description: {this.props.route.params.case.description}
                </Text>
                {this.renderImage()}
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
