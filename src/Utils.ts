function zeroPad(num: string, size: number) {
    const integerPart = num.split('.')[0];

    if (integerPart.length >= size) return num;

    let leadingZeros = '';

    for (let i = 0; i < size - integerPart.length; i++) {
        leadingZeros += '0';
    }

    return leadingZeros + num;
}

export function GetTimeText(timeAmount: number) {
    const seconds = (Math.floor(timeAmount / 10) / 100) % 60;
    const minutes = Math.floor(timeAmount / 60000);

    return `${minutes}:${zeroPad(seconds.toFixed(2), 2)}`;
}

export function HashCode(s: string) {
    let hash = 0,
        i,
        chr;

    for (i = 0; i < s.length; i++) {
        chr = s.charCodeAt(i);
        hash = (hash << 5) - hash + chr;
        hash |= 0; // Convert to 32bit integer
    }

    return hash;
}

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
