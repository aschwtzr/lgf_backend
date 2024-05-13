
import {parentPort, workerData} from "worker_threads"

const fetchMeterReading = async () => {
  return await fetch(workerData.API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      read: workerData.READ_TYPE,
    }),
  })
}
const meterReading = await fetchMeterReading().then(response => response.json()).catch(error => {
  console.log('error', error)
  return { 'error': error }
})
console.log('response JSON', meterReading)
parentPort.postMessage(meterReading)