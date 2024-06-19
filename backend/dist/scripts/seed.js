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
const mongoose_1 = __importDefault(require("mongoose"));
const Character_1 = __importDefault(require("../models/Character"));
const axios_1 = __importDefault(require("axios"));
const seedDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect('mongodb://localhost:27017/harrypotter');
        const { data } = yield axios_1.default.get('https://hp-api.onrender.com/api/characters');
        yield Character_1.default.deleteMany({});
        yield Character_1.default.insertMany(data);
        mongoose_1.default.disconnect();
        console.log('Database seeded!');
    }
    catch (error) {
        console.error('Error seeding database:', error);
        mongoose_1.default.disconnect();
    }
});
seedDatabase();
