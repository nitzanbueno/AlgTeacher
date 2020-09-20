import React, { FC, useState, useEffect, useContext, useMemo } from "react";
import { Text, FlatList, StyleSheet, View, ScrollView } from "react-native";
import TouchableCubeImage from "../CommonComponents/TouchableCubeImage";
import { CUBE_IMAGE_OPTIONS } from "../ImageOptionGenerator";
import { Case } from "../Models";
import { CaseStoreContext } from "../CaseStore";
import { observer } from "mobx-react";
import { CubeOptions } from "sr-visualizer";
import { GenerateScrambleAsync } from "../ScrambleLib";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../RootStackParamList";
import { TextInput, HelperText, Button } from "react-native-paper";

const styles = StyleSheet.create({
    container: {
        paddingTop: 10,
    },
    formField: {
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 15,
        fontSize: 17,
    },
    formLabel: {
        marginLeft: 13,
        marginBottom: 5,
        fontSize: 17,
    },
    selectedImage: {
        borderColor: "black",
        borderRadius: 10,
        borderWidth: 1,
    },
    notSelectedImage: {
        margin: 1, // To make them flush with the selected border
    },
    imageList: {
        margin: 10,
        paddingBottom: 5, // For the scrollbar
    },
    saveButton: {
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 40, // Otherwise you can't scroll to its bottom
    },
});

interface Props {
    navigation: StackNavigationProp<RootStackParamList, "Add">;
}

const CreateAlgorithmSetScreen: FC<Props> = props => {
    const caseStore = useContext(CaseStoreContext);
    const [algorithms, setAlgorithms] = useState("");
    const [algorithmSet, setAlgorithmSet] = useState("");
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [areAlgorithmsInvalid, setAreAlgorithmsInvalid] = useState(false);
    const [algSetErrorText, setAlgSetErrorText] = useState("");
    const [algorithmErrorText, setAlgorithmErrorText] = useState("");

    const firstAlgorithm = useMemo(() => algorithms.split("\n")[0].trim(), [algorithms]);

    function renderCaseImageOption({ item, index }: { item: CubeOptions; index: number }) {
        return (
            <View style={index === selectedImageIndex ? styles.selectedImage : styles.notSelectedImage}>
                <TouchableCubeImage onPress={() => setSelectedImageIndex(index)} algorithm={firstAlgorithm} {...item} />
            </View>
        );
    }

    useEffect(() => {
        async function testIfAlgorithmsAreValid() {
            try {
                // Make sure no promise rejects
                await Promise.all(algorithms.split("\n").map(algorithm => GenerateScrambleAsync(algorithm.trim())));
                setAreAlgorithmsInvalid(false);
            } catch {
                setAreAlgorithmsInvalid(true);
            }
        }

        testIfAlgorithmsAreValid();
    }, [algorithms]);

    function saveSet() {
        if (algorithmSet.trim() === "") {
            setAlgSetErrorText("Please give the algorithm set a name.");
            return;
        }

        setAlgSetErrorText("");

        if (areAlgorithmsInvalid) {
            setAlgorithmErrorText("Some of the algorithms are invalid - please fix them and try again.");
            return;
        }

        if (algorithms.trim() === "") {
            setAlgorithmErrorText("Please write at least one algorithm.");
            return;
        }

        setAlgorithmErrorText("");

        const newCases: Case[] = algorithms
            .split("\n")
            .map(alg => alg.trim())
            .filter(Boolean)
            .map(algorithm => ({
                algorithm,
                description: "",
                id: -1,
                imageOptions: CUBE_IMAGE_OPTIONS[selectedImageIndex],
                algorithmSet,
            }));

        caseStore.StoreCaseList(newCases);

        props.navigation.goBack();
    }

    return (
        <ScrollView style={styles.container}>
            {!!algSetErrorText && <HelperText type="error">{algSetErrorText}</HelperText>}
            <TextInput
                label="Name"
                placeholder="e.g. ZBLL, OLL..."
                style={styles.formField}
                mode="outlined"
                value={algorithmSet}
                onChangeText={(...args) => {
                    setAlgSetErrorText("");
                    setAlgorithmSet(...args);
                }}
            />
            {!!algorithmErrorText && <HelperText type="error">{algorithmErrorText}</HelperText>}
            <TextInput
                label="Algorithms"
                placeholder="e.g. F R U R' U' F'"
                multiline={true}
                numberOfLines={4}
                style={styles.formField}
                value={algorithms}
                mode="outlined"
                onChangeText={(...args) => {
                    // Disable errors when the algorithms are changed
                    setAlgorithmErrorText("");
                    setAlgorithms(...args);
                }}
            />
            <Text style={styles.formLabel}>Select image:</Text>
            <FlatList
                style={styles.imageList}
                horizontal
                data={CUBE_IMAGE_OPTIONS}
                renderItem={renderCaseImageOption}
                keyExtractor={(_, index) => index.toString()}
            />
            <View style={styles.saveButton}>
                <Button mode="contained" children="Save" onPress={saveSet} />
            </View>
        </ScrollView>
    );
};

export default observer(CreateAlgorithmSetScreen);
