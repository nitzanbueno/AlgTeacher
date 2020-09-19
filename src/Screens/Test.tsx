import React, { useState, useEffect, FC, useContext } from "react";
import { Text, View, StyleSheet } from "react-native";
import { GenerateScrambleAsync } from "../ScrambleLib";
import { CaseStoreContext } from "../CaseStore";
import { observer } from "mobx-react";
import { CubeImage } from "../CommonComponents/CubeImage";
import { RootStackParamList } from "../RootStackParamList";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Appbar, Button, Caption, Title } from "react-native-paper";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        // justifyContent: "center",
    },
    textContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
    },
    algorithmSetText: {
        marginTop: 30,
        fontSize: 30,
    },
    descriptionText: {
        marginTop: 30,
        fontSize: 20,
    },
    scrambleText: {
        fontSize: 20,
        textAlign: "center",
        width: "90%",
    },
    caseImageContainer: {
        margin: 10,
    },
    solutionContainer: {
        marginTop: 10,
    },
});

const caseImageSize = {
    width: 250,
    height: 250,
};

interface Props {
    route: RouteProp<RootStackParamList, "Test">;
    navigation: StackNavigationProp<RootStackParamList, "Test">;
}

const TestScreen: FC<Props> = props => {
    const [shouldDisplaySolution, setShouldDisplaySolution] = useState(false);
    const [scramble, setScramble] = useState("");

    const caseStore = useContext(CaseStoreContext);

    const { caseId } = props.route.params;
    const propCase = caseStore.GetCaseById(caseId);
    const { algorithmSet, description, imageOptions, algorithm } = propCase || {};

    function showSolution() {
        setShouldDisplaySolution(true);
    }

    function openEditScreen() {
        props.navigation.navigate("Add", {
            caseId,
            title: "Edit",
        });
    }

    function startTimeAttack() {
        if (propCase) props.navigation.navigate("TimeAttackOpening", { cases: [propCase] });
    }

    useEffect(() => {
        props.navigation.setOptions({
            headerRight: () => [
                <Appbar.Action key="time" onPress={startTimeAttack} icon="timer" />,
                <Appbar.Action key="edit" icon="pencil" onPress={openEditScreen} />,
            ],
        });
    }, []);

    useEffect(() => {
        if (algorithm !== undefined) {
            GenerateScrambleAsync(algorithm)
                .then(newScramble => setScramble(newScramble))
                .catch(() => setScramble("Error"));
        }
    }, [algorithm]);

    if (propCase === undefined) {
        return (
            <View style={styles.container}>
                <Text>
                    An error has occured - the chosen case seems to not exist. {"\n"}
                    Please report this issue to the developers.
                </Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {/* In case algorithm set/description are empty, we can't output the strings (React Native doesn't like it), so we put !! */}
            {!!algorithmSet && <Title style={styles.algorithmSetText}>{algorithmSet}</Title>}
            {!!description && <Caption style={styles.descriptionText}>{description}</Caption>}
            <View style={styles.caseImageContainer}>
                <CubeImage {...caseImageSize} case={algorithm || ""} {...imageOptions} />
            </View>

            <Title children={"Scramble:"} />
            <Caption style={styles.scrambleText}>{scramble === undefined ? "Loading..." : scramble}</Caption>

            <View style={styles.solutionContainer}>
                {shouldDisplaySolution ? (
                    <View style={styles.textContainer}>
                        <Title children={"Solution:"} />
                        <Caption style={styles.scrambleText} children={algorithm} />
                    </View>
                ) : (
                    <Button mode="contained" onPress={showSolution} children="Show Solution" />
                )}
            </View>
        </View>
    );
};

export default observer(TestScreen);
