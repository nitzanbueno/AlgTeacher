import { Case, TimeAttackOptions } from "./Models";

export type RootStackParamList = {
    Main: undefined;
    ImportAlgorithmSet: undefined;
    Add: {
        caseId: number;
        title?: string;
    };
    Test: {
        caseId: number;
    };
    TimeAttackOpening: {
        cases: Case[];
    };
    TimeAttackPlay: {
        cases: Case[];
        options: TimeAttackOptions;
        highScoreKey: string;
    };
    TimeAttackEnd: {
        highScoreKey: string;
        totalTime: number;
        solveCount: number;
        totalCount: number;
        cases: Case[];
        options: TimeAttackOptions;
    };
};
