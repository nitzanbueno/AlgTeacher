import AsyncStorage from "@react-native-community/async-storage";
import {Case} from "./Models";
import {observable, autorun, computed, action, decorate} from "mobx";
import { createContext } from "react";

const CASES_KEY = "@cases";

export class CaseStore {
    cases: Case[] = [];
    isLoaded: boolean = false;

    constructor() {
        // Load the cases
        this._getAllCases().then(loadedCases => {
            this.cases = loadedCases;
            this.isLoaded = true;
            
            // This could cause race conditions if two actions are performed in quick succession - 
            // the second one might finish before the first one, thus erasing data.
            // This isn't a major concern for this part of the code, though.
            autorun(() => {
                let newCaseString = JSON.stringify(this.cases);
                AsyncStorage.setItem(CASES_KEY, newCaseString);
            });
        });
    }

    /**
     * Returns all stored cases in a list (or an empty list if no cases are stored).
     */
    async _getAllCases(): Promise<Case[]> {
        let caseString = await AsyncStorage.getItem(CASES_KEY);

        if (caseString === null) {
            return [];
        }

        return JSON.parse(caseString);
    }

    /**
     * Stores the given case, replacing the case with its ID or storing
     * a new case if the ID doesn't exist within the stored cases.
     * If the case ID is -1, stores it with a new ID.
     * @param case_ The case to store.
     */
    StoreCase(case_: Case): void {
        const caseToStore = Object.assign({}, case_);
        let existingCaseIndex = -1;

        if (caseToStore.id == -1) {
            caseToStore.id = this.cases.reduce((id1, case2) => Math.max(id1, case2.id), 0) + 1;
        } else {
            existingCaseIndex = this.cases.findIndex(c => c.id == caseToStore.id);
        }

        if (existingCaseIndex >= 0) {
            this.cases[existingCaseIndex] = caseToStore;
        } else {
            this.cases.push(caseToStore);
        }
    }

    /**
     * Stores a list of cases.
     * @param caseList The list of cases to store.
     */
    StoreCaseList(caseList: Case[]): void {
        for (const case_ of caseList) {
            this.StoreCase(case_);
        }
    }

    DeleteCase(id: number) {
        let caseIndex = this.cases.findIndex(c => c.id == id);
        if (caseIndex >= 0) {
            this.cases.splice(caseIndex, 1);
        } else {
            throw Error("Case ID not found.");
        }
    }

    /**
     * Clears all cases.
     */
    ClearAllCases() {
        this.cases = [];
    }

    GetCaseById(id: number): Case | undefined {
        return this.cases.find(c => c.id == id);
    }

    async ExtraClearAllCases() {
        await AsyncStorage.removeItem(CASES_KEY);
    }

    /**
     * All categories within stored cases, except undefined and empty strings.
     */
    get categories(): string[] {
        let loadedCategories = this.cases.map(case_ => case_.category).filter(case_ => case_ != '' && case_ != undefined);
        loadedCategories = [...new Set(loadedCategories)];

        return loadedCategories as string[];
    }
}

decorate(CaseStore, {
    cases: observable,
    categories: computed,
    StoreCase: action,
    StoreCaseList: action,
    DeleteCase: action,
    ClearAllCases: action,
})

export const globalCaseStore = new CaseStore();
export const CaseStoreContext = createContext(globalCaseStore);
