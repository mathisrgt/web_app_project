
import * as bodyParser from 'body-parser';
import { initializeDatabase } from './database';
import {sequelize} from "./database";
import { DataTypes, Model } from 'sequelize';
import express, { Request, Response } from 'express';
import { Sequelize } from 'sequelize';

async function startApp() {
    sequelize.sync()
        .then(() => {
            console.log('User table has been created or updated.');
        })
        .catch((error) => {
            console.error('Error syncing User table:', error);
        });

}

startApp();
const List = sequelize.define('List', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    idUser: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    nbDisplayed: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    learned: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
}, {
    tableName: 'Lists', // Specify the table name
    timestamps: false,
})

List.sync();
const app = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.json());




app.get('/', (req, res) => {
    res.sendFile(__dirname + '/test.html');
});

// Create a new List item
app.post('/api/lists', async (req: Request, res: Response) => {
    try {
        const { idUser, nbDisplayed, learned } = req.body;

        const newList = await List.create({
            idUser,
            nbDisplayed,
            learned,
        });

        res.status(201).json(newList.toJSON());
    } catch (error) {
        console.error('Error inserting values into List table:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});






















const cards: Record<string, any>[] = [];
let cardIdCounter = 1;



const User = sequelize.define('User', {
    // Define the model attributes (columns)
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    // Add more attributes as needed
}, {
    // Define additional options if necessary
    // For example, tableName: 'Users' to specify the table name
});


/*
List.create({
    id:1,
    idUser: 1,
    nbDisplayed: 1,
    learned: true,
})
    .then(newListItem => {
        console.log('New List Item created:', newListItem.toJSON());
    })
    .catch(error => {
        console.error('Error creating List Item:', error);
    });
*/


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
