
//
// File system operations
//

import { promises as fs } from 'fs';

// These use thread pool (blocking I/O operations)
const threadPoolOperations = [
    fs.readFile('large-file.txt'),           // ✅ Thread pool
    fs.writeFile('output.txt', 'data'),      // ✅ Thread pool
    fs.appendFile('log.txt', 'entry'),       // ✅ Thread pool
    fs.copyFile('src.txt', 'dest.txt'),      // ✅ Thread pool
    fs.stat('file.txt'),                     // ✅ Thread pool
    fs.readdir('/some/directory'),           // ✅ Thread pool
    fs.mkdir('/new/directory'),              // ✅ Thread pool
    fs.rmdir('/old/directory'),              // ✅ Thread pool
    fs.unlink('file-to-delete.txt'),         // ✅ Thread pool
    fs.rename('old.txt', 'new.txt'),         // ✅ Thread pool
    fs.chmod('file.txt', 0o755),             // ✅ Thread pool
    fs.chown('file.txt', 1000, 1000),        // ✅ Thread pool
];

// Synchronous versions BLOCK main thread (avoid these)
const blockingOperations = [
    fs.readFileSync('file.txt'),             // ❌ Blocks main thread
    fs.writeFileSync('file.txt', 'data'),    // ❌ Blocks main thread
    // ... other *Sync methods
];

//
// Cryptography
//

import * as crypto from 'crypto';
import { promisify } from 'util';

const pbkdf2 = promisify(crypto.pbkdf2);
const randomBytes = promisify(crypto.randomBytes);
const scrypt = promisify(crypto.scrypt);

// These use thread pool (CPU-intensive crypto)
const cryptoThreadPoolOps = [
    pbkdf2('password', 'salt', 100000, 64, 'sha512'),  // ✅ Thread pool
    scrypt('password', 'salt', 64),                     // ✅ Thread pool
    randomBytes(256),                                   // ✅ Thread pool
];

// These do NOT use thread pool (hardware accelerated when available)
const nonThreadPoolCrypto = [
    crypto.createHash('sha256').update('data').digest(), // ❌ Main thread
    crypto.createHmac('sha256', 'key').update('data').digest(), // ❌ Main thread
];

//
// DNS lookup
//

import * as dns from 'dns';
import { promisify } from 'util';

const lookup = promisify(dns.lookup);
const resolve = promisify(dns.resolve);

// Thread pool DNS operations
const dnsThreadPoolOps = [
    lookup('google.com'),           // ✅ Thread pool (getaddrinfo)
];

// Non-thread pool DNS operations
const dnsNonThreadPoolOps = [
    resolve('google.com'),          // ❌ Direct network (c-ares)
    dns.resolve4('google.com'),     // ❌ Direct network (c-ares)
    dns.resolve6('google.com'),     // ❌ Direct network (c-ares)
];

//
// Compression operations
//

import * as zlib from 'zlib';
import { promisify } from 'util';

const gzip = promisify(zlib.gzip);
const gunzip = promisify(zlib.gunzip);
const deflate = promisify(zlib.deflate);

// These use thread pool (CPU-intensive)
const compressionOps = [
    gzip(Buffer.from('large data to compress')),    // ✅ Thread pool
    gunzip(compressedBuffer),                       // ✅ Thread pool
    deflate(Buffer.from('data')),                   // ✅ Thread pool
];

//
// OPERATIONS THAT DO NOT USE THREADS
//

//
// Network operations (event driven)
//

import * as http from 'http';
import * as https from 'https';
import fetch from 'node-fetch';

// These are handled by the event loop, not thread pool
const networkOps = [
    fetch('https://api.example.com/data'),          // ❌ Event loop
    https.get('https://example.com'),               // ❌ Event loop
    http.request({ host: 'localhost', port: 3000 }), // ❌ Event loop
];

// Database connections (usually)
const dbOps = [
    // Most database drivers use connection pools, not libuv thread pool
    mongoose.connect('mongodb://localhost'),         // ❌ Event loop
    pg.connect('postgresql://localhost'),            // ❌ Event loop
    redis.get('key'),                               // ❌ Event loop
];

//
// Timer and immediate operations
//

// These are handled by event loop phases
setTimeout(() => {}, 1000);        // ❌ Event loop
setImmediate(() => {});            // ❌ Event loop
process.nextTick(() => {});        // ❌ Event loop

//
// Monitoring
//

import * as perf_hooks from 'perf_hooks';

// Monitor file operations
async function monitorFileOperations() {
    const startTime = perf_hooks.performance.now();

    // Simulate multiple file operations
    const operations = Array.from({length: 8}, (_, i) =>
        fs.readFile(`file-${i}.txt`).catch(() => `File ${i} not found`)
    );

    const results = await Promise.all(operations);
    const endTime = perf_hooks.performance.now();

    console.log(`Processed ${operations.length} files in ${endTime - startTime}ms`);

    // With 4 threads: first 4 start immediately, next 4 wait
    // With 8 threads: all 8 can start immediately
}
