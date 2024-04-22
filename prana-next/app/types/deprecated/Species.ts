export interface Species {
  speciesKey: number;
  nubKey: number;
  nameKey: number;
  taxonID: string;
  sourceTaxonKey: number;
  kingdom: string;
  kingdomKey: number;
  datasetKey: string;
  constituentKey: string;
  scientificName: string;
  canonicalName: string;
  vernacularName: string;
  nameType: string;
  rank: string;
  origin: string;
  taxonomicStatus: string;
  nomenclaturalStatus: [];
  remarks: string;
  numDescendants: number;
  lastCrawled: string;
  lastInterpreted: string;
  issues: [];
}
