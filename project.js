//Demonstrating a small project that includes the concepts in phase 1

//"VaultAPI" — A Minimalist Personal Resource Library.

/*structure
1. Server Setup
2. In-Memory Data Store
3. API Endpoints
4. Basic Routing
*/

//----Server set-up
const https = require('http');  //importing http module
const url = require('url');  //importing url module

const PORT = 4000;

/*-----------------------------
In-memory data store
------------------------------*/
let resources = [
    { id: 1, title: "Node.js Basics", type: "Article", link: "https://nodejs.org/en/docs/guides/getting-started-guide/" },
    { id: 2, title: "Express.js Guide", type: "Tutorial", link: "https://expressjs.com/en/starter/installing.html" },
    { id: 3, title: "Linux commands", type:"Article", link:"https://www.geeksforgeeks.org/linux-unix/linux-commands-cheat-sheet/"},
];

/*---------------------------------
API Endpoints
----------------------------------*/
const server = https.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true); // Parsing the URL
    const path = parsedUrl.pathname; // Extracting the path
    const method = req.method; // Extracting the HTTP method

    // Home Route-----GET Response
    if (path === '/' && method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Welcome to VaultAPI - Your Personal Resource Library');
    }
    // Get all resources-----GET Response
    else if (path === '/api/resources' && method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(resources));
    }
    // Add a new resource-----POST Request
    else if (path === '/api/resources' && method === 'POST') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString(); // Convert Buffer to string
        });
        req.on('end', () => {
            const newResource = JSON.parse(body);
            newResource.id = resources.length + 1; // Simple ID assignment
            resources.push(newResource);
            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(newResource));
        });
    }

    //Deleting a resource-------------DELETE Request
    else if (path.startsWith('/api/resources/') && method === 'DELETE') {
        const id = parseInt(path.split('/')[3]);
        resources = resources.filter(resource => resource.id !== id);
        res.writeHead(204);
        res.end();

        // Resource not found
    } else{
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Resource Not Found');
    }
});

//Server listening on specified PORT
server.listen(PORT, () => {
    console.log(`VaultAPI server running on port ${PORT}`); //Server listening on specified PORT
    //Displaying the url the port is running on
    console.log(`Access the API at: http://localhost:${PORT}/`);
});
/*---------------------------------
Basic Routing and API functionality demonstrated:
1. Home route to welcome users.
2. GET endpoint to retrieve all resources.
3. POST endpoint to add new resources.
----------------------------------*/
