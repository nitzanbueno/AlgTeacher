import React, {FC, useState, useEffect} from "react";
import {Text, View, FlatList, StyleSheet, Alert} from "react-native";
import {Case} from "../Models";
import TouchableImage from "../CommonComponents/TouchableImage";
import CaseStorage from "../CaseStorage";
import {MenuTrigger, Menu, MenuOptions, MenuOption, withMenuContext, MenuContext} from "react-native-popup-menu";
import Icon from "react-native-vector-icons/FontAwesome5";
import {TouchableNativeFeedback} from "react-native-gesture-handler";
import MenuIcon from "../CommonComponents/MenuIcon";

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

interface CaseImageProps {
    case: Case;
    onPress: () => void;
    onEdit: () => void;
    onDelete: () => void;
}

/**
 * This component uses the react-native-popup-menu library to wrap a TouchableImage component with a context menu.
 */
const CaseImage: FC<CaseImageProps> = withMenuContext((props: CaseImageProps & {ctx: MenuContext}) => {
    return (
        <Menu name={"case_" + props.case.id}>
            <MenuTrigger>
                <TouchableImage
                    onPress={props.onPress}
                    onLongPress={() => props.ctx.menuActions.openMenu("case_" + props.case.id)}
                    imageUrl={props.case.imageUrl}
                />
            </MenuTrigger>
            <MenuOptions>
                <MenuOption onSelect={props.onEdit} text="Edit" />
                <MenuOption onSelect={props.onDelete}>
                    <Text style={{color: "red"}}>Delete</Text>
                </MenuOption>
            </MenuOptions>
        </Menu>
    );
});

interface Props {
    navigation: any;
    route: any;
}

const MainScreen: FC<Props> = props => {
    const [cases, setCases] = useState<Case[]>([]);

    function startTimeAttack() {
        props.navigation.navigate("TimeAttackOpening");
    }

    function deleteCase(chosenCase: Case) {
        CaseStorage.DeleteCase(chosenCase.id).then(resetCases);
    }

    function openDeleteConfirmation(chosenCase: Case) {
        Alert.alert("Delete Case", "Are you sure you want to delete this case?", [
            {
                text: "Cancel",
                style: "cancel",
            },
            {text: "Delete", onPress: () => deleteCase(chosenCase)},
        ]);
    }

    function resetCases() {
        CaseStorage.GetAllCases().then(newCases => {
            setCases(newCases);
        });
    }

    function openAddScreen() {
        props.navigation.navigate("Add", {caseId: -1, callerScreen: "Main"});
    }

    function openEditScreen(chosenCase: Case) {
        props.navigation.setOptions({
            addCallback: resetCases,
        });

        props.navigation.navigate("Add", {
            caseId: chosenCase.id,
            algorithm: chosenCase.algorithm,
            description: chosenCase.description,
            imageUrl: chosenCase.imageUrl,
            category: chosenCase.category,
            title: "Edit",
            callerScreen: "Main",
        });
    }

    function openTestScreen(chosenCase: Case) {
        props.navigation.navigate("Test", {case: chosenCase});
    }

    function renderCase({item}: {item: Case}) {
        return (
            <CaseImage
                onPress={() => openTestScreen(item)}
                case={item}
                onEdit={() => openEditScreen(item)}
                onDelete={() => openDeleteConfirmation(item)}
            />
        );
    }

    function openAlgorithmSetScreen() {
        props.navigation.navigate("ImportAlgorithmSet");
    }

    function clearCases() {
        CaseStorage.ClearAllCases().then(resetCases);
    }

    function openClearConfirmation() {
        Alert.alert("Clear All Cases", "Are you sure you want to delete ALL cases?", [
            {
                text: "Cancel",
                style: "cancel",
            },
            {text: "Delete", onPress: () => clearCases()},
        ]);
    }

    useEffect(resetCases, [props?.route?.params?.case]);

    useEffect(() => {
        props.navigation.setOptions({
            headerRight: () => (
                <View style={styles.iconContainer}>
                    <TouchableNativeFeedback onPress={startTimeAttack}>
                        <Icon style={styles.icon} name="stopwatch" size={20} />
                    </TouchableNativeFeedback>
                    <TouchableNativeFeedback onPress={openAddScreen}>
                        <Icon style={styles.icon} name="plus" size={20} />
                    </TouchableNativeFeedback>
                    <MenuIcon>
                        <MenuOptions>
                            <MenuOption onSelect={openAlgorithmSetScreen} text="Import algorithm set..." />
                            <MenuOption onSelect={openClearConfirmation} text="Delete all cases..." />
                        </MenuOptions>
                    </MenuIcon>
                </View>
            ),
        });
    }, []);

    return (
        <View style={styles.container}>
            <FlatList data={cases} renderItem={renderCase} keyExtractor={item => item.id.toString()} numColumns={CASE_COLUMNS} />
        </View>
    );
};

export default MainScreen;
