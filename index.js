import { createClient } from 'redis';
import http from 'http'
import { Buffer } from 'buffer';
import minimist from 'minimist';
const argv = minimist(process.argv.slice(2))
const port = argv.port ? argv.port : 3000;
const origin = argv.origin ? argv.origin : 'https://dummyjson.com';
const flush = argv.clear
const client = createClient()
const ttl = argv.ttl ? argv.ttl : 3600;
client.on("error", err => console.log(err))
client.connect()

if (flush) {
    client.flushAll()
}

const server = new http.createServer(async (req, res) => {
    try {

        const url = req.url;

        const data = await client.get(`${origin}${url}`)
        if (data) {
            let response = Buffer.from(data)
            res.setHeader("X-Cache", "HIT")
            res.end(response);
        }
        else {
            const response = await fetch(`${origin}${url}`);
            const body = await response.text()
            client.set(`${origin}${url.slice(1)}`, body, { EX: ttl })
            res.setHeader("X-Cache", "MISS")
            res.end(Buffer.from(bodsy))
        }

    }
    catch (err) {
        res.statusCode = 500
        res.end("500 - something went terible wrong...")
        console.log(err)
    }

});

server.listen(port, '127.0.0.1', () => console.log(`listening on port ${port} and forwarding to ${origin}`));
