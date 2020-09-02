import React from "react";
import { StackHeaderProps } from "@react-navigation/stack";
import { Appbar } from "react-native-paper";

const AppbarHeader = ({ scene, previous, navigation }: StackHeaderProps) => {
    const { options } = scene.descriptor;
    const title = options.headerTitle !== undefined ? options.headerTitle : options.title !== undefined ? options.title : scene.route.name;

    return (
        <Appbar.Header>
            {scene.descriptor.options.headerLeft
                ? scene.descriptor.options.headerLeft({})
                : previous && <Appbar.BackAction onPress={navigation.goBack} />}
            <Appbar.Content title={title} />
            {scene.descriptor.options.headerRight && scene.descriptor.options.headerRight({})}
        </Appbar.Header>
    );
};

export default AppbarHeader;
