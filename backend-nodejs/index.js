"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bodyParser = __importStar(require("body-parser"));
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use(bodyParser.json());
const cards = [];
let cardIdCounter = 1;
app.post('/api/cards', (req, res) => {
    try {
        const { question, answer } = req.body;
        const newCard = {
            id: cardIdCounter.toString(),
            question,
            answer,
        };
        cardIdCounter++;
        cards.push(newCard);
        res.status(200).json(newCard);
    }
    catch (error) {
        res.status(500).json({ message: 'Erreur lors de la création de la carte mémoire.' });
    }
});
app.get('/api/cards', (req, res) => {
    res.status(200).json(cards);
});
app.put('/api/cards/:id', (req, res) => {
    try {
        const { id } = req.params;
        const { question, answer } = req.body;
        const existingCard = cards.find((card) => card.id === id);
        if (!existingCard) {
            res.status(404).json({ message: 'Carte mémoire non trouvée.' });
            return;
        }
        existingCard.question = question;
        existingCard.answer = answer;
        res.status(200).json(existingCard);
    }
    catch (error) {
        res.status(500).json({ message: 'Erreur lors de la mise à jour de la carte mémoire.' });
    }
});
app.delete('/api/cards/:id', (req, res) => {
    try {
        const { id } = req.params;
        const index = cards.findIndex((card) => card.id === id);
        if (index === -1) {
            res.status(404).json({ message: 'Carte mémoire non trouvée.' });
            return;
        }
        cards.splice(index, 1);
        res.status(200).json({ message: 'Carte mémoire supprimée avec succès.' });
    }
    catch (error) {
        res.status(500).json({ message: 'Erreur lors de la suppression de la carte mémoire.' });
    }
});
app.listen(port, () => {
    console.log(`Le serveur est en cours d'exécution sur le port ${port}`);
});
//# sourceMappingURL=index.js.map