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
 * Stores the given case, replacing the case with its ID or storing
 * a new case if the ID doesn't exist within the stored cases.
 * @param case_ The case to store.
 */
export async function StoreCase(case_: Case): Promise<void> {
    let cases: Case[] = await GetAllCases();

    let existingCaseIndex = cases.findIndex((c) => c.id == case_.id);
    if (existingCaseIndex >= 0) {
        cases[existingCaseIndex] = case_;
    } else {
        cases.push(case_);
    }

    let newCaseString = serializeCases(cases);
    await AsyncStorage.setItem(CASES_KEY, newCaseString);
}

export async function DeleteCase(id: Number) {
    let cases: Case[] = await GetAllCases();

    let caseIndex = cases.findIndex((c) => c.id == id);
    if (caseIndex >= 0) {
        cases.splice(caseIndex, 1);
    } else {
        throw Error("Case ID not found.");
    }

    let newCaseString = serializeCases(cases);
    await AsyncStorage.setItem(CASES_KEY, newCaseString);
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

/**
 * Returns an array containing all categories within stored cases,
 * except undefined and empty strings.
 */
export async function GetAllCategories(): Promise<string[]> {
    let cases = await GetAllCases();

    let categories: string[] = cases
        .map((case_) => case_.category)
        .filter((case_) => case_ != "" && case_ != undefined) as string[];
    categories = [...new Set(categories)];

    return categories;
}
