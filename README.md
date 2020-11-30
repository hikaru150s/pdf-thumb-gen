# PDF Thumbnail Generator

Provides a simple API to generate PDF thumbnail for Node.js

## Install

`npm install pdf-thumb-gen`

## Definition

`async function generateThumbnail(pathOrData: string | Buffer): Promise<Buffer>`

`generateThumbnail` will generate a PNG-based `Buffer` thumbnail.

| Params | Type | Description|
|---|---|---|
| `pathOrData` | `string` or `Buffer` | PDF File, either local file path or `Buffer` containing PDF file

## Usage

### Javascript
```javascript
const { generateThumbnail } = require('pdf-thumb-gen');
const filePath = 'path-to-pdf-file'
// Async / Await or Promises (It's up to you)
const imageResult = await generateThumbnail(filePath);
```
