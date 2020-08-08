import React, {FC, useEffect, useContext} from "react";
import {Text, View, FlatList, StyleSheet, Alert, Image} from "react-native";
import {Case} from "../Models";
import TouchableCubeImage from "../CommonComponents/TouchableCubeImage";
import {CaseStoreContext} from "../CaseStore";
import {MenuTrigger, Menu, MenuOptions, MenuOption, withMenuContext, MenuContext} from "react-native-popup-menu";
import Icon from "react-native-vector-icons/FontAwesome5";
import {TouchableNativeFeedback} from "react-native-gesture-handler";
import MenuIcon from "../CommonComponents/MenuIcon";
import {observer} from "mobx-react";
import AsyncStorage from "@react-native-community/async-storage";
import {H1, P} from "../CommonComponents/TextFormattingElements";
import HelpModal from "../CommonComponents/HelpModal";

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
    helpText: {
        fontSize: 20,
        textAlign: "center",
    },
});

type CaseImagePropsWithContext = {
    case: Case;
    onPress: () => void;
    onEdit: () => void;
    onDelete: () => void;
    ctx: MenuContext;
};

/**
 * This component uses the react-native-popup-menu library to wrap a TouchableImage component with a context menu.
 */
const CaseImage = withMenuContext<CaseImagePropsWithContext>(props => {
    return (
        <Menu name={"case_" + props.case.id}>
            <TouchableCubeImage
                onPress={props.onPress}
                onLongPress={() => props.ctx.menuActions.openMenu("case_" + props.case.id)}
                algorithm={props.case.algorithm}
                {...props.case.imageOptions}
            />
            <MenuTrigger />
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
    const caseStore = useContext(CaseStoreContext);

    function startTimeAttack() {
        props.navigation.navigate("TimeAttackOpening");
    }

    function deleteCase(chosenCase: Case) {
        caseStore.DeleteCase(chosenCase.id);
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

    function openAddScreen() {
        props.navigation.navigate("Add", {caseId: -1});
    }

    function openEditScreen(chosenCase: Case) {
        props.navigation.navigate("Add", {
            caseId: chosenCase.id,
            title: "Edit",
        });
    }

    function openTestScreen(chosenCase: Case) {
        props.navigation.navigate("Test", {caseId: chosenCase.id});
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
        caseStore.ClearAllCases();
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
            {caseStore.cases.length > 0 ? (
                /* Using slice() on cases because mobx observable arrays aren't actual arrays */
                <FlatList
                    data={caseStore.cases.slice()}
                    renderItem={renderCase}
                    keyExtractor={item => item.id.toString()}
                    numColumns={CASE_COLUMNS}
                />
            ) : (
                <Text style={styles.helpText}>
                    {"You don't have any cases.\nHow about "}
                    <Text style={{color: "blue", textDecorationLine: "underline"}} onPress={openAddScreen}>
                        adding one
                    </Text>
                    {" or maybe "}
                    <Text style={{color: "blue", textDecorationLine: "underline"}} onPress={openAlgorithmSetScreen}>
                        importing an algorithm set
                    </Text>
                    ?
                </Text>
            )}
            <HelpModal openKey={"mainScreenHelpModal"}>
                <H1>Welcome to AlgTeacher!</H1>
                <P>You can start by adding a new algorithm using the "+" button:</P>
                <Image source={require("./HelpImages/AddButton.png")} style={{width: "100%", height: 100}} resizeMode="contain" />
                <P>Or importing an algorithm set:</P>
                <Image source={require("./HelpImages/ImportAlgorithmSet.png")} style={{width: "100%", height: 100}} resizeMode="contain" />
                <H1>Test</H1>
                <P>After adding some algorithms, tap on one to test yourself.</P>
                <Image source={require("./HelpImages/Algorithms.png")} style={{width: "100%", height: 300}} resizeMode="contain" />
                <P>It'll open the following screen:</P>
                <Image source={require("./HelpImages/TestScreen.png")} style={{width: "100%", height: 460}} resizeMode="contain" />
                <P>The app will automatically generate a scramble that is solved by the algorithm.</P>
                <P>If you forgot the algorithm, you can see the solution.</P>
                <H1>Time Attack</H1>
                <P>Also check out Time Attack mode:</P>
                <Image source={require("./HelpImages/TimeAttack.png")} style={{width: "100%", height: 100}} resizeMode="contain" />
            </HelpModal>
        </View>
    );
};

export default observer(MainScreen);
