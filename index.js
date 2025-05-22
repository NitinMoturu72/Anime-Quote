import express from 'express';
import axios from 'axios';

const app = express();
const port = 3000;
app.use(express.static('public'));


app.get("/", (req, res) => {
  res.render("index.ejs", { quote: "", character: "", anime: "" });
});

app.get('/quote', async (req, res) => {
    try {
        const result = await axios.get('https://api.animechan.io/v1/quotes/random');
        //console.log(result.data);
        //console.log(result.data.data.content);
        res.render('index.ejs', {
            quote: result.data.data.content,
            character: result.data.data.character.name,
            anime: result.data.data.anime.name,

        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching Quote');
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

