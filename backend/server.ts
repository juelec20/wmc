import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import Character from './models/Character';
import cors from 'cors';
import Favourite from "./models/Favourite";

const app = express();
const port = 3001;

mongoose.connect('mongodb://localhost:27017/harrypotter', {
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Error connecting to MongoDB:', err);
});

app.use(cors());
app.use(express.json());


app.get('/characters/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const character = await Character.findById(id);
        if (!character) {
            return res.status(404).json({ message: 'Character not found' });
        }
        res.json(character);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching character', error });
    }
});



app.get('/characters', async (req: Request, res: Response) => {
    const { name, house } = req.query;
    let filter: any = {};
    if (name) filter.name = new RegExp(name as string, 'i');
    if (house) filter.house = house;
    const characters = await Character.find(filter);
    res.json(characters);
});

app.post('/favorites', async (req: Request, res: Response) => {
    const { characterId } = req.body;
    try {
        const favorite = new Favourite({ characterId });
        await favorite.save();
        res.status(201).json(favorite);
    } catch (error) {
        res.status(500).json({ message: 'Error adding favorite', error });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
