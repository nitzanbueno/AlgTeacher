import React, { Component } from "react";
import { Text, View, FlatList, StyleSheet, Image, Button, AccessibilityInfo } from "react-native";
import { TouchableImage } from "./TouchableImage";
import { GenerateCaseImageOptions } from "./ImageOptionGenerator";
import { TextInput } from "react-native-gesture-handler";
import { Case } from "./Models";
import { StoreCase } from "./CaseStorage";

const styles = StyleSheet.create({
    formField: {
        marginLeft: 10,
        marginRight: 10,
        backgroundColor: "white",
        borderColor: "gray",
        borderWidth: 1,
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

export class AddScreen extends Component<
    {navigation: any},
    { algorithm: string; description: string; selectedImage: string }
> {
    constructor(props: any) {
        super(props);
        this.state = {
            algorithm: "",
            description: "",
            selectedImage: "",
        };
    }

    setAlgorithm = (value: string) => {
        this.setState({ algorithm: value });
    };

    setDescription = (value: string) => {
        this.setState({ description: value });
    };

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
            id: -1,
            algorithm: this.state.algorithm,
            description: this.state.description,
            imageUrl: this.state.selectedImage
        }

        // Store the case, then call the callback
        StoreCase(caseToSave).then((case_) => {
            this.props.navigation.navigate("Main", {newCase: case_})
        });
    }

    render() {
        return (
            <View>
                <Text style={styles.formLabel}>Algorithm:</Text>
                <TextInput
                    style={styles.formField}
                    value={this.state.algorithm}
                    onChangeText={this.setAlgorithm}
                />
                <Text style={styles.formLabel}>Description (Optional):</Text>
                <TextInput
                    style={styles.formField}
                    value={this.state.description}
                    onChangeText={this.setDescription}
                />
                <Text style={styles.formLabel}>Image options:</Text>
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
                    <View style={styles.selectedImage} />
                )}
                <Button
                    title="Save"
                    onPress={this.saveCase}
                />
            </View>
        );
    }
}
