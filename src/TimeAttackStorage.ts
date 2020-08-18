import AsyncStorage from "@react-native-community/async-storage";

export type HighScoreType = { totalTime: number; solveCount: number };

export default class TimeAttackStorage {
    static async FetchHighScore(key: string): Promise<HighScoreType | null> {
        const result = await AsyncStorage.getItem(key);

        if (result == null) return null;

        let parsedResult: any = {};

        // Here for backwards-compatibility (so the app doesn't crash)
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

    static async SaveHighScore(key: string, highScore: HighScoreType) {
        const value = JSON.stringify(highScore);
        await AsyncStorage.setItem(key, value);
    }
}
