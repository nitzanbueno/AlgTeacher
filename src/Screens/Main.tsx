import React, { FC, useEffect, useContext, useMemo, useState } from "react";
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
import { useFocusEffect, RouteProp } from "@react-navigation/native";
import { SettingStoreContext } from "../Stores/SettingStore";
import { RootStackParamList } from "../RootStackParamList";
import { StackNavigationProp } from "@react-navigation/stack";

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
        width: 18,
        textAlignVertical: "center",
    },
    selectIcon: {
        marginTop: 4,
    },
    helpText: {
        fontSize: 20,
        textAlign: "center",
    },
    selectedCase: {
        backgroundColor: "#c7dafb",
    },
    caseContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    caseLabel: {
        marginTop: -10,
    },
});

interface Props {
    navigation: StackNavigationProp<RootStackParamList, "Main">;
    route: RouteProp<RootStackParamList, "Main">;
}

const MainScreen: FC<Props> = props => {
    const caseStore = useContext(CaseStoreContext);
    const settingStore = useContext(SettingStoreContext);
    const [selectedCaseIds, selectedCaseFunctions] = useUniqueArrayState<number>([]);

    const isSelectMode = selectedCaseIds.length != 0;

    useEffect(
        function resetSelectedCases() {
            selectedCaseFunctions.set([]);
        },
        [JSON.stringify(caseStore.cases)],
    );

    // Scary type definitions!
    // Basically if the screen I navigate to doesn't take parameters, I don't have to pass the "params" argument.
    function navigate<Name extends keyof RootStackParamList>(name: RootStackParamList[Name] extends undefined ? Name : never): void;
    function navigate<Name extends keyof RootStackParamList>(
        name: RootStackParamList[Name] extends undefined ? never : Name,
        params: RootStackParamList[Name],
    ): void;
    function navigate<Name extends keyof RootStackParamList>(name: Name, params?: any): void {
        props.navigation.navigate<Name>({ name, params });

        // We opened a new screen, so detach from selection
        selectedCaseFunctions.set([]);
    }

    function startTimeAttack() {
        navigate("TimeAttackOpening", { cases: caseStore.GetCasesByIds(selectedCaseIds) });
    }

    function openAddScreen() {
        navigate("Add", { caseId: -1 });
    }

    function openTestScreen(chosenCase: Case) {
        navigate("Test", { caseId: chosenCase.id });
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

        navigate("Add", {
            caseId: selectedCaseIds[0],
            title: "Edit",
        });
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
                onPress={() => onPressCase(item)}
                style={[styles.caseContainer, selectedCaseIds.includes(item.id) ? styles.selectedCase : undefined]}
                onLongPress={() => toggleSelectCase(item)}
                algorithm={item.algorithm}
                {...item.imageOptions}
            >
                {settingStore.shouldDisplayLabels && <Text style={styles.caseLabel}>{item.description}</Text>}
            </TouchableCubeImage>
        );
    }

    function openAlgorithmSetScreen() {
        navigate("ImportAlgorithmSet");
    }

    function toggleShouldDisplayLabels() {
        settingStore.shouldDisplayLabels = !settingStore.shouldDisplayLabels;
    }

    useEffect(function setHeader() {
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
                        {selectedCaseIds.length == caseStore.cases.length ? (
                            <TouchableNativeFeedback onPress={() => selectedCaseFunctions.set([])}>
                                <FAIcon style={[styles.icon, styles.selectIcon]} name="check-square-o" size={20} />
                            </TouchableNativeFeedback>
                        ) : (
                            <TouchableNativeFeedback onPress={() => selectedCaseFunctions.set(caseStore.cases.map(c => c.id))}>
                                <FAIcon style={[styles.icon, styles.selectIcon]} name="square-o" size={20} />
                            </TouchableNativeFeedback>
                        )}
                        <TouchableNativeFeedback onPress={startTimeAttack}>
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
                                <MenuOption
                                    onSelect={toggleShouldDisplayLabels}
                                    text={settingStore.shouldDisplayLabels ? "Hide labels" : "Show labels"}
                                />
                            </MenuOptions>
                        </MenuIcon>
                    </View>
                ),
            });
        }
    }, [selectedCaseIds.length, settingStore.shouldDisplayLabels]);

    useFocusEffect(
        React.useCallback(() => {
            const eventListener = BackHandler.addEventListener("hardwareBackPress", () => {
                if (!isSelectMode) return false;

                selectedCaseFunctions.set([]);
                return true;
            });

            return () => eventListener.remove();
        }, [isSelectMode, selectedCaseFunctions.set]),
    );

    const isLoading = !caseStore.isLoaded || !settingStore.isLoaded;

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
            ) : isLoading ? (
                <Text style={styles.helpText}>Loading...</Text>
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
                <P>The following screen will open.</P>
                <Image source={require("./HelpImages/TestScreen.png")} style={{ width: "100%", height: 460 }} resizeMode="contain" />
                <P>The app will automatically generate a scramble that is solved by the algorithm.</P>
                <P>If you forgot the algorithm, you can see the solution.</P>
                <H1>Time Attack</H1>
                <P>Also check out Time Attack mode.</P>
                <Image source={require("./HelpImages/TimeAttack.png")} style={{ width: "100%", height: 100 }} resizeMode="contain" />
                <H1>Selection</H1>
                <P>You can select cases to edit/delete them, or open a Time Attack with the chosen cases.</P>
                <Image source={require("./HelpImages/Select.png")} style={{ width: "100%", height: 300 }} resizeMode="contain" />
            </HelpModal>
        </View>
    );
};

export default observer(MainScreen);
