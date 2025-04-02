const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = process.env.PORT || 8080;
const BUILD_DIR = path.join(__dirname, 'build');

// MIME types mapping with correct content-type for HTML
const mimeTypes = {
  '.html': 'text/html; charset=UTF-8',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.eot': 'application/vnd.ms-fontobject',
  '.otf': 'font/otf',
  '.ico': 'image/x-icon'
};

// Create the HTTP server
const server = http.createServer((req, res) => {
  console.log(`[${new Date().toISOString()}] Request: ${req.url}`);
  
  // Parse the URL
  const parsedUrl = url.parse(req.url);
  let pathname = parsedUrl.pathname;
  
  // Special handling for font requests
  if (pathname.endsWith('.woff') || pathname.endsWith('.woff2')) {
    // Check both possible font locations
    const fontPaths = [
      path.normalize(path.join(BUILD_DIR, pathname)),
      path.normalize(path.join(BUILD_DIR, 'fonts', path.basename(pathname)))
    ];
    
    console.log(`[${new Date().toISOString()}] FONT REQUEST: ${req.url}`);
    
    // Try to serve from either location
    for (const fontPath of fontPaths) {
      console.log(`[${new Date().toISOString()}] Checking font path: ${fontPath}`);
      
      if (fs.existsSync(fontPath)) {
        console.log(`[${new Date().toISOString()}] Font found at: ${fontPath}`);
        const ext = path.extname(fontPath);
        const contentType = mimeTypes[ext] || 'application/octet-stream';
        
        const data = fs.readFileSync(fontPath);
        
        // Set headers for fonts
        const headers = {
          'Content-Type': contentType,
          'Cache-Control': 'public, max-age=31536000',
          'Access-Control-Allow-Origin': '*'
        };
        
        res.writeHead(200, headers);
        res.end(data);
        return;
      }
    }
  }
  
  // If URL ends with /, add index.html
  if (pathname.endsWith('/')) {
    pathname += 'index.html';
  }
  
  // Normalize the path and join with build directory
  const filePath = path.normalize(path.join(BUILD_DIR, pathname));
  
  // Get file extension
  const ext = path.extname(filePath);
  
  // Handle SPA routes that don't have an extension (serve index.html)
  if (!ext && !filePath.endsWith('index.html')) {
    const indexPath = path.join(BUILD_DIR, 'index.html');
    
    fs.readFile(indexPath, (err, data) => {
      if (err) {
        res.writeHead(500);
        res.end('Error loading index.html');
        return;
      }
      
      res.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' });
      res.end(data);
    });
    return;
  }
  
  // Read the requested file
  fs.readFile(filePath, (err, data) => {
    if (err) {
      // File not found, serve index.html for SPA routing
      console.log(`[${new Date().toISOString()}] File not found: ${filePath}, serving index.html instead`);
      
      const indexPath = path.join(BUILD_DIR, 'index.html');
      fs.readFile(indexPath, (err, indexData) => {
        if (err) {
          res.writeHead(500);
          res.end('Error loading index.html');
          return;
        }
        
        res.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' });
        res.end(indexData);
      });
      return;
    }
    
    // Determine the correct content type
    const contentType = mimeTypes[ext] || 'application/octet-stream';
    
    // Set headers
    const headers = {
      'Content-Type': contentType,
      'Cache-Control': 'public, max-age=31536000' // 1 year for static assets
    };
    
    // Add CORS headers for fonts
    if (contentType.includes('font')) {
      headers['Access-Control-Allow-Origin'] = '*';
      console.log(`[${new Date().toISOString()}] FONT SERVED: ${filePath} (${contentType})`);
    }
    
    res.writeHead(200, headers);
    res.end(data);
  });
});

// Log font directories on startup
console.log(`[${new Date().toISOString()}] Server starting...`);
console.log(`[${new Date().toISOString()}] BUILD_DIR: ${BUILD_DIR}`);

const fontDirs = [
  path.join(BUILD_DIR, 'fonts'),
  path.join(BUILD_DIR, 'assets/fonts')
];

fontDirs.forEach(dir => {
  console.log(`[${new Date().toISOString()}] Checking font directory: ${dir}`);
  if (fs.existsSync(dir)) {
    try {
      const files = fs.readdirSync(dir);
      console.log(`[${new Date().toISOString()}] Font files in ${dir}:`);
      files.forEach(file => {
        console.log(`[${new Date().toISOString()}] - ${file}`);
      });
    } catch (err) {
      console.log(`[${new Date().toISOString()}] Error reading directory: ${err}`);
    }
  } else {
    console.log(`[${new Date().toISOString()}] Directory does not exist: ${dir}`);
  }
});

// Start the server
server.listen(PORT, () => {
  console.log(`[${new Date().toISOString()}] Server is running on port ${PORT}`);
}); 