// Get initials from a full name.
export const getInitials = (name: string) => {
    return name
        .split(' ')
        .map((part) => part[0])
        .join('')
        .toUpperCase();
};

// Get Flag emoji from isoAlpha2 country code.
export function isoAlpha2ToFlagEmoji(
    isoAlpha2: string | undefined,
) {
    if (isoAlpha2) {
        const codePoints = isoAlpha2
            .toUpperCase()
            .split('')
            .map(
                (letter) =>
                    0x1f1e6 - 65 + letter.charCodeAt(0),
            );
        return String.fromCodePoint(...codePoints);
    } else {
        return '';
    }
}

// Get ordinal suffix.
export function getOrdinalSuffix(i: number) {
    var j = i % 10,
        k = i % 100;
    if (j === 1 && k !== 11) {
        return 'st';
    }
    if (j === 2 && k !== 12) {
        return 'nd';
    }
    if (j === 3 && k !== 13) {
        return 'rd';
    }
    return 'th';
}
