import mongoose, { Document, Schema } from 'mongoose';

interface ICharacter extends Document {
    name: string;
    house: string;
    wand: string;
    patronus: string;
    image: string;
}

const CharacterSchema: Schema = new Schema({
    name: { type: String, required: true },
    house: { type: String, required: true },
    wand: { type: String, required: true },
    patronus: { type: String, required: true },
    image: { type: String, required: true }
});

export default mongoose.model<ICharacter>('Character', CharacterSchema);
