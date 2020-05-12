import ScrambleLib from 'react-native-scramble-lib';

const ROTATION_MAP: any = {
    y: {
        L: 'F',
        R: 'B',
        U: 'U',
        D: 'D',
        B: 'L',
        F: 'R',
        z: 'x',
        y: 'y',
        "x'": 'z',
        "z'": "x'",
        "y'": "y'",
        x: "z'",
        z2: 'x2',
        y2: 'y2',
        x2: 'z2',
    },
    "y'": {
        R: 'F',
        L: 'B',
        U: 'U',
        D: 'D',
        F: 'L',
        B: 'R',
        "z'": 'x',
        y: 'y',
        x: 'z',
        z: "x'",
        "y'": "y'",
        "x'": "z'",
        z2: 'x2',
        y2: 'y2',
        x2: 'z2',
    },
    y2: {
        B: 'F',
        F: 'B',
        U: 'U',
        D: 'D',
        R: 'L',
        L: 'R',
        "x'": 'x',
        y: 'y',
        "z'": 'z',
        x: "x'",
        "y'": "y'",
        z: "z'",
        x2: 'x2',
        y2: 'y2',
        z2: 'z2',
    },
    x: {
        U: 'F',
        D: 'B',
        B: 'U',
        F: 'D',
        L: 'L',
        R: 'R',
        x: 'x',
        "z'": 'y',
        y: 'z',
        "x'": "x'",
        z: "y'",
        "y'": "z'",
        x2: 'x2',
        z2: 'y2',
        y2: 'z2',
    },
    "x'": {
        D: 'F',
        U: 'B',
        F: 'U',
        B: 'D',
        L: 'L',
        R: 'R',
        x: 'x',
        z: 'y',
        "y'": 'z',
        "x'": "x'",
        "z'": "y'",
        y: "z'",
        x2: 'x2',
        z2: 'y2',
        y2: 'z2',
    },
    x2: {
        B: 'F',
        F: 'B',
        D: 'U',
        U: 'D',
        L: 'L',
        R: 'R',
        x: 'x',
        "y'": 'y',
        "z'": 'z',
        "x'": "x'",
        y: "y'",
        z: "z'",
        x2: 'x2',
        y2: 'y2',
        z2: 'z2',
    },
    z: {
        F: 'F',
        B: 'B',
        R: 'U',
        L: 'D',
        U: 'L',
        D: 'R',
        "y'": 'x',
        x: 'y',
        z: 'z',
        y: "x'",
        "x'": "y'",
        "z'": "z'",
        y2: 'x2',
        x2: 'y2',
        z2: 'z2',
    },
    "z'": {
        F: 'F',
        B: 'B',
        L: 'U',
        R: 'D',
        D: 'L',
        U: 'R',
        y: 'x',
        "x'": 'y',
        z: 'z',
        "y'": "x'",
        x: "y'",
        "z'": "z'",
        y2: 'x2',
        x2: 'y2',
    	z2: 'z2',
    },
    z2: {
        F: 'F',
        B: 'B',
        D: 'U',
        U: 'D',
        R: 'L',
        L: 'R',
        "x'": 'x',
        "y'": 'y',
        z: 'z',
        x: "x'",
        y: "y'",
        "z'": "z'",
        x2: 'x2',
        y2: 'y2',
        z2: 'z2',
    },
};

function SanitizeAlgorithm(algorithm: string): string {
    return algorithm
        .replace('r', 'Rw')
        .replace('l', 'Lw')
        .replace('u', 'Uw')
        .replace('d', 'Dw')
        .replace('f', 'Fw')
        .replace('b', 'Bw')
        .replace('X', 'x')
        .replace('Y', 'y')
        .replace('Z', 'z')
        .replace(/[^RULDFBMSEwxyz'2 ]/g, ' ')
        .replace(/([RULDFBMSEwxyz'2 ])(?!['2w])/g, '$1 ')
        .replace(/ +/g, ' ')
        .trim();
}

function ApplyRotation(move: string, rotation: string): string {
    if (move == '') return '';

    // Lowercase moves are rotations
    if (move.toLowerCase() == move) {
        return ROTATION_MAP[rotation][move];
    } else {
        return ROTATION_MAP[rotation][move[0]] + move.substring(1);
    }
}

/**
 * Converts an algorithm to one without M/S/E turns (because that's what tnoodle works with).
 * Also removes cube rotations because those make it more likely to get the algorithm's inverse as the solution.
 * @param {string} algorithm The algorithm to normalize.
 */
function NormalizeAlgorithm(algorithm: string) {
    algorithm = SanitizeAlgorithm(algorithm);
	algorithm = algorithm
        .replace(/M'/g, "R' L x")
        .replace(/M2/g, 'R2 L2 x2')
        .replace(/M/g, "R L' x'")
        .replace(/S'/g, "F B' z'")
        .replace(/S2/g, 'F2 B2 z2')
        .replace(/S/g, "F' B z")
        .replace(/E'/g, "U' D y")
        .replace(/E2/g, 'U2 D2 y2')
        .replace(/E/g, "U D' y'");

    let turns = algorithm.split(/\s+/);

    let result = [];

    for (var i in turns) {
        var turn = turns[i];

        if (turn == '') continue;

        // If the turn is a rotation
        if (turn in ROTATION_MAP) {
            for (var j = parseInt(i) + 1; j < turns.length; j++) {
                turns[j] = ApplyRotation(turns[j], turn);
            }
        } else {
            result.push(turn);
        }
	}

	return result.join(' ');
}

export function GenerateScramble(
    algorithm: string,
    done: (success: boolean, scramble: string) => void,
): string {
    return ScrambleLib.generateScramble(NormalizeAlgorithm(algorithm), done);
}
