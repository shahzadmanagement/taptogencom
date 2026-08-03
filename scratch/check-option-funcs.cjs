const fs = require('fs');
const content = fs.readFileSync('src/scripts/tool-workspace.ts', 'utf8');

const matches = content.match(/function [a-zA-Z0-9_]*option[a-zA-Z0-9_]*/gi) || [];
console.log('Option functions:', [...new Set(matches)]);

const checkMatches = content.match(/[a-zA-Z0-9_]*Checked[a-zA-Z0-9_]*/gi) || [];
console.log('Checked functions:', [...new Set(checkMatches)]);
