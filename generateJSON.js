const fs = require('fs');
const path = require('path');

// Base paths
const astrologyPath = path.join(__dirname, 'astrology');
const crystalsPath = path.join(__dirname, 'crystals');

function getFiles(folder) {
  return fs.readdirSync(folder).filter(file => file.endsWith('.jpg'));
}

// --- Astrology JSON ---
const astrologyJSON = {
  back: 'astrology/back.jpg',
  body: getFiles(path.join(astrologyPath, 'body')).map(f => f.replace('.jpg','')),
  houses: getFiles(path.join(astrologyPath, 'houses')).map(f => f.replace('.jpg','')),
  signs: getFiles(path.join(astrologyPath, 'sign')).map(f => f.replace('.jpg',''))
};

// --- Crystals JSON ---
const crystalFront = getFiles(path.join(crystalsPath, 'front'));
const crystalText = getFiles(path.join(crystalsPath, 'text'));

const crystalsJSON = crystalFront.map(frontFile => {
  const name = frontFile.replace('-front.jpg','');
  const textFile = crystalText.find(f => f.includes(name));
  return {
    name,
    front: `crystals/front/${frontFile}`,
    text: `crystals/text/${textFile}`
  };
});

// --- Full JSON ---
const fullJSON = {
  astrology: astrologyJSON,
  crystals: crystalsJSON
};

// Write to data.json
fs.writeFileSync('data.json', JSON.stringify(fullJSON, null, 2));
console.log('✅ data.json generated successfully!');
