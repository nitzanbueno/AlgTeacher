import "react-native-gesture-handler";
import React, { Component } from "react";
import { MainScreen } from "./MainScreen";
import { TestScreen } from "./TestScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Cube from "cubejs";

const Stack = createStackNavigator();

class AppNavigationStack extends Component {
    constructor(props: any) {
        super(props);
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
                </Stack.Navigator>
            </NavigationContainer>
        );
    }
}

export default function App() {
    return <AppNavigationStack />;
}
