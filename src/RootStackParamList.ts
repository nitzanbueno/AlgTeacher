import { Case } from "./Models";

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
    TimeAttackEnd: {
        highScoreKey: string;
        totalTime: number;
        solveCount: number;
        totalCount: number;
    };
    TimeAttackOpening: {
        cases: Case[];
    };
    TimeAttackPlay: {
        cases: Case[];
        highScoreKey: string;
        shouldRandomlyMirror: boolean;
        shouldRandomlyAUF: boolean;
    };
};
