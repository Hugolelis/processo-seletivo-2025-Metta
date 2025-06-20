import ffmpeg from 'fluent-ffmpeg';
import fs from 'fs';
import path from 'path';

// helper
import { clearOutputDirectory } from './clear-Output-Directory.js';

export async function extractFramesAsync(videoPath, framesDir) {
    clearOutputDirectory(framesDir);

    if (!fs.existsSync(framesDir)) {
        fs.mkdirSync(framesDir, { recursive: true });
    }

    await new Promise((resolve, reject) => {
        ffmpeg(videoPath)
        .outputOptions('-vf', `fps=1`)
        .save(path.join(framesDir, 'frame-%03d.jpg'))
        .on('end', resolve)
        .on('error', reject);
    });
}
