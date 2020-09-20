import React, { FC, useState, useEffect, useContext } from "react";
import _ from "lodash";
import { Text, FlatList, StyleSheet, View, ScrollView } from "react-native";
import TouchableCubeImage from "../CommonComponents/TouchableCubeImage";
import { CUBE_IMAGE_OPTIONS } from "../ImageOptionGenerator";
import { Case } from "../Models";
import { CaseStoreContext } from "../CaseStore";
import PickerWithAddOption from "../CommonComponents/PickerWithAddOption";
import { observer } from "mobx-react";
import { CubeOptions } from "sr-visualizer";
import { GenerateScrambleAsync } from "../ScrambleLib";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../RootStackParamList";
import { TextInput, HelperText, Button, ActivityIndicator } from "react-native-paper";

const styles = StyleSheet.create({
    container: {
        paddingTop: 10,
    },
    formField: {
        marginLeft: 10,
        marginRight: 10,
        // borderColor: "gray",
        // borderWidth: 1,
        marginBottom: 15,
        height: 40,
        fontSize: 17,
    },
    algorithmSetPicker: {
        borderColor: "black",
        borderWidth: 1,
        flexDirection: "column",
        display: "flex",
        justifyContent: "center",
        backgroundColor: "white",
    },
    formTextInput: {
        backgroundColor: "white",
    },
    formLabel: {
        marginLeft: 13,
        marginBottom: 5,
        fontSize: 17,
    },
    imageSelectionStandin: {
        width: 150,
        height: 150,
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
    },
    errorText: {
        marginLeft: 10,
        marginTop: 5,
        color: "red",
    },
});

interface Props {
    navigation: StackNavigationProp<RootStackParamList, "Add">;
    route: RouteProp<RootStackParamList, "Add">;
}

function SelectionStandin(_: any) {
    return <View style={styles.imageSelectionStandin} />;
}

const AddScreen: FC<Props> = props => {
    const caseStore = useContext(CaseStoreContext);
    const [description, setDescription] = useState("");
    const [algorithm, setAlgorithm] = useState("");
    const [isAlgorithmInvalid, setIsAlgorithmInvalid] = useState(true);
    const [algorithmSet, setAlgorithmSet] = useState("");
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [didLoad, setDidLoad] = useState(false);
    const [imageOptions, setImageOptions] = useState(CUBE_IMAGE_OPTIONS);

    useEffect(
        function updateFormStateFromProps() {
            const { caseId } = props.route.params;
            setDidLoad(true);

            if (caseId < 0) return;

            const propCase = caseStore.GetCaseById(caseId);

            if (!propCase) return;
            setDescription(propCase.description);
            setAlgorithm(propCase.algorithm);
            setAlgorithmSet(propCase.algorithmSet || "");

            let newSelectedImageIndex = CUBE_IMAGE_OPTIONS.findIndex(o => _.isEqual(o, propCase.imageOptions));

            if (newSelectedImageIndex !== -1) {
                setImageOptions(CUBE_IMAGE_OPTIONS);
                setSelectedImageIndex(newSelectedImageIndex);
                return;
            }

            // If the selected options don't exist (e.g. PLLs with arrows), set the selected image to be the one after all the normal options
            setImageOptions(CUBE_IMAGE_OPTIONS.concat([propCase.imageOptions]));
            setSelectedImageIndex(CUBE_IMAGE_OPTIONS.length);
        },
        [props.route.params.caseId],
    );

    useEffect(() => {
        if (props.route.params.title) {
            props.navigation.setOptions({
                title: props.route.params.title,
            });
        }
    }, [props.route.params.title]);

    useEffect(() => {
        async function testIfAlgorithmIsValid() {
            try {
                await GenerateScrambleAsync(algorithm);
                setIsAlgorithmInvalid(false);
            } catch {
                setIsAlgorithmInvalid(true);
            }
        }

        testIfAlgorithmIsValid();
    }, [algorithm]);

    function renderCaseImageOption({ item, index }: { item: CubeOptions; index: number }) {
        if (!didLoad) return <SelectionStandin />;

        return (
            <View style={index === selectedImageIndex ? styles.selectedImage : styles.notSelectedImage}>
                <TouchableCubeImage onPress={() => setSelectedImageIndex(index)} algorithm={algorithm} {...item} />
            </View>
        );
    }

    function saveCase() {
        if (isAlgorithmInvalid) return;

        let caseToSave: Case = {
            id: props.route.params.caseId,
            algorithm,
            description,
            imageOptions: imageOptions[selectedImageIndex],
            algorithmSet: algorithmSet,
        };

        // Store the case, then go back
        caseStore.StoreCase(caseToSave);

        props.navigation.goBack();
    }

    return (
        <ScrollView style={styles.container}>
            <TextInput
                label="Algorithm"
                placeholder="e.g. F R U R' U' F'"
                style={styles.formField}
                value={algorithm}
                mode="outlined"
                onChangeText={setAlgorithm}
            />
            {isAlgorithmInvalid && <HelperText type="error" style={styles.errorText}>The algorithm is invalid.</HelperText>}
            <TextInput
                label="Description"
                placeholder="e.g. T-shape (optional)"
                style={styles.formField}
                mode="outlined"
                value={description}
                onChangeText={setDescription}
            />
            <Text style={styles.formLabel}>Algorithm Set:</Text>
            {caseStore.isLoaded ? (
                <View style={[styles.algorithmSetPicker, styles.formField]}>
                    <PickerWithAddOption
                        selectedValue={algorithmSet}
                        onValueChange={setAlgorithmSet}
                        options={caseStore.algorithmSets}
                        addPromptText="Add Algorithm Set"
                        addOptionText="Tap to add new set..."
                    />
                </View>
            ) : (
                <ActivityIndicator size={55} />
            )}
            <Text style={styles.formLabel}>Select image:</Text>
            <FlatList
                style={styles.imageList}
                horizontal={true}
                data={imageOptions}
                renderItem={renderCaseImageOption}
                keyExtractor={(_, index) => index.toString()}
            />
            <View style={styles.saveButton}>
                <Button mode="contained" disabled={isAlgorithmInvalid} children="Save" onPress={saveCase} />
            </View>
        </ScrollView>
    );
};

export default observer(AddScreen);
