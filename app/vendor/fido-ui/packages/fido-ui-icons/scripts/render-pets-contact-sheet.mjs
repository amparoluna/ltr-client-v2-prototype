import { writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import * as PetsIcons from '../dist/esm/pets/index.js';

const output = process.argv[2];

if (!output) {
  throw new Error('Pass an output HTML path');
}

const rows = [
  [
    'PawPrintBoldIcon',
    'PawPrintIcon',
    'DogIcon',
    'CatIcon',
    'RabbitIcon',
    'BirdIcon',
    'FishIcon',
    'RodentIcon',
    'ReptileIcon',
    'FerretIcon',
    'HorseIcon',
    'ClipboardIcon',
    'NoPetsIcon',
    'BanIcon',
  ],
  [
    'HomeIcon',
    'VaccinationProtectionIcon',
    'CrossHealthIcon',
    'StethoscopeIcon',
    'BoneIcon',
    'PillIcon',
    'SelectorIcon',
    'PatternIcon',
    'ServiceIcon',
    'SpayedIcon',
    'NotSpayedIcon',
    'ScissorsIcon',
    'PaletteIcon',
    'ColorSwatchIcon',
  ],
  ['ColorSwatchBoldIcon'],
];

const icons = rows.flatMap((row, rowIndex) =>
  row.map((name, columnIndex) =>
    createElement(PetsIcons[name], {
      key: name,
      style: {
        position: 'absolute',
        left: 50 + columnIndex * 74,
        top: 50 + rowIndex * 74,
        width: 24,
        height: 24,
      },
    }),
  ),
);

const sheet = renderToStaticMarkup(
  createElement(
    'main',
    {
      style: {
        position: 'relative',
        width: 1138,
        height: 272,
        color: '#404040',
        background: '#ffffff',
      },
    },
    icons,
  ),
);

const html = `<!doctype html><html><head><meta charset="utf-8"><style>*{box-sizing:border-box}html,body{margin:0;width:1138px;height:272px;overflow:hidden}</style></head><body>${sheet}</body></html>`;
await writeFile(resolve(output), html);
