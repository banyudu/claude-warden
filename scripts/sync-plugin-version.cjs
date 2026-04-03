const fs = require('fs');
const { version } = require('../package.json');

const files = [
  '.claude-plugin/plugin.json',
  '.claude-plugin/marketplace.json',
];

for (const file of files) {
  const json = JSON.parse(fs.readFileSync(file, 'utf8'));
  if (json.plugins) {
    json.plugins[0].version = version;
  } else {
    json.version = version;
  }
  fs.writeFileSync(file, JSON.stringify(json, null, 2) + '\n');
}
