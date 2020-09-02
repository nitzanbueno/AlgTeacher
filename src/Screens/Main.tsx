import React, { FC, useEffect, useContext } from "react";
import { Text, View, FlatList, StyleSheet, Alert, Image, BackHandler } from "react-native";
import { Case, TOUCHABLE_BACKGROUND } from "../Models";
import TouchableCubeImage from "../CommonComponents/TouchableCubeImage";
import { CaseStoreContext } from "../CaseStore";
import Icon from "react-native-vector-icons/FontAwesome5";
import FAIcon from "react-native-vector-icons/FontAwesome";
import { TouchableNativeFeedback, TouchableOpacity } from "react-native-gesture-handler";
import { observer } from "mobx-react";
import { H1, P } from "../CommonComponents/TextFormattingElements";
import HelpDialog from "../CommonComponents/HelpDialog";
import _ from "lodash";
import { useUniqueArrayState } from "../CustomHooks";
import { useFocusEffect, RouteProp, CompositeNavigationProp, useTheme } from "@react-navigation/native";
import { SettingStoreContext } from "../Stores/SettingStore";
import { RootStackParamList } from "../RootStackParamList";
import { StackNavigationProp, StackHeaderProps } from "@react-navigation/stack";
import {
    createDrawerNavigator,
    DrawerNavigationProp,
    DrawerContentScrollView,
    DrawerContentComponentProps,
} from "@react-navigation/drawer";
import { Switch, Drawer, ActivityIndicator, Appbar } from "react-native-paper";

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
    leftIcon: {
        width: 30,
        textAlign: "center",
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
    preference: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
});

interface Props {
    navigation: CompositeNavigationProp<StackNavigationProp<RootStackParamList, "Main">, DrawerNavigationProp<RootStackParamList, "Main">>;
    route: RouteProp<RootStackParamList, "Main">;
}

const MainScreen: FC<Props> = observer(props => {
    const caseStore = useContext(CaseStoreContext);
    const settingStore = useContext(SettingStoreContext);
    const [selectedCaseIds, selectedCaseFunctions] = useUniqueArrayState<number>([]);

    const isSelectMode = selectedCaseIds.length != 0;

    function clearSelection() {
        // Smart-reset the selected IDs:
        // if the selected IDs are already empty, skip a rerender of the component
        selectedCaseFunctions.set(prevArr => (prevArr.length == 0 ? prevArr : []));
    }

    useEffect(clearSelection, [JSON.stringify(caseStore.cases)]);

    useEffect(() => props.navigation.addListener("blur", clearSelection), []);

    function startTimeAttack() {
        props.navigation.navigate("TimeAttackOpening", { cases: caseStore.GetCasesByIds(selectedCaseIds) });
    }

    function openAddScreen() {
        props.navigation.navigate("Add", { caseId: -1 });
    }

    function openTestScreen(chosenCase: Case) {
        props.navigation.navigate("Test", { caseId: chosenCase.id });
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
        props.navigation.navigate("ImportAlgorithmSet");
    }

    useEffect(
        function setHeader() {
            if (isSelectMode) {
                props.navigation.dangerouslyGetParent()?.setOptions({
                    title: "Select",
                    headerLeft: () => <Appbar.Action onPress={clearSelection} icon="arrow-left" />,
                    headerRight: () => [
                        // For some reason, if I use a fragment, the icons turn out black.
                        // So I use an array.
                        selectedCaseIds.length == 1 && <Appbar.Action key="edit" onPress={openEditScreen} icon="pencil" />,
                        selectedCaseIds.length == caseStore.cases.length ? (
                            <Appbar.Action key="select-all" onPress={clearSelection} icon="checkbox-marked" />
                        ) : (
                            <Appbar.Action
                                key="select-none"
                                onPress={() => selectedCaseFunctions.set(caseStore.cases.map(c => c.id))}
                                icon="checkbox-blank"
                            />
                        ),
                        <Appbar.Action key="time" onPress={startTimeAttack} icon="timer" />,
                        <Appbar.Action key="delete" onPress={openDeleteConfirmationForSelectedCases} icon="delete" />,
                    ],
                });
            } else {
                props.navigation.dangerouslyGetParent()?.setOptions({
                    title: "AlgTeacher",
                    headerLeft: () => (
                        <Appbar.Action
                            onPress={() => {
                                props.navigation.toggleDrawer();
                            }}
                            icon="menu"
                        />
                    ),
                    headerRight: () => [
                        // For some reason, if I use a fragment, the icons turn out black.
                        // So I use an array.
                        <Appbar.Action onPress={startTimeAttack} icon="timer" key="time" />,
                        <Appbar.Action onPress={openAddScreen} icon="plus" key="add" />,
                    ],
                });
            }
        },
        [selectedCaseIds.length, settingStore.shouldDisplayLabels],
    );

    useFocusEffect(
        React.useCallback(() => {
            const eventListener = BackHandler.addEventListener("hardwareBackPress", () => {
                if (!isSelectMode) return false;

                clearSelection();
                return true;
            });

            return () => eventListener.remove();
        }, [isSelectMode, clearSelection]),
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
                <ActivityIndicator size="large" />
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
            <HelpDialog title="Welcome to AlgTeacher!" openKey={"mainScreenHelpModal"}>
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
            </HelpDialog>
        </View>
    );
});

const DrawerNavigator = createDrawerNavigator();

// This is not the best way to implement this component!
// It can't interact with the state of MainScreen in any way.
// However, right now I don't need to, so I'm ignoring this problem for now.
const MainScreenDrawerContent: FC<DrawerContentComponentProps> = observer(props => {
    const settingStore = useContext(SettingStoreContext);

    function toggleShouldDisplayLabels() {
        settingStore.shouldDisplayLabels = !settingStore.shouldDisplayLabels;
    }

    return (
        <DrawerContentScrollView {...props}>
            <Drawer.Item
                label="Import Algorithm Set"
                onPress={() => props.navigation.dangerouslyGetParent()?.navigate("ImportAlgorithmSet")}
            />
            <Drawer.Section>
                <TouchableNativeFeedback background={TOUCHABLE_BACKGROUND} onPress={toggleShouldDisplayLabels}>
                    <View style={styles.preference}>
                        <Text>Display Labels</Text>
                        <Switch value={settingStore.shouldDisplayLabels} />
                    </View>
                </TouchableNativeFeedback>
            </Drawer.Section>
        </DrawerContentScrollView>
    );
});

const MainScreenWithDrawer: FC = () => (
    <DrawerNavigator.Navigator drawerContent={props => <MainScreenDrawerContent {...props} />}>
        <DrawerNavigator.Screen component={MainScreen} name="Main" />
    </DrawerNavigator.Navigator>
);

export default MainScreenWithDrawer;
