import React from "react";
import { Component } from "react";
import { Text, View, FlatList, StyleSheet, Alert } from "react-native";
import { Case } from "../Models";
import { TouchableImage } from "../CommonComponents/TouchableImage";
import { GetAllCases, DeleteCase, ClearAllCases } from "../CaseStorage";
import {
    MenuTrigger,
    Menu,
    MenuOptions,
    MenuOption,
    withMenuContext,
} from "react-native-popup-menu";
import Icon from "react-native-vector-icons/FontAwesome5";
import { TouchableNativeFeedback } from "react-native-gesture-handler";
import { MenuIcon } from "../CommonComponents/MenuIcon";

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
    iconContainer: {
        flexDirection: "row",
        height: "100%",
        alignItems: "center",
        marginRight: 5,
    },
    icon: {
        marginRight: 10,
        marginLeft: 10,
        height: "100%",
        textAlignVertical: "center",
    },
});

/**
 * This component uses the react-native-popup-menu library to wrap a TouchableImage component with a context menu.
 */
class CaseImage extends Component<{
    case: Case;
    onPress: () => void;
    onEdit: () => void;
    onDelete: () => void;
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
                    <MenuOption onSelect={this.props.onEdit} text="Edit" />
                    <MenuOption onSelect={this.props.onDelete}>
                        <Text style={{ color: "red" }}>Delete</Text>
                    </MenuOption>
                </MenuOptions>
            </Menu>
        );
    }
}

const ContextCaseImage = withMenuContext(CaseImage);

export class MainScreen extends Component<
    { navigation: any, route: any },
    { cases: Case[] }
> {
    constructor(props: any) {
        super(props);
        this.state = { cases: [] };
    }

    openAddScreen = () => {
        this.props.navigation.navigate("Add", { caseId: -1, callerScreen: "Main" });
    };

    openEditScreen = (chosenCase: Case) => {
        this.props.navigation.setOptions({
            addCallback: this.resetCases
        });

        this.props.navigation.navigate("Add", {
            caseId: chosenCase.id,
            algorithm: chosenCase.algorithm,
            description: chosenCase.description,
            imageUrl: chosenCase.imageUrl,
            category: chosenCase.category,
            title: "Edit",
            callerScreen: "Main"
        });
    };

    openTestScreen = (chosenCase: Case) => {
        this.props.navigation.navigate("Test", { case: chosenCase });
    };

    deleteCase = (chosenCase: Case) => {
        DeleteCase(chosenCase.id).then(this.resetCases);
    };

    clearCases = () => {
        ClearAllCases().then(this.resetCases);
    }

    openDeleteConfirmation = (chosenCase: Case) => {
        Alert.alert(
            "Delete Case",
            "Are you sure you want to delete this case?",
            [
                {
                    text: "Cancel",
                    style: "cancel",
                },
                { text: "Delete", onPress: () => this.deleteCase(chosenCase) },
            ]
        );
    };

    openClearConfirmation = () => {
        Alert.alert(
            "Clear All Cases",
            "Are you sure you want to delete ALL cases?",
            [
                {
                    text: "Cancel",
                    style: "cancel",
                },
                { text: "Delete", onPress: () => this.clearCases() },
            ]
        );
    };

    startTimeAttack = () => {
        this.props.navigation.navigate("TimeAttackOpening");
    }

    renderCase = ({ item }: { item: Case }) => {
        return (
            <ContextCaseImage
                onPress={() => this.openTestScreen(item)}
                case={item}
                onEdit={() => this.openEditScreen(item)}
                onDelete={() => this.openDeleteConfirmation(item)}
            />
        );
    };

    resetCases = () => {
        GetAllCases().then((cases) => {
            this.setState({ cases: cases });
        });
    };

    openAlgorithmSetScreen = () => {
        this.props.navigation.navigate("ImportAlgorithmSet")
    }

    componentDidMount() {
        this.resetCases();
        this.props.navigation.setOptions({
            headerRight: () => (
                <View style={styles.iconContainer}>
                    <TouchableNativeFeedback onPress={this.startTimeAttack}>
                        <Icon style={styles.icon} name="stopwatch" size={20} />
                    </TouchableNativeFeedback>
                    <TouchableNativeFeedback onPress={this.openAddScreen}>
                        <Icon style={styles.icon} name="plus" size={20} />
                    </TouchableNativeFeedback>
                    <MenuIcon>
                        <MenuOptions>
                        <MenuOption onSelect={this.openAlgorithmSetScreen} text="Import algorithm set..." />
                        <MenuOption onSelect={this.openClearConfirmation} text="Delete all cases..." />
                        </MenuOptions>
                    </MenuIcon>
                </View>
            ),
        });
    }

    componentDidUpdate(prevProps: any) {
        if (prevProps?.route?.params?.case !== this.props?.route?.params?.case) {
            this.resetCases();
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.state.cases}
                    renderItem={this.renderCase}
                    keyExtractor={(item) => item.id.toString()}
                    numColumns={CASE_COLUMNS}
                />
            </View>
        );
    }
}
