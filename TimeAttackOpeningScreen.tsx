import React from "react";
import { Component } from "react";
import { Text, StyleSheet, ScrollView } from "react-native";
import { Case } from "./Models";
import { GetAllCategories } from "./CaseStorage";
import { CheckboxPicker, CheckboxPickerOptionArray } from "./CheckboxPicker";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        textAlign: "center",
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 20,
    },
    header: {
        fontSize: 20
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
            <ScrollView style={styles.container}>
                <Text style={styles.header}>Choose categories:</Text>
                <CheckboxPicker
                    options={this.state.allCategories}
                    onSubmit={this.confirmCategorySelection}
                />
            </ScrollView>
        );
    }
}
