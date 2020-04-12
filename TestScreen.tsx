import React from "react";
import { Component } from "react";
import {
    Text,
    View,
    StyleSheet,
} from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    caseImage: {
        width: 150,
        height: 150,
    },
});

export class TestScreen extends Component<{case: Case}> {
    render() {
        return (
            <View style={styles.container}>
                <Text>
                    This is a screen for editing the case with ID {this.props.route.params.case.id}.
                </Text>
            </View>
        );
    }
}
