import * as cocoSsd from '@tensorflow-models/coco-ssd'
import * as tf from '@tensorflow/tfjs'

import { createCanvas, loadImage } from 'canvas'
import sharp from 'sharp'

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

// helpers
import { clearOutputDirectory } from './helpers/clear-Output-Directory.js'
import { extractFramesAsync } from './helpers/extract-frames-async.js'
import { writeJson } from './helpers/write-json.js'
import { createVideoMarked } from './helpers/create-video-marked.js'

async function main(videoPath, Cut) {
    console.log('Iniciando o processo.')

    const __filename = fileURLToPath(import.meta.url)
    const __dirname = path.dirname(__filename)

    const framesDir = path.join(__dirname, '..', 'src', 'output', 'frames')
    const markedFramesDir = path.join(__dirname, '..', 'src', 'output', 'frames_marked')
    const videoDir = path.join(__dirname, '..', 'src', 'output', 'video_marked', 'video_marked.mp4')

    const alertsDir = path.join(__dirname, '..', 'src', 'output')
    const historyDir = path.join(__dirname, '..', 'src', 'output')

    const alerts = []
    const history = []

    // reset
    await writeJson(history, historyDir, 'history.json')
    await writeJson(alerts, alertsDir, 'alert.json')

    fs.unlink(videoDir, (err) => { });

    clearOutputDirectory(framesDir)
    clearOutputDirectory(markedFramesDir)

    await extractFramesAsync(videoPath, framesDir)

    fs.mkdirSync(markedFramesDir, { recursive: true })

    const model = await cocoSsd.load() // carregando o modelo

    const files = fs.readdirSync(framesDir).filter(f => f.endsWith('.jpg'))

    for(const file of files) {
        const imgPath = path.join(framesDir, file)
        const processedImgPath = path.join(framesDir, 'processed-' + file)


        const processedImage = sharp(imgPath).resize(960, 540, { fit: 'inside' })

        const metadata = await processedImage.metadata()

        // Ajusta para pares
        let width = metadata.width
        let height = metadata.height
        if (width % 2 !== 0) width -= 1
        if (height % 2 !== 0) height -= 1

        await processedImage
            .resize(width, height) 
            .sharpen()
            .modulate({
                brightness: 1.15,
                contrast: 1.3,
                saturation: 1.2
            })
            .normalize()
            .median(3)
            .toFile(processedImgPath)

        const img = await loadImage(processedImgPath)

        const canvas = createCanvas(img.width, img.height)
        const ctx = canvas.getContext('2d')
        ctx.drawImage(img, 0, 0)
        const tensor = tf.browser.fromPixels(canvas)

        const predictions = await model.detect(tensor)

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

        const peoplePredictions = predictions.filter(p => p.class === 'person')
        const peopleCount = peoplePredictions.length
        const totalScore = peoplePredictions.reduce((acc, p) => acc + p.score, 0)
        const sucessMargin = peopleCount > 0 ? `${((totalScore / peopleCount) * 100).toFixed(2)}%` : 'N/A'

        alerts.push({ file: file, peopleCount: peopleCount, sucessMargin: sucessMargin })

        if(peopleCount > Cut) {
            history.push({ file: file, peopleCount: peopleCount, sucessMargin: sucessMargin })
        }

        const outPath = path.join(markedFramesDir, file)
        const outStream = fs.createWriteStream(outPath)

        const stream = canvas.createJPEGStream({
            quality: 1.0,
            chromaSubsampling: false
            })
            await new Promise((res) => {
            stream.pipe(outStream)
            outStream.on('finish', res)
        })

        tensor.dispose()

        fs.unlinkSync(processedImgPath)
    }

    await writeJson(history, historyDir, 'history.json')
    await writeJson(alerts, alertsDir, 'alert.json')

    await createVideoMarked(markedFramesDir, videoDir, videoPath)

    console.log('Outputs concluidos.')
}

const videoPath = 'C:/Users/hugod/Downloads/people-walking.mp4'

main(videoPath, 2).catch(console.error)