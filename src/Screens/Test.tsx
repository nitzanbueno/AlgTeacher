import React, {useState, useEffect, FC} from "react";
import {Text, View, StyleSheet, ViewStyle} from "react-native";
import {TouchableNativeFeedback} from "react-native-gesture-handler";
import {TOUCHABLE_BACKGROUND, Case} from "../Models";
import Icon from "react-native-vector-icons/FontAwesome";
import {GenerateScramble} from "../ScrambleLib";
import FixedSizeSvgUri from "../CommonComponents/FixedSizeSvgUri";

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
    route: {params: {case: Case}};
    navigation: any;
}

const TestScreen: FC<Props> = props => {
    const [shouldDisplaySolution, setShouldDisplaySolution] = useState(false);
    const [scramble, setScramble] = useState("");

    const {category, description, imageUrl, algorithm} = props.route.params.case;

    function onClickYes() {
        props.navigation.navigate("Main");
    }

    function onClickNo() {
        setShouldDisplaySolution(true);
    }

    function openEditScreen() {
        const {id, category, description, imageUrl, algorithm} = props.route.params.case;

        props.navigation.navigate("Add", {
            caseId: id,
            algorithm,
            description,
            imageUrl,
            category,
            title: "",
            callerScreen: "Test",
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

        GenerateScramble(props.route.params.case.algorithm, (success, newScramble) => {
            if (success) {
                setScramble(newScramble);
            } else {
                setScramble("Error");
            }
        });
    }, [algorithm]);

    const onClickOk = onClickYes;

    return (
        <View style={styles.container}>
            {/* In case category/description are empty, we can't output the strings (React Native doesn't like it) */}
            {!!category && <Text style={styles.categoryText}>{category}</Text>}
            {!!description && <Text style={styles.descriptionText}>Description: {description}</Text>}
            <FixedSizeSvgUri {...caseImageSize} uri={imageUrl} />
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

export default TestScreen;
