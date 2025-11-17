// Real multi-threading example
import { Worker, isMainThread, parentPort, workerData } from 'worker_threads';

if (isMainThread) {
    // Main thread
    async function runCPUIntensiveTask(numbers: number[]) {
        return new Promise((resolve, reject) => {
            const worker = new Worker(__filename, {
                workerData: { numbers }
            });

            worker.on('message', resolve);
            worker.on('error', reject);
        });
    }

    // This actually uses multiple threads
    async function processLargeDataset() {
        const chunk1 = [1, 2, 3, /* ... thousands of numbers */];
        const chunk2 = [4, 5, 6, /* ... thousands of numbers */];

        // These run on separate CPU threads
        const [result1, result2] = await Promise.all([
            runCPUIntensiveTask(chunk1),
            runCPUIntensiveTask(chunk2)
        ]);

        return result1 + result2;
    }
} else {
    // Worker thread
    const { numbers } = workerData;

    // CPU-intensive calculation on separate thread
    let sum = 0;
    for (const num of numbers) {
        sum += Math.sqrt(num * num * num); // Heavy computation
    }

    parentPort?.postMessage(sum);
}
