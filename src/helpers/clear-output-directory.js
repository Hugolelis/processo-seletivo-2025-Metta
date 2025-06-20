import fs from 'fs';
import path from 'path'

export function clearOutputDirectory(dirPath) {
    if (fs.existsSync(dirPath)) {
        fs.readdirSync(dirPath).forEach(file => {
            const curPath = path.join(dirPath, file);
            fs.unlinkSync(curPath);          
        });
    }
}