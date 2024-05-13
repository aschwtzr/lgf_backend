import express from 'express'
import { Worker } from 'worker_threads'
import cors from 'cors'

const app = express()
app.use(express.json());
app.use(cors({ origin: '*' }));
app.use(express.urlencoded({ extended: true }));
const port = 3000

const API_URL = 'https://lkg-proxy-service.vercel.app/api/meter'

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/reading', async function (req, res) {
  console.log('Requesting reading', req.body)
  console.log(req.ip)
  const worker = new Worker("./readingWorker.js", {
    workerData: {
      API_URL: API_URL,
      READ_TYPE: req.body.read
    }
  });
  worker.on("message", data => {
    console.log('Received reading', data)
    res.send(data)
 })
 worker.on("error", error => {
   console.log('error', error)
   res.send({"error": error})
})
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})