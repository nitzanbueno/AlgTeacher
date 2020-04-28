import "react-native-gesture-handler";
import React, { Component } from "react";
import { MainScreen } from "./MainScreen";
import { TestScreen } from "./TestScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { AddScreen } from "./AddScreen";
import { MenuProvider } from "react-native-popup-menu";

const Stack = createStackNavigator();

class AppNavigationStack extends Component {
    render() {
        return (
            <MenuProvider>
                <NavigationContainer>
                    <Stack.Navigator>
                        <Stack.Screen
                            name="Main"
                            component={MainScreen}
                            options={{ title: "AlgTeacher" }}
                        />
                        <Stack.Screen name="Test" component={TestScreen} />
                        <Stack.Screen name="Add" component={AddScreen} />
                    </Stack.Navigator>
                </NavigationContainer>
            </MenuProvider>
        );
    }
}

export default function App() {
    return <AppNavigationStack />;
}
