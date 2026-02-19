const fs = require('fs');
const path = require('path');

const outputBaseName = 'project-export';
const maxFileSizeMB = 4;
const maxFileSizeBytes = maxFileSizeMB * 1024 * 1024;

const excludeDirs = [
    'node_modules',
    'dist',
    '.git',
    '.angular',
    'coverage',
    '.vscode',
    '.idea',
    '.claude'
];

const includeExtensions = [
    '.ts',
    '.html',
    '.css',
    '.scss',
    '.json',
    '.md'
];

const excludeFiles = [
    'package-lock.json',
    'yarn.lock',
    'pnpm-lock.yaml',
    '.gitignore',
    '.editorconfig',
    '.browserslistrc'
];

let currentOutput = '';
let fileCount = 0;
let outputFileIndex = 1;
let outputFiles = [];
let treeOutput = '';

function shouldIncludeFile(fileName, filePath) {
    if (excludeFiles.includes(fileName)) return false;
    const ext = path.extname(fileName);
    return includeExtensions.includes(ext);
}

function generateTree(dir, prefix = '', isLast = true, relativePath = '') {
    const items = fs.readdirSync(dir);
    const filteredItems = items.filter(item => {
        const itemPath = path.join(dir, item);
        const stat = fs.statSync(itemPath);
        if (stat.isDirectory()) {
            return !excludeDirs.includes(item);
        }
        return shouldIncludeFile(item, itemPath);
    });

    filteredItems.forEach((item, index) => {
        const itemPath = path.join(dir, item);
        const relativeItemPath = path.join(relativePath, item);
        const stat = fs.statSync(itemPath);
        const isLastItem = index === filteredItems.length - 1;
        const connector = isLastItem ? '└── ' : '├── ';

        if (stat.isDirectory()) {
            treeOutput += `${prefix}${connector}📁 ${item}/\n`;
            const newPrefix = prefix + (isLastItem ? '    ' : '│   ');
            generateTree(itemPath, newPrefix, isLastItem, relativeItemPath);
        } else {
            treeOutput += `${prefix}${connector}📄 ${item}\n`;
        }
    });
}

function saveCurrentOutput() {
    if (currentOutput.length > 0) {
        const fileName = `${outputBaseName}-${outputFileIndex}.txt`;
        fs.writeFileSync(fileName, currentOutput, 'utf8');
        outputFiles.push({
            name: fileName,
            size: (fs.statSync(fileName).size / 1024 / 1024).toFixed(2)
        });
        outputFileIndex++;
        currentOutput = '';
    }
}

function addFileToOutput(relativeFilePath, content) {
    const fileHeader = `\n${'='.repeat(80)}\n`;
    const fileTitle = `FILE: ${relativeFilePath}\n`;
    const separator = `${'='.repeat(80)}\n\n`;
    const fileContent = content + '\n\n';

    const fullContent = fileHeader + fileTitle + separator + fileContent;
    const contentSize = Buffer.byteLength(fullContent, 'utf8');
    const currentSize = Buffer.byteLength(currentOutput, 'utf8');

    if (currentSize > 0 && (currentSize + contentSize) > maxFileSizeBytes) {
        saveCurrentOutput();
    }

    currentOutput += fullContent;
    fileCount++;
}

function walkDir(dir, relativePath = '') {
    const files = fs.readdirSync(dir);

    files.forEach(file => {
        const filePath = path.join(dir, file);
        const relativeFilePath = path.join(relativePath, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            if (!excludeDirs.includes(file)) {
                walkDir(filePath, relativeFilePath);
            }
        } else {
            if (shouldIncludeFile(file, relativeFilePath)) {
                try {
                    const content = fs.readFileSync(filePath, 'utf8');
                    addFileToOutput(relativeFilePath, content);
                } catch (err) {
                    addFileToOutput(relativeFilePath, `[Error reading file: ${err.message}]`);
                }
            }
        }
    });
}

console.log('🚀 Angular projekt exportálása...\n');

console.log('📁 Mappa struktúra generálása...');
treeOutput = '='.repeat(80) + '\n';
treeOutput += 'PROJECT STRUCTURE\n';
treeOutput += '='.repeat(80) + '\n\n';
treeOutput += '📁 .\n';
generateTree('.', '', true, '');
treeOutput += '\n\n';

currentOutput = treeOutput;

console.log('📄 Fájlok exportálása...');
walkDir('.');

saveCurrentOutput();

console.log(`\n✅ Kész!`);
console.log(`📁 Exportált fájlok száma: ${fileCount}`);
console.log(`📄 Létrehozott output fájlok:\n`);
outputFiles.forEach((file, index) => {
    console.log(`   ${index + 1}. ${file.name} (${file.size} MB)`);
});
console.log(`\n💡 Az első fájl elején található a teljes mappa struktúra!`);
