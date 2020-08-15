import React, { FC, useEffect, useContext, useMemo } from "react";
import { Text, View, FlatList, StyleSheet, Alert, Image, BackHandler } from "react-native";
import { Case } from "../Models";
import TouchableCubeImage from "../CommonComponents/TouchableCubeImage";
import { CaseStoreContext } from "../CaseStore";
import { MenuOptions, MenuOption } from "react-native-popup-menu";
import Icon from "react-native-vector-icons/FontAwesome5";
import FAIcon from "react-native-vector-icons/FontAwesome";
import { TouchableNativeFeedback } from "react-native-gesture-handler";
import MenuIcon from "../CommonComponents/MenuIcon";
import { observer } from "mobx-react";
import { H1, P } from "../CommonComponents/TextFormattingElements";
import HelpModal from "../CommonComponents/HelpModal";
import _ from "lodash";
import { useUniqueArrayState } from "../CustomHooks";
import { useFocusEffect } from "@react-navigation/native";

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
    selectedCase: {
        backgroundColor: "#c7dafb",
    },
});

interface Props {
    navigation: any;
    route: any;
}

const MainScreen: FC<Props> = props => {
    const caseStore = useContext(CaseStoreContext);
    const [selectedCaseIds, selectedCaseFunctions] = useUniqueArrayState<number>([]);

    const isSelectMode = selectedCaseIds.length != 0;

    useEffect(
        function resetSelectedCases() {
            selectedCaseFunctions.set([]);
        },
        [JSON.stringify(caseStore.cases)],
    );

    function startTimeAttack() {
        props.navigation.navigate("TimeAttackOpening");
    }

    function openAddScreen() {
        props.navigation.navigate("Add", { caseId: -1 });
    }

    function openTestScreen(chosenCase: Case) {
        props.navigation.navigate("Test", { caseId: chosenCase.id });
    }

    function startTimeAttackForSelected() {
        // TODO: Implement
        // props.navigation.navigate("TimeAttackOpening");
    }

    function deleteSelectedCases() {
        caseStore.DeleteCases(selectedCaseIds);
    }

    function openDeleteConfirmationForSelectedCases() {
        const singular = selectedCaseIds.length == 1;

        Alert.alert(
            singular ? "Delete Case" : "Delete Cases",
            `Are you sure you want to delete ${singular ? "this case" : "these cases"}?`,
            [
                {
                    text: "Cancel",
                    style: "cancel",
                },
                { text: "Delete", onPress: deleteSelectedCases },
            ],
        );
    }

    function openEditScreen() {
        if (selectedCaseIds.length != 1) return;

        props.navigation.navigate("Add", {
            caseId: selectedCaseIds[0],
            title: "Edit",
        });

        // We opened a new screen, so detach from selection
        selectedCaseFunctions.set([]);
    }

    function toggleSelectCase({ id }: Case) {
        if (selectedCaseIds.includes(id)) selectedCaseFunctions.remove(id);
        else selectedCaseFunctions.add(id);
    }

    function onPressCase(case_: Case) {
        if (isSelectMode) toggleSelectCase(case_);
        else openTestScreen(case_);
    }

    function renderCase({ item }: { item: Case }) {
        return (
            <TouchableCubeImage
                style={selectedCaseIds.includes(item.id) ? styles.selectedCase : undefined}
                onPress={() => onPressCase(item)}
                onLongPress={() => toggleSelectCase(item)}
                algorithm={item.algorithm}
                {...item.imageOptions}
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
            { text: "Delete", onPress: () => clearCases() },
        ]);
    }

    useEffect(() => {
        if (isSelectMode) {
            props.navigation.setOptions({
                title: "Select",
                headerRight: () => (
                    <View style={styles.iconContainer}>
                        {selectedCaseIds.length == 1 && (
                            <TouchableNativeFeedback onPress={openEditScreen}>
                                <FAIcon style={styles.icon} name="pencil" size={20} />
                            </TouchableNativeFeedback>
                        )}
                        <TouchableNativeFeedback onPress={startTimeAttackForSelected}>
                            <Icon style={styles.icon} name="stopwatch" size={20} />
                        </TouchableNativeFeedback>
                        <TouchableNativeFeedback onPress={openDeleteConfirmationForSelectedCases}>
                            <Icon style={styles.icon} name="trash-alt" size={20} />
                        </TouchableNativeFeedback>
                    </View>
                ),
            });
        } else {
            props.navigation.setOptions({
                title: "AlgTeacher",
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
        }
    }, [selectedCaseIds.length]);

    useFocusEffect(
        React.useCallback(() => {
            const eventListener = BackHandler.addEventListener("hardwareBackPress", () => {
                console.log("Backed!", isSelectMode);
                if (!isSelectMode) return false;

                selectedCaseFunctions.set([]);
                return true;
            });

            return () => eventListener.remove();
        }, [isSelectMode, selectedCaseFunctions.set]),
    );

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
                    <Text style={{ color: "blue", textDecorationLine: "underline" }} onPress={openAddScreen}>
                        adding one
                    </Text>
                    {" or maybe "}
                    <Text style={{ color: "blue", textDecorationLine: "underline" }} onPress={openAlgorithmSetScreen}>
                        importing an algorithm set
                    </Text>
                    ?
                </Text>
            )}
            <HelpModal openKey={"mainScreenHelpModal"}>
                <H1>Welcome to AlgTeacher!</H1>
                <P>You can start by adding a new algorithm using the "+" button:</P>
                <Image source={require("./HelpImages/AddButton.png")} style={{ width: "100%", height: 100 }} resizeMode="contain" />
                <P>Or importing an algorithm set:</P>
                <Image
                    source={require("./HelpImages/ImportAlgorithmSet.png")}
                    style={{ width: "100%", height: 100 }}
                    resizeMode="contain"
                />
                <H1>Test</H1>
                <P>After adding some algorithms, tap on one to test yourself.</P>
                <Image source={require("./HelpImages/Algorithms.png")} style={{ width: "100%", height: 300 }} resizeMode="contain" />
                <P>It'll open the following screen:</P>
                <Image source={require("./HelpImages/TestScreen.png")} style={{ width: "100%", height: 460 }} resizeMode="contain" />
                <P>The app will automatically generate a scramble that is solved by the algorithm.</P>
                <P>If you forgot the algorithm, you can see the solution.</P>
                <H1>Time Attack</H1>
                <P>Also check out Time Attack mode:</P>
                <Image source={require("./HelpImages/TimeAttack.png")} style={{ width: "100%", height: 100 }} resizeMode="contain" />
            </HelpModal>
        </View>
    );
};

export default observer(MainScreen);
