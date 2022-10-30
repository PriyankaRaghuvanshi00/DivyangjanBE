let data = null;
const fs = require("fs");
try {
    data = fs.readFileSync('./data.json', 'utf8')
    data = JSON.parse(data)
} catch (err) {
    console.log(`Error reading file from disk: ${err}`)
}
const find = (searchQuery) => {
    let results = [];
    data.forEach((object) => {
        for (key in object) {
            if (key.indexOf(searchQuery) != -1 || object[key].indexOf(searchQuery) != -1) {
                results.push(object);
            }
        }
    })
    return results;
}
const express = require("express");
const app = express();
const cors = require('cors');
const port = 8080;
app.use(cors({
    origin: '*'
}));
app.get('/', (request, response) => {
    let query = request.query.search;
    console.log(request.query.search);
    if (query == null) {
        response.json(data);
    } else {
        response.json(find(query));
    }

})

app.listen(port, () => {
    console.log("App is running succesfully on port " + port);
});