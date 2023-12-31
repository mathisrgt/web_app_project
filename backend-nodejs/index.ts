import * as bodyParser from 'body-parser';
import express, { Request, Response } from 'express';
import { initializeDatabase, User, Card } from './database';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swagger';
import expressSession from 'express-session';

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(expressSession({ secret: 'your_session_secret', resave: false, saveUninitialized: true }));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

declare module 'express-session' {
    interface Session {
        user?: { userId: number; username: string };
    }
}

// Middleware to check if the user is authenticated
const isAuthenticated = (req: Request, res: Response, next: Function) => {
    if (req.session && req.session.user) {
        next();
    } else {
        res.status(401).json({ success: false, error: 'Unauthorized' });
    }
};

app.post('/api/register', async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;
        const user = await User.createUser({ username, password });
        res.json({ success: true });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

app.post('/api/login', async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ where: { username } });

        if (user && (await User.comparePassword(password, user.password))) {
            // Create a session with user information
            req.session.user = { userId: user.id, username: user.username };
            res.json({ success: true, message: 'Login successful' });
        } else {
            res.status(401).json({ success: false, error: 'Invalid username or password' });
        }
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

app.get('/api/cards', isAuthenticated, async (req: Request, res: Response) => {
    try {
        const userId = req.session.user.userId;

        const user = await User.findByPk(userId);

        if (user) {
            const cards = await Card.findAll({
                where: { UserId: userId },
                attributes: ['id', 'title', 'question', 'answer'],
            });

            res.json({ success: true, cards });
        } else {
            res.status(404).json({ success: false, error: 'User not found' });
        }
    } catch (error) {
        console.error('Error fetching user cards:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

app.post('/api/cards', isAuthenticated, async (req: Request, res: Response) => {
    try {
        const { title, question, answer } = req.body;
        const userId = req.session.user.userId;

        const user = await User.findByPk(userId);

        if (user) {
            const card = await Card.create({ title, question, answer, UserId: userId });

            res.json({ success: true });
        } else {
            res.status(404).json({ success: false, error: 'User not found' });
        }
    } catch (error) {
        console.error('Error creating card:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

app.delete('/api/cards/:cardId', isAuthenticated, async (req: Request, res: Response) => {
    try {
        const cardId = parseInt(req.params.cardId, 10);
        const userId = req.session.user.userId;

        const card = await Card.findOne({ where: { id: cardId, UserId: userId } });

        if (card) {
            await card.destroy();
            res.json({ success: true, message: 'Card deleted successfully' });
        } else {
            res.status(404).json({ success: false, error: 'Card not found' });
        }
    } catch (error) {
        console.error('Error deleting card:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

initializeDatabase()
    .then(() => {
        app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`);
        });
    })
    .catch((error) => {
        console.error('Error initializing database:', error);
    });
