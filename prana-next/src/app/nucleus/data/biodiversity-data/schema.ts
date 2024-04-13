import { z } from 'zod';

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
// export const taxonSchema = z.object({
//     id: z.string(),
//     title: z.string(),
//     kingdom: z.string(),
//     label: z.string(),
//     status: z.string(),
// });

// export type Taxon = z.infer<typeof taxonSchema>;

export const countrySpeciesSchema = z.object({
    countryId: z.string().optional(),
    isoAlpha3: z.string(),
    countryName: z.string(),
    countryHabitatRangeArea: z.number(),
    countryHabitatRangeAreaPct: z.number(),
    IUCNCategoryId: z.string(),
    IUCNCategoryName: z.string(),
    IUCNCategoryAbbreviation: z.string(),
    speciesId: z.string(),
    speciesCommonName: z.string(),
    speciesBinomialName: z.string(),
    speciesGroup: z.string(),
    totalHabitatRangeArea: z.number(),
    smallHabitatRangeArea: z.number(),
});

export type CountrySpecies = z.infer<
    typeof countrySpeciesSchema
>;
