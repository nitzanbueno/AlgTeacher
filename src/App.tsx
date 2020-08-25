import "react-native-gesture-handler";
import React, { Component, createContext } from "react";
import MainScreen from "./Screens/Main";
import TestScreen from "./Screens/Test";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AddScreen from "./Screens/Add";
import { MenuProvider } from "react-native-popup-menu";
import TimeAttackOpeningScreen from "./Screens/TimeAttackOpening";
import TimeAttackPlayScreen from "./Screens/TimeAttackPlay";
import TimeAttackEndScreen from "./Screens/TimeAttackEnd";
import ImportAlgorithmSetScreen from "./Screens/ImportAlgorithmSet";
import { CaseStoreContext, globalCaseStore } from "./CaseStore";
import { RootStackParamList } from "./RootStackParamList";
import { Provider as PaperProvider } from "react-native-paper";
import Theme from "./Theme";

const Stack = createStackNavigator<RootStackParamList>();

class AppNavigationStack extends Component {
    render() {
        return (
            <MenuProvider>
                <PaperProvider theme={Theme}>
                    <NavigationContainer>
                        <Stack.Navigator>
                            <Stack.Screen name="Main" component={MainScreen} options={{ title: "AlgTeacher" }} />
                            <Stack.Screen name="Test" component={TestScreen} />
                            <Stack.Screen name="Add" component={AddScreen} />
                            <Stack.Screen name="TimeAttackOpening" component={TimeAttackOpeningScreen} options={{ title: "Time Attack" }} />
                            <Stack.Screen name="TimeAttackPlay" component={TimeAttackPlayScreen} options={{ title: "Time Attack" }} />
                            <Stack.Screen name="TimeAttackEnd" component={TimeAttackEndScreen} options={{ title: "Results" }} />
                            <Stack.Screen
                                name="ImportAlgorithmSet"
                                component={ImportAlgorithmSetScreen}
                                options={{ title: "Import Set" }}
                            />
                        </Stack.Navigator>
                    </NavigationContainer>
                </PaperProvider>
            </MenuProvider>
        );
    }
}

export default function App() {
    return (
        <CaseStoreContext.Provider value={globalCaseStore}>
            <AppNavigationStack />
        </CaseStoreContext.Provider>
    );
}
