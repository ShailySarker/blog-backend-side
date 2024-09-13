const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const db = require('./dbConnect'); 

const port = 4000;

app.use(bodyParser.json());

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

// app.get("/", (req, res) => {
//     res.send("Hello World");
// });

// app.listen(port, (error) => {
//     if(error) {
//         console.log("The server did not start: ", error);
//         return;
//     }
//     else{
//         console.log("The server is running on port", port);
//     }
// })