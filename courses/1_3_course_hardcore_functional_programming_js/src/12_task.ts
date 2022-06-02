// import { Task } from 'types';
// import * as fs from 'fs';
// import * as path from 'path';

const { Task } = require('./types');
const fs = require('fs');
const path = require('path');

// Declarative
// ============================================================
const declarativeApp = () => {
  fs.readFile(path.resolve(__dirname, 'config.json'), 'utf-8', (err, data) => {
    if (err) throw err;

    const newData = data.replace(/3/g, '6');

    fs.writeFile(path.resolve(__dirname, 'config1.json'), newData, (err) => {
      if (err) throw err;

      console.log('success!');
    });
  });
};

declarativeApp();

// Functional
// ============================================================

const readFile = (filePath: string, encoding: string) =>
  Task((reject, resolve) =>
    fs.readFile(filePath, encoding, (err, data) =>
      err ? reject(err) : resolve(data)
    )
  );

const writeFile = (filePath: string, data: string) =>
  Task((reject, resolve) =>
    fs.writeFile(filePath, data, (err) => (err ? reject(err) : resolve()))
  );

const functionalApp = () =>
  readFile(path.resolve(__dirname, 'config.json'), 'utf-8')
    .map((data) => data.replace(/3/g, '7'))
    .chain((data) => writeFile(path.resolve(__dirname, 'config2.json'), data));

functionalApp().fork(console.error, () => console.log('success!'));
