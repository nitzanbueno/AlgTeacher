import React, {Component, FC, useState, useEffect, useContext} from "react";
import {Text, FlatList, StyleSheet, Button, View} from "react-native";
import TouchableImage from "../CommonComponents/TouchableImage";
import {GenerateCaseImageOptions} from "../ImageOptionGenerator";
import {TextInput, ScrollView} from "react-native-gesture-handler";
import {Case} from "../Models";
import { CaseStoreContext } from "../CaseStore";
import FixedSizeSvgUri from "../CommonComponents/FixedSizeSvgUri";
import PickerWithAddOption from "../CommonComponents/PickerWithAddOption";
import { observer } from "mobx-react";

const styles = StyleSheet.create({
    formField: {
        marginLeft: 10,
        marginRight: 10,
        borderColor: "gray",
        borderWidth: 1,
        height: 40,
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
    selectedImage: {
        width: 150,
        height: 150,
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

const AddScreen: FC<Props> = (props) => {
    const caseStore = useContext(CaseStoreContext);
    const [description, setDescription] = useState("");
    const [algorithm, setAlgorithm] = useState("");
    const [category, setCategory] = useState("");
    const [selectedImage, setSelectedImage] = useState("");
    const [isError, setIsError] = useState(false);

    useEffect(function updateFormStateFromProps() {
        const {caseId} = props.route.params;

        if (caseId < 0) return;
        
        const propCase = caseStore.GetCaseById(caseId);

        if (propCase) {
            setDescription(propCase.description);
            setAlgorithm(propCase.algorithm);
            setCategory(propCase.category || "");
            setSelectedImage(propCase.imageUrl);
        }
    }, [props.route.params.caseId]);

    useEffect(() => {
        if(props.route.params.title) {
            props.navigation.setOptions({
                title: props.route.params.title
            })
        }
    }, [props.route.params.title]);

    /**
     * Returns a list of image URLs based on the case algorithm, along with a serial number for each of them (for key extraction purposes).
     */
    function getPossibleImages(): Array<{url: string, id: number}> {
        return GenerateCaseImageOptions(algorithm).map((option, index) => {
            return {url: option, id: index};
        });
    };

    function renderCaseImageOption({item}: {item: {url: string}}) {
        return <TouchableImage onPress={() => setSelectedImage(item.url)} imageUrl={item.url} />;
    };

    function saveCase() {
        let caseToSave: Case = {
            id: props.route.params.caseId,
            algorithm,
            description,
            imageUrl: selectedImage,
            category,
        };

        // Store the case, then go back
        caseStore.StoreCase(caseToSave);

        props.navigation.goBack();
    };

    /**
     * Confirms all required fields are present.
     * If they are, saves the case.
     * If they aren't, displays error messages.
     */
    function trySaveCase() {
        // Currently, nothing is required except the image.
        if (selectedImage != "") {
            saveCase();
        } else {
            setIsError(true);
        }
    };

    return (
        <ScrollView>
            <Text style={styles.formLabel}>Algorithm:</Text>
            <TextInput style={[styles.formField, styles.formTextInput]} value={algorithm} onChangeText={setAlgorithm} />
            <Text style={styles.formLabel}>Description (Optional):</Text>
            <TextInput
                style={[styles.formField, styles.formTextInput]}
                value={description}
                onChangeText={setDescription}
            />
            <Text style={styles.formLabel}>Category:</Text>
            {caseStore.isLoaded ? (
                <PickerWithAddOption
                    style={styles.formField}
                    selectedValue={category}
                    onValueChange={setCategory}
                    options={caseStore.categories}
                    addPromptText="Add category"
                />
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
                horizontal={true}
                data={getPossibleImages()}
                renderItem={renderCaseImageOption}
                keyExtractor={item => item.id.toString()}
            />
            <Text style={styles.formLabel}>Selected image:</Text>
            {selectedImage ? (
                <FixedSizeSvgUri {...selectedImageSize} uri={selectedImage} />
            ) : (
                <View style={styles.selectedImage} />
            )}
            {isError && <Text>Please select an image.</Text>}
            <Button title="Save" onPress={trySaveCase} />
        </ScrollView>
    );
};

export default observer(AddScreen);
