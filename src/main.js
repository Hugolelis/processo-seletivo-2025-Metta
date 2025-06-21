// src/VideoProcessor.js
import * as cocoSsd from '@tensorflow-models/coco-ssd'
import * as tf from '@tensorflow/tfjs'
import { createCanvas, loadImage } from 'canvas'
import sharp from 'sharp'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

import { clearOutputDirectory } from './helpers/clear-Output-Directory.js'
import { extractFramesAsync } from './helpers/extract-frames-async.js'
import { writeJson } from './helpers/write-json.js'
import { createVideoMarked } from './helpers/create-video-marked.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export class VideoProcessor {
    constructor(videoPath, cut) {
        this.videoPath = videoPath
        this.cut = cut

        this.framesDir = path.join(__dirname, '..', 'src', 'output', 'frames')
        this.markedFramesDir = path.join(__dirname, '..', 'src', 'output', 'frames_marked')
        this.videoDir = path.join(__dirname, '..', 'src', 'output', 'video_marked', 'video_marked.mp4')

        this.alertsDir = path.join(__dirname, '..', 'src', 'output')
        this.historyDir = path.join(__dirname, '..', 'src', 'output')

        this.alerts = []
        this.history = []
    }

    async resetOutputs() {
        await writeJson(this.history, this.historyDir, 'history.json')
        await writeJson(this.alerts, this.alertsDir, 'alert.json')

        fs.unlink(this.videoDir, () => {})

        await clearOutputDirectory(this.framesDir)
        await clearOutputDirectory(this.markedFramesDir)
        fs.mkdirSync(this.markedFramesDir, { recursive: true })
    }

    async preprocessImage(inputPath, outputPath) {
        const processedImage = sharp(inputPath).resize(960, 540, { fit: 'inside' })
        const metadata = await processedImage.metadata()

        let width = metadata.width
        let height = metadata.height
        if (width % 2 !== 0) width -= 1
        if (height % 2 !== 0) height -= 1

        await processedImage
        .resize(width, height)
        .sharpen()
        .modulate({ brightness: 1.15, contrast: 1.3, saturation: 1.2 })
        .normalize()
        .median(3)
        .toFile(outputPath)
    }

    drawPredictions(ctx, predictions) {
        ctx.strokeStyle = 'red'
        ctx.lineWidth = 4
        ctx.font = '20px Arial'
        ctx.fillStyle = 'red'

        predictions.forEach(prediction => {
        if (prediction.class === 'person') {
            const [x, y, width, height] = prediction.bbox
            ctx.strokeRect(x, y, width, height)
            ctx.fillText('Pessoa', x, y > 20 ? y - 5 : y + 20)
        }
        })
    }

    async processFrames() {
        const files = fs.readdirSync(this.framesDir).filter(f => f.endsWith('.jpg'))
        const model = await cocoSsd.load()

        for (const file of files) {
            const imgPath = path.join(this.framesDir, file)
            const processedImgPath = path.join(this.framesDir, 'processed-' + file)

            await this.preprocessImage(imgPath, processedImgPath)

            const img = await loadImage(processedImgPath)
            const canvas = createCanvas(img.width, img.height)
            const ctx = canvas.getContext('2d')
            ctx.drawImage(img, 0, 0)

            const tensor = tf.browser.fromPixels(canvas)
            const predictions = await model.detect(tensor)

            this.drawPredictions(ctx, predictions)

            const peoplePredictions = predictions.filter(p => p.class === 'person')
            const peopleCount = peoplePredictions.length
            const totalScore = peoplePredictions.reduce((acc, p) => acc + p.score, 0)
            const sucessMargin = peopleCount > 0 ? `${((totalScore / peopleCount) * 100).toFixed(2)}%` : 'N/A'

            this.alerts.push({ file, peopleCount, sucessMargin })

            if (peopleCount > this.cut) {
                this.history.push({ file, peopleCount, sucessMargin })
            }

            await this.saveMarkedFrame(canvas, file)
            tensor.dispose()
            fs.unlinkSync(processedImgPath)
        }
    }

    async saveMarkedFrame(canvas, fileName) {
        const outPath = path.join(this.markedFramesDir, fileName)
        const outStream = fs.createWriteStream(outPath)
        const stream = canvas.createJPEGStream({ quality: 1.0, chromaSubsampling: false })

        await new Promise(resolve => {
        stream.pipe(outStream)
        outStream.on('finish', resolve)
        })
    }

    async generateOutputVideo() {
        await createVideoMarked(this.markedFramesDir, this.videoDir)
    }

    async run() {
        console.log('Iniciando o processo...')
        await this.resetOutputs()
        await extractFramesAsync(this.videoPath, this.framesDir)
        await this.processFrames()
        await writeJson(this.history, this.historyDir, 'history.json')
        await writeJson(this.alerts, this.alertsDir, 'alert.json')
        await this.generateOutputVideo()
        console.log('Outputs concluídos.')
    }
}

const videoPath = 'C:/Users/hugod/Downloads/people-walking.mp4'

const processor = new VideoProcessor(videoPath, 2)
await processor.run()