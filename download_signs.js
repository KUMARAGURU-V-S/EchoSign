const fs = require('fs');
const https = require('https');

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');

async function download() {
  let content = "export const SIGN_DATA = [\n";
  for (const letter of letters) {
    const url = `https://upload.wikimedia.org/wikipedia/commons/thumb/${getHash(letter)}/Sign_language_${letter}.svg/200px-Sign_language_${letter}.svg.png`;
    try {
      const base64 = await fetchImage(url);
      content += `  { word: "Letter ${letter}", letter: "${letter}", imageBase64: "data:image/png;base64,${base64}" },\n`;
      console.log('Downloaded', letter);
    } catch(e) {
      console.log('Failed', letter, url);
    }
  }
  content += "];\n";
  fs.writeFileSync('src/data/signs.ts', content);
  console.log('Saved signs.ts');
}

function getHash(letter) {
  // Wikimedia paths are notoriously annoying because of the MD5 hash of the filename.
  // Instead of guessing, I'll just use a small predefined set of words with known URLs.
}
