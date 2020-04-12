import React from "react";
import { Component } from "react";
import { Image, View, FlatList, TouchableNativeFeedback, Platform, StyleSheet } from "react-native";

const CASE_COLUMNS = 2;

interface Case {
    imageUrl: string;
    id: string;
}

let cases = [
    {
        imageUrl:
            "http://cube.crider.co.uk/visualcube.php?fmt=png&size=500&view=plan&stage=oll",
        id: "0",
    },
    {
        imageUrl:
            "http://cube.crider.co.uk/visualcube.php?fmt=png&size=500&r=y45x34&fd=nnnnnnnnnnnnnrnrrrnnnnfnfffdddddddddnnnnlnlllnnnnbnbbb",
        id: "1",
    },
    {
        imageUrl:
            "http://cube.crider.co.uk/visualcube.php?fmt=png&size=500&view=plan",
        id: "2",
    },
    {
        imageUrl:
            "http://cube.crider.co.uk/visualcube.php?fmt=png&size=500&view=plan&stage=oll",
        id: "3",
    },
    {
        imageUrl:
            "http://cube.crider.co.uk/visualcube.php?fmt=png&size=500&r=y45x34&fd=nnnnnnnnnnnnnrnrrrnnnnfnfffdddddddddnnnnlnlllnnnnbnbbb",
        id: "4",
    },
    {
        imageUrl:
            "http://cube.crider.co.uk/visualcube.php?fmt=png&size=500&view=plan",
        id: "5",
    },
    {
        imageUrl:
            "http://cube.crider.co.uk/visualcube.php?fmt=png&size=500&view=plan&stage=oll",
        id: "6",
    },
    {
        imageUrl:
            "http://cube.crider.co.uk/visualcube.php?fmt=png&size=500&view=plan&stage=oll",
        id: "7",
    },
    {
        imageUrl:
            "http://cube.crider.co.uk/visualcube.php?fmt=png&size=500&r=y45x34&fd=nnnnnnnnnnnnnrnrrrnnnnfnfffdddddddddnnnnlnlllnnnnbnbbb",
        id: "8",
    },
    {
        imageUrl:
            "http://cube.crider.co.uk/visualcube.php?fmt=png&size=500&view=plan",
        id: "9",
    },
    {
        imageUrl:
            "http://cube.crider.co.uk/visualcube.php?fmt=png&size=500&view=plan&stage=oll",
        id: "10",
    },
    {
        imageUrl:
            "http://cube.crider.co.uk/visualcube.php?fmt=png&size=500&r=y45x34&fd=nnnnnnnnnnnnnrnrrrnnnnfnfffdddddddddnnnnlnlllnnnnbnbbb",
        id: "11",
    },
    {
        imageUrl:
            "http://cube.crider.co.uk/visualcube.php?fmt=png&size=500&view=plan",
        id: "12",
    },
    {
        imageUrl:
            "http://cube.crider.co.uk/visualcube.php?fmt=png&size=500&view=plan&stage=oll",
        id: "13",
    },
    {
        imageUrl:
            "http://cube.crider.co.uk/visualcube.php?fmt=png&size=500&r=y45x34&fd=nnnnnnnnnnnnnrnrrrnnnnfnfffdddddddddnnnnlnlllnnnnbnbbb",
        id: "14",
    },
    {
        imageUrl:
            "http://cube.crider.co.uk/visualcube.php?fmt=png&size=500&view=plan",
        id: "15",
    },
    {
        imageUrl:
            "http://cube.crider.co.uk/visualcube.php?fmt=png&size=500&view=plan&stage=oll",
        id: "16",
    },
    {
        imageUrl:
            "http://cube.crider.co.uk/visualcube.php?fmt=png&size=500&view=plan&stage=oll",
        id: "17",
    },
    {
        imageUrl:
            "http://cube.crider.co.uk/visualcube.php?fmt=png&size=500&r=y45x34&fd=nnnnnnnnnnnnnrnrrrnnnnfnfffdddddddddnnnnlnlllnnnnbnbbb",
        id: "18",
    },
    {
        imageUrl:
            "http://cube.crider.co.uk/visualcube.php?fmt=png&size=500&view=plan",
        id: "19",
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
    }
  });
  

export class MainScreen extends Component {
    showEditCaseDialog() {
        alert("This needs to be a better editing dialog.");
    }

    goToCase(chosenCase: Case) {
        alert(`This should go to the case with ID: ${chosenCase.id}.`);
    }

    renderCase({ item }: { item: Case }) {
        return (
            <TouchableNativeFeedback
                onPress={() => this.goToCase.bind(this)(item)}
                onLongPress={this.showEditCaseDialog.bind(this)}
                background={Platform.OS === 'android' ? TouchableNativeFeedback.SelectableBackground() : undefined}
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
