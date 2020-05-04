import React, { Component } from "react";
import {
    Text,
    FlatList,
    StyleSheet,
    Image,
    Button,
    Picker,
} from "react-native";
import { TouchableImage } from "./TouchableImage";
import { GenerateCaseImageOptions } from "./ImageOptionGenerator";
import { TextInput, ScrollView } from "react-native-gesture-handler";
import { Case } from "./Models";
import { StoreCase, GetAllCategories } from "./CaseStorage";
import { TextPrompt } from "./TextPrompt";

const styles = StyleSheet.create({
    formField: {
        marginLeft: 10,
        marginRight: 10,
        borderColor: "gray",
        borderWidth: 1,
    },
    formTextInput: {
        backgroundColor: "white",
    },
    formLabel: {
        marginLeft: 10,
        marginTop: 10,
    },
    selectedImage: {
        width: 200,
        height: 200,
    },
});

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
        };
    }

    componentDidMount() {
        if (this.props.route.params.title) {
            this.props.navigation.setOptions({
                title: this.props.route.params.title,
            });
        }

        GetAllCategories().then((categories) => {
            this.setState({ categoryOptions: categories });
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
            this.props.navigation.goBack();
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
                <Picker
                    style={styles.formField}
                    selectedValue={this.state.category}
                    onValueChange={this.selectCategoryOption}
                >
                    {this.renderCategoryOptions()}
                </Picker>
                <Text style={styles.formLabel}>Select image:</Text>
                <FlatList
                    horizontal={true}
                    data={this.getPossibleImages()}
                    renderItem={this.renderCaseImageOption}
                    keyExtractor={(item) => item.id.toString()}
                />
                <Text style={styles.formLabel}>Selected image:</Text>
                {this.state.selectedImage ? (
                    <Image
                        style={styles.selectedImage}
                        source={{ uri: this.state.selectedImage }}
                    />
                ) : (
                    <ScrollView style={styles.selectedImage} />
                )}
                <Button title="Save" onPress={this.trySaveCase} />
                {this.state.error && <Text>Please select an image.</Text>}
                {this.state.shouldDisplayAddPrompt && (
                    <TextPrompt
                        prompt="Add thing!"
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
