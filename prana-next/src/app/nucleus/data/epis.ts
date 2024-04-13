export const placeholderEPIs = new Array(6)
    .fill({})
    .map((_, index) => ({
        name: '',
        country_name: '',
        description: '',
        abbreviation: '',
        score: 0,
        rank: 0,
        change: 0,
    }));
