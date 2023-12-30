import express from 'express';
import * as bodyParser from 'body-parser';

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

const cards: Record<string, any>[] = [];
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
    } catch (error) {
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
    } catch (error) {
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
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la suppression de la carte mémoire.' });
    }
});

app.listen(port, () => {
    console.log(`Le serveur est en cours d'exécution sur le port ${port}`);
});
