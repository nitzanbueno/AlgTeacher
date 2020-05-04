import React from "react";
import { Component } from "react";
import { Text, View, StyleSheet, Button } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        textAlign: "center",
        // justifyContent: "center",
    },
    header: {
        fontSize: 60,
        marginBottom: 20,
        textAlign: "center",
    },
});

export class TimeAttackEndScreen extends Component<{route: any}> {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.header}>Done!</Text>
                <Text>Here's that some param: {this.props.route.params.someParam}</Text>
            </View>
        );
    }
}