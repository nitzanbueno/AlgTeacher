/**
 * Returns a shuffling of an array.
 * @param array The array to shuffle.
 */
export function ShuffleArray<T>(array: T[]): T[] {;
    let result = array.slice();
    for (let i: number = result.length - 1; i > 0; i--) {
        let replacementIndex: number = Math.floor(Math.random() * (i + 1));
        let temporaryVar: T = result[i];
        result[i] = result[replacementIndex];
        result[replacementIndex] = temporaryVar;
    }

    return result;
}
