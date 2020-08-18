import { HashCode } from "./Utils";
import { Case } from "./Models";
import AsyncStorage from "@react-native-community/async-storage";

const HIGHSCORE_KEY = "@high_score/";

function hashCases(cases: Case[]) {
    const sets = [...new Set(cases.map(c => c.algorithmSet))].sort();

    // If the number of algorithms changes, I want to reset the high score
    return HashCode(JSON.stringify([sets, cases.length]));
}

export type HighScoreType = { totalTime: number; solveCount: number };

export default class TimeAttackStorage {
    static async FetchHighScore(caseList: Case[]): Promise<HighScoreType | null> {
        const key = HIGHSCORE_KEY + hashCases(caseList);
        const result = await AsyncStorage.getItem(key);

        if (result == null) return null;

        let parsedResult: any = {};

        try {
            parsedResult = JSON.parse(result);
        } catch (SyntaxError) {
            await AsyncStorage.removeItem(key);
            return null;
        }

        if (!parsedResult.totalTime || !parsedResult.solveCount) {
            await AsyncStorage.removeItem(key);
            return null;
        }

        return parsedResult;
    }

    static async SaveHighScore(caseList: Case[], highScore: HighScoreType) {
        const key = HIGHSCORE_KEY + hashCases(caseList);
        const value = JSON.stringify(highScore);
        await AsyncStorage.setItem(key, value);
    }
}
