const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'src', 'pages');
const componentsPath = path.join(__dirname, 'src', 'components');

const classMappings = {
  // Backgrounds
  'bg-[#0B0F17]': 'bg-gray-50 dark:bg-[#0B0F17]',
  'bg-[#090D14]': 'bg-white dark:bg-[#090D14]',
  'bg-[#161b26]': 'bg-white dark:bg-[#161b26]',
  'bg-[#0f131c]': 'bg-gray-50 dark:bg-[#0f131c]',
  'bg-[#1d2433]': 'bg-gray-100 dark:bg-[#1d2433]',
  'bg-[#1e2533]': 'bg-gray-100 dark:bg-[#1e2533]',
  'bg-[#1e293b]': 'bg-gray-100 dark:bg-[#1e293b]',
  'bg-[#0D111A]': 'bg-gray-50 dark:bg-[#0D111A]',
  
  // Text
  'text-white': 'text-slate-900 dark:text-white',
  'text-slate-200': 'text-slate-900 dark:text-slate-200',
  'text-slate-300': 'text-slate-800 dark:text-slate-300',
  'text-slate-400': 'text-slate-600 dark:text-slate-400',
  'text-slate-500': 'text-slate-500 dark:text-slate-500', // Just in case
  'text-gray-200': 'text-gray-900 dark:text-gray-200',
  'text-gray-300': 'text-gray-800 dark:text-gray-300',
  'text-gray-400': 'text-gray-600 dark:text-gray-400',
  
  // Borders
  'border-gray-800': 'border-gray-200 dark:border-gray-800',
  'border-[#222938]': 'border-gray-200 dark:border-[#222938]',
  'border-[#1e2533]': 'border-gray-200 dark:border-[#1e2533]',
  'border-[#1e293b]': 'border-gray-200 dark:border-[#1e293b]'
};

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;
  
  // Avoid double replacing if dark: is already present
  for (const [darkClass, combinedClass] of Object.entries(classMappings)) {
    // Regex matches the darkClass avoiding 'dark:' prefix, and bounded by spaces or quotes.
    const escapedClass = darkClass.replace(/\[/g, '\\[').replace(/\]/g, '\\]');
    const regex = new RegExp(`(?<!dark:)(?<=^|[\\s"'\\\`])${escapedClass}(?=$|[\\s"'\\\`])`, 'g');
    content = content.replace(regex, combinedClass);
  }
  
  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated: ${filePath}`);
  }
}

function walkDir(dir) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walkDir(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      processFile(fullPath);
    }
  }
}

walkDir(directoryPath);
walkDir(componentsPath);
console.log("Done adding dark mode classes!");
