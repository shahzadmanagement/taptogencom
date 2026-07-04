const fs = require('fs');
const path = require('path');

function fixImports(dir) {
  fs.readdirSync(dir).forEach(f => {
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) {
      fixImports(p);
    } else if (f.endsWith('.astro')) {
      let content = fs.readFileSync(p, 'utf8');
      // Fix all relative imports to src/data and src/config to use @/ alias
      content = content.replace(/from\s+['"]\.\.\/\.\.\/data\//g, "from '@/data/");
      content = content.replace(/from\s+['"]\.\.\/data\//g, "from '@/data/");
      content = content.replace(/from\s+['"]\.\.\/\.\.\/config\//g, "from '@/config/");
      content = content.replace(/from\s+['"]\.\.\/config\//g, "from '@/config/");
      fs.writeFileSync(p, content);
    }
  });
}

fixImports(path.join(__dirname, 'src', 'pages'));
console.log('Done fixing all imports');
