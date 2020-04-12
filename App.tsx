import "react-native-gesture-handler";
import React from "react";
import { MainScreen } from "./MainScreen";
import { TestScreen } from "./TestScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

function AppNavigationStack() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Main"
                    component={MainScreen}
                    options={{ title: "AlgTeacher" }}
                />
                <Stack.Screen name="Test" component={TestScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default function App() {
    return (
        <AppNavigationStack />
    );
}
