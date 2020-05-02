/**
 * Shuffles an array in-place.
 * @param array The array to shuffle.
 */
export function ShuffleArray<T>(array: T[]): void {;
    for (let i: number = array.length - 1; i > 0; i--) {
        let replacementIndex: number = Math.floor(Math.random() * (i + 1));
        let temporaryVar: T = array[i];
        array[i] = array[replacementIndex];
        array[replacementIndex] = temporaryVar;
    }
}
