import React from "react";
import { Component } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import { TouchableNativeFeedback } from "react-native-gesture-handler";
import { TOUCHABLE_BACKGROUND, Case } from "./Models";
import ScrambleLib from "react-native-scramble-lib";
import { GetAllCases, GetAllCategories } from "./CaseStorage";
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
});

export class TimeAttackOpeningScreen extends Component<
    {
        route: { params: { case: Case } };
        navigation: any;
    },
    {
        allCategories: string[];
    }
> {
    constructor(props: any) {
        super(props);
        this.state = {
            allCategories: ["Loading..."],
        };
    }

    componentDidMount() {
        GetAllCategories().then((categories) => {
            this.setState({ allCategories: categories });
        });
    }

    confirmCategorySelection = (options: CheckboxPickerOptionArray) => {
        let chosenCategories = options
            .filter((option) => option.value)
            .map((option) => option.name);

        this.props.navigation.replace("TimeAttackPlay", {
            categories: chosenCategories
        });
    };

    render() {
        return (
            <View style={styles.container}>
                <Text>Choose categories:</Text>
                <CheckboxPicker
                    options={this.state.allCategories}
                    onSubmit={this.confirmCategorySelection}
                />
            </View>
        );
    }
}
