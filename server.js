import express from 'express'
import path from 'path';
import bodyParser from 'body-parser';
import { VideoProcessor } from './src/main.js'; 
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import multer from 'multer';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'src/public')));
app.use('/src/output_results/video_marked', express.static(path.join(__dirname, 'src/output_results/video_marked')));

const upload = multer({ dest: 'uploads/' });

app.post('/process', upload.single('videoFile'), async(req, res) => {
    const cut = req.body.cut;
    const videoPath = req.file ? req.file.path : null;

    if (!videoPath) {
        return res.status(400).json({ success: false, error: 'Nenhum arquivo de vídeo foi enviado.' });
    }

    try {
        const processor = new VideoProcessor(videoPath, cut);
        await processor.run();

        fs.unlink(videoPath, () => {});

        res.json({
        success: true,
        result: {
            history: processor.history,
            alerts: processor.alerts,
            videoUrl: '/src/output_results/video_marked/video_marked.mp4'
        }
        });
    } catch (err) {
        res.status(500).json({ success: false, error: err });
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
}); 