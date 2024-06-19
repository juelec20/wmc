import mongoose from 'mongoose';
import Character from '../models/Character';
import axios from 'axios';

const seedDatabase = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/harrypotter');

        const { data } = await axios.get('https://hp-api.onrender.com/api/characters');
        await Character.deleteMany({});
        await Character.insertMany(data);
        mongoose.disconnect();
        console.log('Database seeded!');
    } catch (error) {
        console.error('Error seeding database:', error);
        mongoose.disconnect();
    }
};

seedDatabase();
