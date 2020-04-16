import { AsyncStorage } from "react-native";
import { Case } from "./Models";

const CASES_KEY = "@cases";

function serializeCases(cases: Case[]): string {
    return JSON.stringify(cases);
}

function deserializeCases(caseString: string): Case[] {
    return JSON.parse(caseString);
}

/**
 * Stores a copy of the given case with the correct ID and returns the copy.
 * @param case_ The case to store (the ID variable is ignored.).
 */
export async function StoreCase(case_: Case): Promise<Case> {
    let currentCaseString = await AsyncStorage.getItem(CASES_KEY);
    let cases: Case[];

    if (currentCaseString === null) {
        cases = [];
    } else {
        cases = deserializeCases(currentCaseString);
    }

    // Get the next ID that doesn't exist in the case list
    let nextId = cases.reduce((id1, case2) => Math.max(id1, case2.id), 0) + 1;

    let caseToAdd: Case = {
        id: nextId,
        algorithm: case_.algorithm,
        description: case_.description,
        imageUrl: case_.imageUrl,
    };

    cases.push(caseToAdd);

    let newCaseString = serializeCases(cases);
    await AsyncStorage.setItem(CASES_KEY, newCaseString);

    return caseToAdd;
}

/**
 * Returns all stored cases in a list.
 * Creates and stores an empty list in case no case was stored yet.
 */
export async function GetAllCases(): Promise<Case[]> {
    let caseString = await AsyncStorage.getItem(CASES_KEY);
    let cases: Case[];

    if (caseString === null) {
        cases = [];
        await AsyncStorage.setItem(CASES_KEY, JSON.stringify(cases));
    } else {
        cases = deserializeCases(caseString);
    }

    return cases;
}
