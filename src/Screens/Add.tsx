import React, {FC, useState, useEffect, useContext} from "react";
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

function SelectionStandin(props: any) {
    return <View style={styles.imageSelectionStandin} />
}

const AddScreen: FC<Props> = props => {
    const caseStore = useContext(CaseStoreContext);
    const [description, setDescription] = useState("");
    const [algorithm, setAlgorithm] = useState("");
    const [category, setCategory] = useState("");
    const [selectedImageOptions, setSelectedImageOptions] = useState<CubeOptions>({});
    const [didLoad, setDidLoad] = useState(false);

    useEffect(
        function updateFormStateFromProps() {
            const {caseId} = props.route.params;
            setDidLoad(true);

            if (caseId < 0) return;

            const propCase = caseStore.GetCaseById(caseId);

            if (propCase) {
                setDescription(propCase.description);
                setAlgorithm(propCase.algorithm);
                setCategory(propCase.category || "");
                setSelectedImageOptions(propCase.imageOptions);
            }
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

    function renderCaseImageOption({item}: {item: CubeOptions}) {
        return didLoad ? (
            <TouchableCubeImage onPress={() => setSelectedImageOptions(item)} algorithm={algorithm} {...item} />
        ) : (
            <SelectionStandin />
        );
    }

    function saveCase() {
        let caseToSave: Case = {
            id: props.route.params.caseId,
            algorithm,
            description,
            imageOptions: selectedImageOptions,
            category,
        };

        // Store the case, then go back
        caseStore.StoreCase(caseToSave);

        props.navigation.goBack();
    }

    return (
        <ScrollView>
            <Text style={styles.formLabel}>Algorithm:</Text>
            <TextInput placeholder="e.g. F R U R' U' F'" style={[styles.formField, styles.formTextInput]} value={algorithm} onChangeText={setAlgorithm} />
            <Text style={styles.formLabel}>Description:</Text>
            <TextInput placeholder="e.g. T-shape (optional)" style={[styles.formField, styles.formTextInput]} value={description} onChangeText={setDescription} />
            <Text style={styles.formLabel}>Category:</Text>
            {caseStore.isLoaded ? (
                <View style={[styles.categoryPicker, styles.formField]}>
                <PickerWithAddOption
                    selectedValue={category}
                    onValueChange={setCategory}
                    options={caseStore.categories}
                    addPromptText="Add category"
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
                horizontal={true}
                data={CUBE_IMAGE_OPTIONS}
                renderItem={renderCaseImageOption}
                keyExtractor={(item, index) => index.toString()}
            />
            <Text style={styles.formLabel}>Selected image:</Text>
            {didLoad ? <CubeImage {...selectedImageSize} {...selectedImageOptions} case={algorithm} /> : <SelectionStandin />}
            <Button title="Save" onPress={saveCase} />
        </ScrollView>
    );
};

export default observer(AddScreen);
