const fs = require('fs');
const path = require('path');

function getFilesWithPath(dir) {
  // Only .jpg files, return full relative path
  return fs.readdirSync(dir)
    .filter(f => f.toLowerCase().endsWith('.jpg'))
    .map(f => path.join(dir, f).replace(/\\/g, '/')); // ensure forward slashes
}

const data = {
  astrology: {
    body: getFilesWithPath('astrology/body'),
    houses: getFilesWithPath('astrology/houses'),
    signs: getFilesWithPath('astrology/sign')
  },
  crystals: []
};

// Crystals
const crystalFronts = getFilesWithPath('crystals/front');
const crystalTexts = getFilesWithPath('crystals/text');

for (let i = 0; i < crystalFronts.length; i++) {
  data.crystals.push({
    name: path.basename(crystalFronts[i], '-front.jpg'),
    front: crystalFronts[i],
    text: crystalTexts[i]
  });
}

// Write JSON
fs.writeFileSync('data.json', JSON.stringify(data, null, 2));
console.log('data.json regenerated with correct paths!');
