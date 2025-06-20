import fs from 'fs/promises';
import path from 'path';

export async function writeJson(data, outputDir, filename) {
    const jsonPath = path.join(outputDir, filename);
    const jsonString = JSON.stringify(data, null, 2);

    await fs.writeFile(jsonPath, jsonString, 'utf-8');
}
