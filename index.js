import express from "express";
import axios from "axios";
import path from "path";
import {fileURLToPath} from "url";
import {getCryptoPrices} from './services/coinGecko.js';

// Since EMS does not provide __dirname by default
// I manually defined it using import.meta.url
// to ensure consistent path resolution
// across different environments
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// Configure EJS as the view engine
app.set('view engine', 'ejs');
// I used path.join with __dirname
// to ensure the application resolves static assets correctly
// regardless of the process's working directory or the operating system
// It makes the codebase more robust and portable for team collaboration.
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', async (req, res) => {

    try{

        const cruptoData = await getCryptoPrices();

        res.render('index', {
            title: 'LoonieCrypto - Live CAD Market',
            data: cruptoData
        })

    }catch(error){
        console.error('Error in root route:', error.message);
        res.status(500).send('Internal Server Error');
    }

});

app.listen(PORT, () => {
    console.log(`Server is running on the http://localhost:${PORT}`)
});