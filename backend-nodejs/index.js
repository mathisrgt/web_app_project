"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var bodyParser = require("body-parser");
var app = (0, express_1.default)();
var port = process.env.PORT || 3000;
app.use(bodyParser.json());
var cards = [];
var cardIdCounter = 1;
app.post('/api/cards', function (req, res) {
    try {
        var _a = req.body, question = _a.question, answer = _a.answer;
        var newCard = {
            id: cardIdCounter.toString(),
            question: question,
            answer: answer,
        };
        cardIdCounter++;
        cards.push(newCard);
        res.status(200).json(newCard);
    }
    catch (error) {
        res.status(500).json({ message: 'Erreur lors de la création de la carte mémoire.' });
    }
});
app.get('/api/cards', function (req, res) {
    res.status(200).json(cards);
});
app.put('/api/cards/:id', function (req, res) {
    try {
        var id_1 = req.params.id;
        var _a = req.body, question = _a.question, answer = _a.answer;
        var existingCard = cards.find(function (card) { return card.id === id_1; });
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
app.delete('/api/cards/:id', function (req, res) {
    try {
        var id_2 = req.params.id;
        var index = cards.findIndex(function (card) { return card.id === id_2; });
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
app.listen(port, function () {
    console.log("Le serveur est en cours d'ex\u00E9cution sur le port ".concat(port));
});
