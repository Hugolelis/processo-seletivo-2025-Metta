import ffmpeg from 'fluent-ffmpeg';
import path from 'path';

export async function createVideoMarked(markedFramesDir, outputVideoPath, videoPath) {
    return new Promise((resolve, reject) => {
        ffmpeg()
        .input(path.join(markedFramesDir, 'frame-%03d.jpg')) 
        .inputFPS(1)                                         
        .outputOptions(['-c:v', 'libx264', '-pix_fmt', 'yuv420p'])   
        .save(outputVideoPath)
        .on('end', () => {
            console.log('Vídeo final criado em:', outputVideoPath);
            resolve();
        })
        .on('error', (err) => {
            console.error('Erro ao criar vídeo:', err);
            reject(err);
        });
    });
}