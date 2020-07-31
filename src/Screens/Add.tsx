import React, {FC, useState, useEffect, useContext} from "react";
import _ from "lodash";
import {Text, FlatList, StyleSheet, Button, View} from "react-native";
import TouchableCubeImage from "../CommonComponents/TouchableCubeImage";
import {CUBE_IMAGE_OPTIONS} from "../ImageOptionGenerator";
import {TextInput, ScrollView} from "react-native-gesture-handler";
import {Case} from "../Models";
import {CaseStoreContext} from "../CaseStore";
import PickerWithAddOption from "../CommonComponents/PickerWithAddOption";
import {observer} from "mobx-react";
import {CubeImage} from "../CommonComponents/CubeImage";
import {CubeOptions} from "sr-visualizer";

const styles = StyleSheet.create({
    formField: {
        marginLeft: 10,
        marginRight: 10,
        borderColor: "gray",
        borderWidth: 1,
        height: 40,
    },
    categoryPicker: {
        borderColor: "black",
        borderWidth: 1,
        flexDirection: "column",
        display: "flex",
        justifyContent: "center",
        backgroundColor: "white",
    },
    pickerStandin: {
        height: 40,
        justifyContent: "center",
    },
    formTextInput: {
        backgroundColor: "white",
    },
    formLabel: {
        marginLeft: 10,
        marginTop: 10,
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
        marginTop: 10,
        marginBottom: 10,
    },
});

const selectedImageSize = {
    width: 150,
    height: 150,
};

interface Props {
    navigation: any;
    route: any;
}

function SelectionStandin(props: any) {
    return <View style={styles.imageSelectionStandin} />;
}

const AddScreen: FC<Props> = props => {
    const caseStore = useContext(CaseStoreContext);
    const [description, setDescription] = useState("");
    const [algorithm, setAlgorithm] = useState("");
    const [category, setCategory] = useState("");
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [didLoad, setDidLoad] = useState(false);
    const [imageOptions, setImageOptions] = useState(CUBE_IMAGE_OPTIONS);

    useEffect(
        function updateFormStateFromProps() {
            const {caseId} = props.route.params;
            setDidLoad(true);

            if (caseId < 0) return;

            const propCase = caseStore.GetCaseById(caseId);

            if (!propCase) return;
            setDescription(propCase.description);
            setAlgorithm(propCase.algorithm);
            setCategory(propCase.category || "");

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

    function renderCaseImageOption({item, index}: {item: CubeOptions, index: number}) {
        if (!didLoad) return <SelectionStandin />;

        return (
            <View style={index === selectedImageIndex ? styles.selectedImage : styles.notSelectedImage}>
                <TouchableCubeImage onPress={() => setSelectedImageIndex(index)} algorithm={algorithm} {...item} />
            </View>
        );
    }

    function saveCase() {
        let caseToSave: Case = {
            id: props.route.params.caseId,
            algorithm,
            description,
            imageOptions: imageOptions[selectedImageIndex],
            category,
        };

        // Store the case, then go back
        caseStore.StoreCase(caseToSave);

        props.navigation.goBack();
    }

    return (
        <ScrollView>
            <Text style={styles.formLabel}>Algorithm:</Text>
            <TextInput
                placeholder="e.g. F R U R' U' F'"
                style={[styles.formField, styles.formTextInput]}
                value={algorithm}
                onChangeText={setAlgorithm}
            />
            <Text style={styles.formLabel}>Description:</Text>
            <TextInput
                placeholder="e.g. T-shape (optional)"
                style={[styles.formField, styles.formTextInput]}
                value={description}
                onChangeText={setDescription}
            />
            <Text style={styles.formLabel}>Category:</Text>
            {caseStore.isLoaded ? (
                <View style={[styles.categoryPicker, styles.formField]}>
                    <PickerWithAddOption
                        selectedValue={category}
                        onValueChange={setCategory}
                        options={caseStore.categories}
                        addPromptText="Add category"
                        addOptionText="Tap to add new category"
                    />
                </View>
            ) : (
                // You might be asking yourself, "What the hell is that?"
                // "Why do I need to have "Loading" text for a picker? Can't I just have a "Loading" option or something?"
                // Well, apparently, whenever you change options for a picker, it automatically changes selection to the first one.
                // However, I want to have an already selected category (the one of the possibly-currently-edited case), and categories
                // load asynchronously, so that forces me to cause the selection change (which I can't tell apart from any other selection
                // change and thus can't block).
                // Unless, I don't change the categories at all, and just render the picker after they've been loaded.
                // Thus, this stupidity.
                <View style={styles.pickerStandin}>
                    <Text>Loading...</Text>
                </View>
            )}
            <Text style={styles.formLabel}>Select image:</Text>
            <FlatList
                style={styles.imageList}
                horizontal={true}
                data={imageOptions}
                renderItem={renderCaseImageOption}
                keyExtractor={(item, index) => index.toString()}
            />
            <Button title="Save" onPress={saveCase} />
        </ScrollView>
    );
};

export default observer(AddScreen);
