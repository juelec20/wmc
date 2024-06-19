"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const Character_1 = __importDefault(require("./models/Character"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const port = 3001;
mongoose_1.default.connect('mongodb://localhost:27017/harrypotter', {}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Error connecting to MongoDB:', err);
});
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get('/characters', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, house } = req.query;
    let filter = {};
    if (name)
        filter.name = new RegExp(name, 'i');
    if (house)
        filter.house = house;
    const characters = yield Character_1.default.find(filter);
    res.json(characters);
}));
app.post('/characters', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const character = new Character_1.default(req.body);
    yield character.save();
    res.status(201).json(character);
}));
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
