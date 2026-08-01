import fs from 'fs';
import path from 'path';

function createMinimalPng(width: number, height: number, isMaskable: boolean): Buffer {
  // Use resvg / standard valid 1x1 base PNG expanded or clean PNG structure
  const PNG_HEADER = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  
  // Clean valid IHDR chunk
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 6; // RGBA
  ihdr[10] = 0; // deflate
  ihdr[11] = 0; // filter
  ihdr[12] = 0; // interlace
  const ihdrChunk = makeChunk('IHDR', ihdr);

  // Pixel data for width x height
  const rowSize = 1 + width * 4;
  const imgData = Buffer.alloc(height * rowSize);
  
  const bgR = 15, bgG = 23, bgB = 42; // #0f172a
  const accentR = 99, accentG = 102, accentB = 241; // #6366f1

  for (let y = 0; y < height; y++) {
    const rowStart = y * rowSize;
    imgData[rowStart] = 0; // filter type 0
    for (let x = 0; x < width; x++) {
      const idx = rowStart + 1 + x * 4;
      const dx = x - width / 2;
      const dy = y - height / 2;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < width * 0.2) {
        imgData[idx] = accentR;
        imgData[idx + 1] = accentG;
        imgData[idx + 2] = accentB;
        imgData[idx + 3] = 255;
      } else {
        imgData[idx] = bgR;
        imgData[idx + 1] = bgG;
        imgData[idx + 2] = bgB;
        imgData[idx + 3] = 255;
      }
    }
  }

  // ZLIB Store (Uncompressed)
  const zlibBlocks: Buffer[] = [];
  const maxChunk = 65535;
  let pos = 0;
  while (pos < imgData.length) {
    const end = Math.min(pos + maxChunk, imgData.length);
    const slice = imgData.subarray(pos, end);
    const isLast = end === imgData.length;
    const header = Buffer.alloc(5);
    header[0] = isLast ? 1 : 0;
    header.writeUInt16LE(slice.length, 1);
    header.writeUInt16LE(slice.length ^ 0xffff, 3);
    zlibBlocks.push(header, slice);
    pos = end;
  }

  // Adler-32
  let s1 = 1, s2 = 0;
  for (let i = 0; i < imgData.length; i++) {
    s1 = (s1 + imgData[i]) % 65521;
    s2 = (s2 + s1) % 65521;
  }
  const adlerVal = ((s2 >>> 0) * 65536 + (s1 >>> 0)) >>> 0;
  const adlerBuf = Buffer.alloc(4);
  adlerBuf.writeUInt32BE(adlerVal, 0);

  const zlibStream = Buffer.concat([Buffer.from([0x78, 0x01]), ...zlibBlocks, adlerBuf]);
  const idatChunk = makeChunk('IDAT', zlibStream);
  const iendChunk = makeChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([PNG_HEADER, ihdrChunk, idatChunk, iendChunk]);
}

const crcTable = new Uint32Array(256);
for (let n = 0; n < 256; n++) {
  let c = n;
  for (let k = 0; k < 8; k++) {
    c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  }
  crcTable[n] = c >>> 0;
}

function makeChunk(type: string, data: Buffer): Buffer {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const typeBuf = Buffer.from(type, 'ascii');
  const payload = Buffer.concat([typeBuf, data]);

  let crc = 0xffffffff;
  for (let i = 0; i < payload.length; i++) {
    crc = crcTable[(crc ^ payload[i]) & 0xff] ^ (crc >>> 8);
  }
  crc = (crc ^ 0xffffffff) >>> 0;

  const crcBuf = Buffer.alloc(4);
  crcBuf.writeUInt32BE(crc, 0);

  return Buffer.concat([len, payload, crcBuf]);
}

const iconsDir = path.join(process.cwd(), 'public', 'icons');
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

fs.writeFileSync(path.join(iconsDir, 'icon-192x192.png'), createMinimalPng(192, 192, false));
fs.writeFileSync(path.join(iconsDir, 'icon-512x512.png'), createMinimalPng(512, 512, false));
fs.writeFileSync(path.join(iconsDir, 'maskable-icon-192x192.png'), createMinimalPng(192, 192, true));
fs.writeFileSync(path.join(iconsDir, 'maskable-icon-512x512.png'), createMinimalPng(512, 512, true));

console.log('✓ Successfully created 4 PNG icons in public/icons/');
