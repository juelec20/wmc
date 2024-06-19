import mongoose, { Document, Schema } from 'mongoose';

interface IFavorite extends Document {
    characterId: mongoose.Schema.Types.ObjectId;
}

const FavoriteSchema: Schema = new Schema({
    characterId: { type: mongoose.Schema.Types.ObjectId, ref: 'Character', required: true }
});

export default mongoose.model<IFavorite>('Favorite', FavoriteSchema);
