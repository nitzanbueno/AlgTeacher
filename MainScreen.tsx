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
import { Case } from "./Models";

const CASE_COLUMNS = 2;

let cases: Array<Case> = [
    {
        imageUrl:
            "http://cube.crider.co.uk/visualcube.php?fmt=png&size=500&view=plan&stage=oll",
        id: "0",
        description: "Test",
    },
    {
        imageUrl:
            "http://cube.crider.co.uk/visualcube.php?fmt=png&size=500&r=y45x34&fd=nnnnnnnnnnnnnrnrrrnnnnfnfffdddddddddnnnnlnlllnnnnbnbbb",
        id: "1",
        description: "Test",
    },
    {
        imageUrl:
            "http://cube.crider.co.uk/visualcube.php?fmt=png&size=500&view=plan",
        id: "2",
        description: "Test",
    },
    {
        imageUrl:
            "http://cube.crider.co.uk/visualcube.php?fmt=png&size=500&view=plan&stage=oll",
        id: "3",
        description: "Test",
    },
    {
        imageUrl:
            "http://cube.crider.co.uk/visualcube.php?fmt=png&size=500&r=y45x34&fd=nnnnnnnnnnnnnrnrrrnnnnfnfffdddddddddnnnnlnlllnnnnbnbbb",
        id: "4",
        description: "Test",
    },
    {
        imageUrl:
            "http://cube.crider.co.uk/visualcube.php?fmt=png&size=500&view=plan",
        id: "5",
        description: "Test",
    },
    {
        imageUrl:
            "http://cube.crider.co.uk/visualcube.php?fmt=png&size=500&view=plan&stage=oll",
        id: "6",
        description: "Test",
    },
    {
        imageUrl:
            "http://cube.crider.co.uk/visualcube.php?fmt=png&size=500&view=plan&stage=oll",
        id: "7",
        description: "Test",
    },
    {
        imageUrl:
            "http://cube.crider.co.uk/visualcube.php?fmt=png&size=500&r=y45x34&fd=nnnnnnnnnnnnnrnrrrnnnnfnfffdddddddddnnnnlnlllnnnnbnbbb",
        id: "8",
        description: "Test",
    },
    {
        imageUrl:
            "http://cube.crider.co.uk/visualcube.php?fmt=png&size=500&view=plan",
        id: "9",
        description: "Test",
    },
    {
        imageUrl:
            "http://cube.crider.co.uk/visualcube.php?fmt=png&size=500&view=plan&stage=oll",
        id: "10",
        description: "Test",
    },
    {
        imageUrl:
            "http://cube.crider.co.uk/visualcube.php?fmt=png&size=500&r=y45x34&fd=nnnnnnnnnnnnnrnrrrnnnnfnfffdddddddddnnnnlnlllnnnnbnbbb",
        id: "11",
        description: "Test",
    },
    {
        imageUrl:
            "http://cube.crider.co.uk/visualcube.php?fmt=png&size=500&view=plan",
        id: "12",
        description: "Test",
    },
    {
        imageUrl:
            "http://cube.crider.co.uk/visualcube.php?fmt=png&size=500&view=plan&stage=oll",
        id: "13",
        description: "Test",
    },
    {
        imageUrl:
            "http://cube.crider.co.uk/visualcube.php?fmt=png&size=500&r=y45x34&fd=nnnnnnnnnnnnnrnrrrnnnnfnfffdddddddddnnnnlnlllnnnnbnbbb",
        id: "14",
        description: "Test",
    },
    {
        imageUrl:
            "http://cube.crider.co.uk/visualcube.php?fmt=png&size=500&view=plan",
        id: "15",
        description: "Test",
    },
    {
        imageUrl:
            "http://cube.crider.co.uk/visualcube.php?fmt=png&size=500&view=plan&stage=oll",
        id: "16",
        description: "Test",
    },
    {
        imageUrl:
            "http://cube.crider.co.uk/visualcube.php?fmt=png&size=500&view=plan&stage=oll",
        id: "17",
        description: "Test",
    },
    {
        imageUrl:
            "http://cube.crider.co.uk/visualcube.php?fmt=png&size=500&r=y45x34&fd=nnnnnnnnnnnnnrnrrrnnnnfnfffdddddddddnnnnlnlllnnnnbnbbb",
        id: "18",
        description: "Test",
    },
    {
        imageUrl:
            "http://cube.crider.co.uk/visualcube.php?fmt=png&size=500&view=plan",
        id: "19",
        description: "Test",
    },
];

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
                    data={cases}
                    renderItem={this.renderCase.bind(this)}
                    keyExtractor={(item) => item.id}
                    numColumns={CASE_COLUMNS}
                />
            </View>
        );
    }
}
