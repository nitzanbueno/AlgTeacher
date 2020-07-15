import AsyncStorage from '@react-native-community/async-storage';
import {Case} from './Models';

const CASES_KEY = '@cases';

export default class CaseStorage {
    /**
     * Stores the given case, replacing the case with its ID or storing
     * a new case if the ID doesn't exist within the stored cases.
     * If the case ID is -1, stores it with a new ID.
     * @param case_ The case to store.
     */
    static async StoreCase(case_: Case): Promise<void> {
        const cases: Case[] = await CaseStorage.GetAllCases();

        const caseToStore = Object.assign({}, case_);
        let existingCaseIndex = -1;

        if (caseToStore.id == -1) {
            caseToStore.id = cases.reduce((id1, case2) => Math.max(id1, case2.id), 0) + 1;
        } else {
            existingCaseIndex = cases.findIndex(c => c.id == caseToStore.id);
        }

        if (existingCaseIndex >= 0) {
            cases[existingCaseIndex] = caseToStore;
        } else {
            cases.push(caseToStore);
        }

        let newCaseString = JSON.stringify(cases);
        await AsyncStorage.setItem(CASES_KEY, newCaseString);
    }

    /**
     * Stores a list of cases.
     * @param caseList The list of cases to store.
     */
    static async StoreCaseList(caseList: Case[]): Promise<void> {
        for (const case_ of caseList) {
            await CaseStorage.StoreCase(case_);
        }
    }

    static async DeleteCase(id: Number) {
        let cases: Case[] = await CaseStorage.GetAllCases();

        let caseIndex = cases.findIndex(c => c.id == id);
        if (caseIndex >= 0) {
            cases.splice(caseIndex, 1);
        } else {
            throw Error('Case ID not found.');
        }

        let newCaseString = JSON.stringify(cases);
        await AsyncStorage.setItem(CASES_KEY, newCaseString);
    }

    /**
     * Clears all cases.
     */
    static async ClearAllCases() {
        await AsyncStorage.removeItem(CASES_KEY);
    }

    /**
     * Returns all stored cases in a list.
     * Creates and stores an empty list in case no case was stored yet.
     */
    static async GetAllCases(): Promise<Case[]> {
        let caseString = await AsyncStorage.getItem(CASES_KEY);
        let cases: Case[];

        if (caseString === null) {
            cases = [];
            await AsyncStorage.setItem(CASES_KEY, JSON.stringify(cases));
        } else {
            cases = JSON.parse(caseString);
        }

        return cases;
    }

    /**
     * Returns an array containing all categories within stored cases,
     * except undefined and empty strings.
     */
    static async GetAllCategories(): Promise<string[]> {
        let cases = await CaseStorage.GetAllCases();

        let categories: string[] = cases.map(case_ => case_.category).filter(case_ => case_ != '' && case_ != undefined) as string[];
        categories = [...new Set(categories)];

        return categories;
    }
}
