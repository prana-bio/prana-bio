import fs from 'fs';
import path from 'path';
import { faker } from '@faker-js/faker';

import { labels, statuses, kingdoms } from './data';

const taxons = Array.from({ length: 100 }, () => ({
    id: `TAXON-${faker.number.int({
        min: 1000,
        max: 9999,
    })}`,
    title: faker.hacker
        .phrase()
        .replace(/^./, (letter: any) =>
            letter.toUpperCase(),
        ),
    kingdom: faker.helpers.arrayElement(kingdoms).value,
    label: faker.helpers.arrayElement(labels).value,
    status: faker.helpers.arrayElement(statuses).value,
}));

fs.writeFileSync(
    path.join(__dirname, 'taxons.json'),
    JSON.stringify(taxons, null, 2),
);

console.log('✅ Taxons data generated.');
