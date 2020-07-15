import React, { Component } from "react";
import {
    Text,
    FlatList,
    StyleSheet,
    Button,
    View,
} from "react-native";
import { TouchableImage } from "../CommonComponents/TouchableImage";
import { GenerateCaseImageOptions } from "../ImageOptionGenerator";
import { TextInput, ScrollView } from "react-native-gesture-handler";
import { Picker } from "@react-native-community/picker";
import { Case } from "../Models";
import { StoreCase, GetAllCategories } from "../CaseStorage";
import { TextPrompt } from "../CommonComponents/TextPrompt";
import FixedSizeSvgUri from "../CommonComponents/FixedSizeSvgUri";

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
        justifyContent: "center"
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

const ADD_CATEGORY_KEY: string = "add";

export class AddScreen extends Component<
    { navigation: any; route: any },
    {
        algorithm: string;
        description: string;
        selectedImage: string;
        error: boolean;
        category?: string;
        categoryOptions: string[];
        shouldDisplayAddPrompt: boolean;
        didLoadCategoryOptions: boolean;
    }
> {
    constructor(props: any) {
        super(props);
        this.state = {
            algorithm: this.props.route.params.algorithm || "",
            description: this.props.route.params.description || "",
            selectedImage: this.props.route.params.imageUrl || "",
            category: this.props.route.params.category || undefined,
            error: false,
            categoryOptions: [],
            shouldDisplayAddPrompt: false,
            didLoadCategoryOptions: false,
        };
    }

    componentDidMount() {
        if (this.props.route.params.title) {
            this.props.navigation.setOptions({
                title: this.props.route.params.title,
            });
        }

        GetAllCategories().then((categories) => {
            // After the category options load, the given category for the case can be written
            this.setState({
                categoryOptions: categories,
                didLoadCategoryOptions: true,
            });
        });
    }

    setAlgorithm = (value: string) => {
        this.setState({ algorithm: value });
    };

    setDescription = (value: string) => {
        this.setState({ description: value });
    };

    /**
     * Returns a list of image URLs based on the case algorithm, along with a serial number for each of them (for key extraction purposes).
     */
    getPossibleImages = (): Array<{ url: string; id: number }> => {
        return GenerateCaseImageOptions(this.state.algorithm).map(
            (option, index) => {
                return { url: option, id: index };
            }
        );
    };

    selectImageOption = (option: string) => {
        this.setState({ selectedImage: option });
    };

    renderCaseImageOption = ({ item }: { item: { url: string } }) => {
        return (
            <TouchableImage
                onPress={() => this.selectImageOption(item.url)}
                imageUrl={item.url}
            />
        );
    };

    saveCase = () => {
        let caseToSave: Case = {
            id: this.props.route.params.caseId,
            algorithm: this.state.algorithm,
            description: this.state.description,
            imageUrl: this.state.selectedImage,
            category: this.state.category,
        };

        // Store the case, then call the callback
        StoreCase(caseToSave).then(() => {
            this.props.navigation.navigate(this.props.route.params.callerScreen, {case: caseToSave});
        });
    };

    /**
     * Confirms all required fields are present.
     * If they are, saves the case.
     * If they aren't, displays error messages.
     */
    trySaveCase = () => {
        // Currently, nothing is required except the image.
        if (this.state.selectedImage != "") {
            this.saveCase();
        } else {
            this.setState({ error: true });
        }
    };

    addCategory = (category: string) => {
        // We can't add the category named the same as ADD_CATEGORY_KEY, because that's
        // already the name of the "Add category" option.
        // (not a great loss, I don't care enough to add an error message either)
        if (category != "" && category != ADD_CATEGORY_KEY) {
            // The rest will take care of itself
            this.setState({ category: category });
        }
    };

    // TODO: Extract a component for the category picker
    promptAddCategory() {
        this.setState({ shouldDisplayAddPrompt: true });
    }

    renderCategoryOptions = () => {
        let categoryOptions = [...this.state.categoryOptions];

        // In case the user has added a new category
        if (
            this.state.category != undefined &&
            this.state.category != ADD_CATEGORY_KEY &&
            !categoryOptions.includes(this.state.category)
        ) {
            categoryOptions.push(this.state.category);
        }

        let pickerItems = categoryOptions.map((category) => (
            <Picker.Item label={category} value={category} key={category} />
        ));

        pickerItems.unshift(
            <Picker.Item key={""} label="None" value={undefined} />
        );
        pickerItems.push(
            <Picker.Item
                key={ADD_CATEGORY_KEY}
                label="Add..."
                value={ADD_CATEGORY_KEY}
            />
        );

        return pickerItems;
    };

    selectCategoryOption = (itemValue: any, itemIndex: number) => {
        if (itemValue != ADD_CATEGORY_KEY) {
            this.setState({ category: itemValue });
        } else {
            this.promptAddCategory();
        }
    };

    render() {
        return (
            <ScrollView>
                <Text style={styles.formLabel}>Algorithm:</Text>
                <TextInput
                    style={[styles.formField, styles.formTextInput]}
                    value={this.state.algorithm}
                    onChangeText={this.setAlgorithm}
                />
                <Text style={styles.formLabel}>Description (Optional):</Text>
                <TextInput
                    style={[styles.formField, styles.formTextInput]}
                    value={this.state.description}
                    onChangeText={this.setDescription}
                />
                <Text style={styles.formLabel}>Category:</Text>
                {this.state.didLoadCategoryOptions ? (
                    <Picker
                        style={styles.formField}
                        selectedValue={this.state.category}
                        onValueChange={this.selectCategoryOption}
                    >
                        {this.renderCategoryOptions()}
                    </Picker>
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
                    data={this.getPossibleImages()}
                    renderItem={this.renderCaseImageOption}
                    keyExtractor={(item) => item.id.toString()}
                />
                <Text style={styles.formLabel}>Selected image:</Text>
                {this.state.selectedImage ? (
                    <FixedSizeSvgUri
                        {...selectedImageSize}
                        uri={this.state.selectedImage}
                    />
                ) : (
                    <View style={styles.selectedImage} />
                )}
                {this.state.error && <Text>Please select an image.</Text>}
                <Button title="Save" onPress={this.trySaveCase} />
                {this.state.shouldDisplayAddPrompt && (
                    <TextPrompt
                        prompt="Add category"
                        onSubmit={(result) => {
                            this.setState({ shouldDisplayAddPrompt: false });
                            this.addCategory(result);
                        }}
                        onCancel={() => {
                            this.setState({ shouldDisplayAddPrompt: false });
                        }}
                    />
                )}
            </ScrollView>
        );
    }
}
