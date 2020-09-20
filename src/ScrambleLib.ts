import ScrambleLib from "react-native-scramble-lib";

const ROTATION_MAP: any = {
    y: {
        L: "F",
        R: "B",
        U: "U",
        D: "D",
        B: "L",
        F: "R",
        z: "x",
        y: "y",
        "x'": "z",
        "z'": "x'",
        "y'": "y'",
        x: "z'",
        z2: "x2",
        y2: "y2",
        x2: "z2",
    },
    "y'": {
        R: "F",
        L: "B",
        U: "U",
        D: "D",
        F: "L",
        B: "R",
        "z'": "x",
        y: "y",
        x: "z",
        z: "x'",
        "y'": "y'",
        "x'": "z'",
        z2: "x2",
        y2: "y2",
        x2: "z2",
    },
    y2: {
        B: "F",
        F: "B",
        U: "U",
        D: "D",
        R: "L",
        L: "R",
        "x'": "x",
        y: "y",
        "z'": "z",
        x: "x'",
        "y'": "y'",
        z: "z'",
        x2: "x2",
        y2: "y2",
        z2: "z2",
    },
    x: {
        U: "F",
        D: "B",
        B: "U",
        F: "D",
        L: "L",
        R: "R",
        x: "x",
        "z'": "y",
        y: "z",
        "x'": "x'",
        z: "y'",
        "y'": "z'",
        x2: "x2",
        z2: "y2",
        y2: "z2",
    },
    "x'": {
        D: "F",
        U: "B",
        F: "U",
        B: "D",
        L: "L",
        R: "R",
        x: "x",
        z: "y",
        "y'": "z",
        "x'": "x'",
        "z'": "y'",
        y: "z'",
        x2: "x2",
        z2: "y2",
        y2: "z2",
    },
    x2: {
        B: "F",
        F: "B",
        D: "U",
        U: "D",
        L: "L",
        R: "R",
        x: "x",
        "y'": "y",
        "z'": "z",
        "x'": "x'",
        y: "y'",
        z: "z'",
        x2: "x2",
        y2: "y2",
        z2: "z2",
    },
    z: {
        F: "F",
        B: "B",
        R: "U",
        L: "D",
        U: "L",
        D: "R",
        "y'": "x",
        x: "y",
        z: "z",
        y: "x'",
        "x'": "y'",
        "z'": "z'",
        y2: "x2",
        x2: "y2",
        z2: "z2",
    },
    "z'": {
        F: "F",
        B: "B",
        L: "U",
        R: "D",
        D: "L",
        U: "R",
        y: "x",
        "x'": "y",
        z: "z",
        "y'": "x'",
        x: "y'",
        "z'": "z'",
        y2: "x2",
        x2: "y2",
        z2: "z2",
    },
    z2: {
        F: "F",
        B: "B",
        D: "U",
        U: "D",
        R: "L",
        L: "R",
        "x'": "x",
        "y'": "y",
        z: "z",
        x: "x'",
        y: "y'",
        "z'": "z'",
        x2: "x2",
        y2: "y2",
        z2: "z2",
    },
};

function SanitizeAlgorithm(algorithm: string): string {
    return (
        algorithm
            .replace(/r/g, "Rw")
            .replace(/l/g, "Lw")
            .replace(/u/g, "Uw")
            .replace(/d/g, "Dw")
            .replace(/f/g, "Fw")
            .replace(/b/g, "Bw")
            .replace(/X/g, "x")
            .replace(/Y/g, "y")
            .replace(/Z/g, "z")
            .replace(/[^RULDFBMSEwxyz'2 ]/g, " ")
            .replace(/2'/g, "2")
            .replace(/([RULDFBMSEwxyz'2 ])(?!['2w])/g, "$1 ")
            .replace(/ +/g, " ")
            .trim()
    );
}

function ApplyRotation(move: string, rotation: string): string {
    if (move == "") return "";

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
        .replace(/M2/g, "R2 L2 x2")
        .replace(/M/g, "R L' x'")
        .replace(/S'/g, "F B' z'")
        .replace(/S2/g, "F2 B2 z2")
        .replace(/S/g, "F' B z")
        .replace(/E'/g, "U' D y")
        .replace(/E2/g, "U2 D2 y2")
        .replace(/E/g, "U D' y'")
        .replace(/Rw'/g, "L' x'")
        .replace(/Rw2/g, "L2 x2")
        .replace(/Rw/g, "L x")
        .replace(/Lw'/g, "R' x")
        .replace(/Lw2/g, "R2 x2")
        .replace(/Lw/g, "R x'")
        .replace(/Uw'/g, "D' y'")
        .replace(/Uw2/g, "D2 y2")
        .replace(/Uw/g, "D y")
        .replace(/Dw'/g, "U' y")
        .replace(/Dw2/g, "U2 y2")
        .replace(/Dw/g, "U y'")
        .replace(/Fw'/g, "B' z'")
        .replace(/Fw2/g, "B2 z2")
        .replace(/Fw/g, "B z")
        .replace(/Bw'/g, "F' z")
        .replace(/Bw2/g, "F2 z2")
        .replace(/Bw/g, "F z'");

    let turns = algorithm.split(/\s+/);

    let result = [];

    for (var i in turns) {
        var turn = turns[i];

        if (turn == "") continue;

        // If the turn is a rotation
        if (turn in ROTATION_MAP) {
            for (var j = parseInt(i) + 1; j < turns.length; j++) {
                turns[j] = ApplyRotation(turns[j], turn);
            }
        } else {
            result.push(turn);
        }
    }

    return result.join(" ");
}

/**
 * Inverts an algorithm.
 * @param algorithm The algorithm to invert.
 */
export function InvertAlgorithm(algorithm: string): string {
    const moves = SanitizeAlgorithm(algorithm).split(" ");
    const invertedMoves = [];

    for (const move of moves) {
        let invertedMove = "";

        if (move.endsWith("2")) {
            // Inverted 2 moves are the same as the normal move
            invertedMove = move;
        } else if (move.endsWith("'")) {
            // Remove the ' from the move
            invertedMove = move.substring(0, move.length - 1);
        } else {
            // The move is a normal move so we just add a '
            invertedMove = move + "'";
        }

        // Add the move in reverse order
        invertedMoves.unshift(invertedMove);
    }

    return invertedMoves.join(" ");
}

/**
 * Returns the mirror of the given algorithm along the M-slice.
 * @param algorithm The algorithm to mirror.
 */
export function MirrorAlgorithm(algorithm: string) {
    // TODO: I'm not entirely sure cube rotations work properly with this implementation.
    // This doesn't come up often and it works in one case I've checked (with a y) but I haven't covered all edge-cases (such as z).
    const moves = SanitizeAlgorithm(algorithm).split(" ");
    const mirroredMoves = [];

    for (const move of moves) {
        // All moves are inverted except M and x moves, and R and L moves switch sides
        let mirroredMove = InvertAlgorithm(move);

        if (move.startsWith("Rw")) {
            mirroredMove = "Lw" + mirroredMove.substring(2);
        } else if (move.startsWith("Lw")) {
            mirroredMove = "Rw" + mirroredMove.substring(2);
        } else if (move.startsWith("R")) {
            mirroredMove = "L" + mirroredMove.substring(1);
        } else if (move.startsWith("L")) {
            mirroredMove = "R" + mirroredMove.substring(1);
        } else if (move.startsWith("M") || move.startsWith("x")) {
            mirroredMove = move;
        }

        mirroredMoves.push(mirroredMove);
    }

    return mirroredMoves.join(" ");
}

export function GenerateScrambleAsync(algorithm: string): Promise<string> {
    const normalizedAlgorithm = NormalizeAlgorithm(algorithm);

    if (normalizedAlgorithm === "") {
        return Promise.resolve("");
    }

    return new Promise((resolve, reject) => {
        ScrambleLib.generateScramble(normalizedAlgorithm, (success, scramble) => {
            if (success) resolve(scramble);
            else reject();
        });
    });
}
