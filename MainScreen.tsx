import React from "react";
import { Component } from "react";
import {
    Image,
    View,
    FlatList,
    TouchableNativeFeedback,
    Platform,
    StyleSheet,
} from "react-native";
import { Case, CASE_STUBS } from "./Models";

const CASE_COLUMNS = 2;

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

export class MainScreen extends Component<{ navigation: any }> {
    showEditCaseDialog() {
        alert("This needs to be a better editing dialog.");
    }

    goToCase(chosenCase: Case) {
        this.props.navigation.navigate("Test", { case: chosenCase });
    }

    renderCase({ item }: { item: Case }) {
        return (
            <TouchableNativeFeedback
                onPress={() => this.goToCase.bind(this)(item)}
                onLongPress={this.showEditCaseDialog.bind(this)}
                background={
                    Platform.OS === "android"
                        ? TouchableNativeFeedback.SelectableBackground()
                        : undefined
                }
            >
                <Image
                    style={styles.caseImage}
                    source={{ uri: item.imageUrl }}
                />
            </TouchableNativeFeedback>
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={CASE_STUBS}
                    renderItem={this.renderCase.bind(this)}
                    keyExtractor={(item) => item.id}
                    numColumns={CASE_COLUMNS}
                />
            </View>
        );
    }
}
