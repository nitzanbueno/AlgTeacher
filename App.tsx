import "react-native-gesture-handler";
import React, { Component } from "react";
import { MainScreen } from "./MainScreen";
import { TestScreen } from "./TestScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Cube from "cubejs";
import { AddScreen } from "./AddScreen";

const Stack = createStackNavigator();

class AppNavigationStack extends Component {
    componentDidMount() {
        // This is EXTREMELY slow - ~30s.
        // I have to make it work in the background because it freezes everything and you think the app didn't even open.
        // It's TERRIBLE.
        Cube.initSolver();
    }

    render() {
        return (
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
        );
    }
}

export default function App() {
    return <AppNavigationStack />;
}
