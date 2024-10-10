# API Caching Server

A Node.js command-line application that caches JSON data from APIs.

## Features

- Caches responses from specified API endpoints
- Configurable port, origin URL, and cache TTL
- Option to clear cache and start fresh

## Installation

1. Clone this repository:
   ```
   git clone https://github.com/IanSpeelman/api-caching-server.git
   ```
2. Navigate to the project directory:
   ```
   cd api-caching-server
   ```
3. Install dependencies:
   ```
   npm i
   ```

## Usage

Run the application with the following command:

```
node app.js [options]
```

### Options

- `--port <portnumber>`: Set the port number for the server (default: 3000)
- `--origin <url-to-api>`: Set the origin URL for the API to cache (default: https://dummyjson.com)
- `--ttl <time-in-seconds>`: Set the Time To Live for cached responses in seconds (default: 3600)
- `--clear`: Clear the existing cache and start fresh

### Examples

1. Run with default settings:
   ```
   node index.js
   ```

2. Set a custom port and origin:
   ```
   node index.js --port 8080 --origin https://api.example.com
   ```

3. Set cache TTL to 1 hour and clear existing cache:
   ```
   node index.js --ttl 3600 --clear
   ```
