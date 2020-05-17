import { hashCode } from "./Utils";
import { Case } from "./Models";
import AsyncStorage from "@react-native-community/async-storage";

const HIGHSCORE_KEY = "@high_score/";

function hashCases(cases: Case[]) {
    return hashCode(JSON.stringify(cases.map(c => c.algorithm)));
}

export async function getHighScore(caseList: Case[]): Promise<number | null> {
    const result = await AsyncStorage.getItem(HIGHSCORE_KEY + hashCases(caseList));
    return result ? parseInt(result) : null;
}

export async function setHighScore(caseList: Case[], highScore: number) {
    await AsyncStorage.setItem(HIGHSCORE_KEY + hashCases(caseList), highScore.toString());
}