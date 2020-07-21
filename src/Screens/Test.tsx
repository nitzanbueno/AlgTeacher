import React, {useState, useEffect, FC, useContext} from "react";
import {Text, View, StyleSheet, ViewStyle} from "react-native";
import {TouchableNativeFeedback} from "react-native-gesture-handler";
import {TOUCHABLE_BACKGROUND, Case} from "../Models";
import Icon from "react-native-vector-icons/FontAwesome";
import {GenerateScramble} from "../ScrambleLib";
import FixedSizeCubeImage from "../CommonComponents/FixedSizeCubeImage";
import {CaseStoreContext} from "../CaseStore";
import {observer} from "mobx-react";
import { CubeSvg } from "sr-visualizer";
import { CubeImage } from "../CommonComponents/CubeImage";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        // justifyContent: "center",
    },
    buttonContainer: {
        marginTop: 10,
        height: 50,
        width: 350,
        flexDirection: "row",
        justifyContent: "space-around",
    },
    buttonView: {
        width: 150,
        borderRadius: 5,
        color: "white",
        textAlign: "center",
    },
    yesButton: {
        backgroundColor: "chartreuse",
    },
    noButton: {
        backgroundColor: "orangered",
    },
    okButton: {
        backgroundColor: "dodgerblue",
    },
    buttonText: {
        height: "100%",
        textAlignVertical: "center",
        textAlign: "center",
        color: "white",
    },
    categoryText: {
        marginTop: 30,
        fontSize: 30,
    },
    descriptionText: {
        marginTop: 30,
        fontSize: 20,
    },
    scrambleText: {
        fontSize: 15,
        textAlign: "center",
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

const caseImageSize = {
    width: 300,
    height: 300,
};

const Button: FC<{style: ViewStyle, onPress: () => void}> = props => {
    return (
        <TouchableNativeFeedback onPress={props.onPress} background={TOUCHABLE_BACKGROUND}>
            <View style={[styles.buttonView, props.style]}>
                <Text style={styles.buttonText}>{props.children}</Text>
            </View>
        </TouchableNativeFeedback>
    );
};

interface Props {
    route: {params: {caseId: number}};
    navigation: any;
}

const TestScreen: FC<Props> = props => {
    const [shouldDisplaySolution, setShouldDisplaySolution] = useState(false);
    const [scramble, setScramble] = useState("");

    const caseStore = useContext(CaseStoreContext);

    const {caseId} = props.route.params;
    const propCase = caseStore.GetCaseById(caseId);
    const {category, description, imageUrl, algorithm} = propCase || {};

    function onClickYes() {
        props.navigation.navigate("Main");
    }

    function onClickNo() {
        setShouldDisplaySolution(true);
    }

    function openEditScreen() {
        props.navigation.navigate("Add", {
            caseId,
            title: "Edit",
        });
    }

    useEffect(() => {
        props.navigation.setOptions({
            headerRight: () => (
                <View style={styles.iconContainer}>
                    <TouchableNativeFeedback onPress={openEditScreen}>
                        <Icon style={styles.icon} name="pencil" size={20} />
                    </TouchableNativeFeedback>
                </View>
            ),
        });

        if (algorithm) {
            GenerateScramble(algorithm, (success, newScramble) => {
                if (success) {
                    setScramble(newScramble);
                } else {
                    setScramble("Error");
                }
            });
        }
    }, [algorithm]);

    const onClickOk = onClickYes;

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
            {/* In case category/description are empty, we can't output the strings (React Native doesn't like it), so we put !! */}
            {!!category && <Text style={styles.categoryText}>{category}</Text>}
            {!!description && <Text style={styles.descriptionText}>Description: {description}</Text>}
            <CubeImage {...caseImageSize} case={algorithm || ""} />
            {shouldDisplaySolution ? (
                <>
                    <Text style={styles.scrambleText}>Solution:</Text>
                    <Text style={styles.scrambleText}>{algorithm}</Text>
                </>
            ) : (
                <>
                    <Text style={styles.scrambleText}>Scramble:</Text>
                    <Text style={styles.scrambleText}>{scramble || "Loading..."}</Text>
                    <Text style={styles.scrambleText}>Do you remember the solution to this case?</Text>
                </>
            )}
            <View style={styles.buttonContainer}>
                {!shouldDisplaySolution ? (
                    <>
                        <Button style={styles.yesButton} onPress={onClickYes} children="Yes" />
                        <Button style={styles.noButton} onPress={onClickNo} children="No" />
                    </>
                ) : (
                    <Button style={styles.okButton} onPress={onClickOk} children="Got it!" />
                )}
            </View>
        </View>
    );
};

export default observer(TestScreen);
