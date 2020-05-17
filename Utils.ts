function zeroPad(num: string, size: number) {
    const integerPart = num.split('.')[0];

    if (integerPart.length >= size) return num;

    let leadingZeros = '';

    for (let i = 0; i < size - integerPart.length; i++) {
        leadingZeros += '0';
    }

    return leadingZeros + num;
}

export function getTimeText(timeAmount: number) {
    const seconds = (Math.floor(timeAmount / 10) / 100) % 60;
    const minutes = Math.floor(timeAmount / 60000);

    return `${minutes}:${zeroPad(seconds.toFixed(2), 2)}`;
}

export function hashCode(s: string) {
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
