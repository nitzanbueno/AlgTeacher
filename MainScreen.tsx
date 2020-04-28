import React from "react";
import { Component } from "react";
import {
    Text,
    View,
    FlatList,
    TouchableNativeFeedback,
    StyleSheet,
} from "react-native";
import { Case } from "./Models";
import { TouchableImage } from "./TouchableImage";
import { GetAllCases } from "./CaseStorage";
    MenuTrigger,
    Menu,
    MenuOptions,
    MenuOption,
    withMenuContext
} from "react-native-popup-menu";

const CASE_COLUMNS = 2;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    addButton: {
        position: "absolute",
        bottom: 50,
        left: 50,
        width: 50,
        height: 50,
        fontSize: 5,
        borderRadius: 25,
        backgroundColor: "blue",
        alignItems: "center",
        justifyContent: "center",
    },
});

/**
 * This component uses the react-native-popup-menu library to wrap a TouchableImage component with a context menu.
 */
class CaseImage extends Component<{
    case: Case;
    onPress: () => void;
    ctx: any;
}> {
    render() {
        return (
            <Menu name={"case_" + this.props.case.id}>
                <MenuTrigger>
                    <TouchableImage
                        onPress={this.props.onPress}
                        onLongPress={() =>
                            this.props.ctx.menuActions.openMenu(
                                "case_" + this.props.case.id
                            )
                        }
                        imageUrl={this.props.case.imageUrl}
                    />
                </MenuTrigger>
                <MenuOptions>
                    <MenuOption disabled={true} text="Edit" />
                    <MenuOption onSelect={() => alert("To Be Implemented")}>
                        <Text style={{ color: "red" }}>Delete</Text>
                    </MenuOption>
                </MenuOptions>
            </Menu>
        );
    }
}

const ContextCaseImage = withMenuContext(CaseImage);

export class MainScreen extends Component<
    { navigation: any },
    { cases: Case[] }
> {
    constructor(props: any) {
        super(props);
        this.state = {cases: []};
    } 

    addCase = () => {
        this.props.navigation.setOptions({caseAddCallback: () => {
            this.props.navigation.goBack();
            this.resetCases();
        }});
        this.props.navigation.navigate("Add");
    }

    goToCase(chosenCase: Case) {
        this.props.navigation.navigate("Test", { case: chosenCase });
    }

    renderCase({ item }: { item: Case }) {
        return (
            <ContextCaseImage onPress={() => this.goToCase(item)} case={item} />
        );
    }

    resetCases = () => {
        GetAllCases().then((cases) => {
            this.setState({cases: cases});
        })
    }

    componentDidMount() {
        this.resetCases();
    }

    componentDidUpdate() {
        this.resetCases();
    }

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.state.cases}
                    renderItem={this.renderCase.bind(this)}
                    keyExtractor={(item) => item.id.toString()}
                    numColumns={CASE_COLUMNS}
                />
                <TouchableNativeFeedback onPress={this.addCase}>
                    <View style={styles.addButton}>
                        <Text style={{color: "white"}}>+</Text>
                    </View>
                </TouchableNativeFeedback>
            </View>
        );
    }
}
