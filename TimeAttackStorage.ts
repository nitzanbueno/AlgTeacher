import {hashCode} from './Utils';
import {Case} from './Models';
import AsyncStorage from '@react-native-community/async-storage';

const HIGHSCORE_KEY = '@high_score/';

function hashCases(cases: Case[]) {
    return hashCode(JSON.stringify(cases.sort((a, b) => a.id - b.id).map(c => c.algorithm)));
}

type HighScoreType = {totalTime: number; solveCount: number};

export async function getHighScore(caseList: Case[]): Promise<HighScoreType | null> {
    const key = HIGHSCORE_KEY + hashCases(caseList);
    const result = await AsyncStorage.getItem(key);
    console.log(key, result);

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

export async function setHighScore(caseList: Case[], highScore: HighScoreType) {
    const key = HIGHSCORE_KEY + hashCases(caseList);
    const value = JSON.stringify(highScore);
    console.log('SET', key, value);
    await AsyncStorage.setItem(key, value);
}
