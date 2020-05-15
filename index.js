
// ### Getting Express ###
const express = require('express');

// ### Creating the server ###
const server = express();

// ### Body Parser ###
server.use(express.json());

// ### API ROUTES ###
const serverRoutes = require('./api/serverRoutes');

// ### Using API Routes ###
server.use('/api', serverRoutes);

// ### Port ###
const PORT = 5000;

// ### Start the server ###
server.listen(PORT, () =>{
    console.log(`Server listening on port ${PORT}...`);   
})