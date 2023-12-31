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
const bodyParser = __importStar(require("body-parser"));
const express_1 = __importDefault(require("express"));
const database_1 = require("./database");
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_1 = __importDefault(require("./swagger"));
const express_session_1 = __importDefault(require("express-session"));
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use(bodyParser.json());
app.use((0, express_session_1.default)({ secret: 'your_session_secret', resave: false, saveUninitialized: true }));
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.default));
// Middleware to check if the user is authenticated
const isAuthenticated = (req, res, next) => {
    if (req.session && req.session.user) {
        next();
    }
    else {
        res.status(401).json({ success: false, error: 'Unauthorized' });
    }
};
app.post('/api/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await database_1.User.createUser({ username, password });
        res.json({ success: true });
    }
    catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});
app.post('/api/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await database_1.User.findOne({ where: { username } });
        if (user && (await database_1.User.comparePassword(password, user.password))) {
            // Create a session with user information
            req.session.user = { userId: user.id, username: user.username };
            res.json({ success: true, message: 'Login successful' });
        }
        else {
            res.status(401).json({ success: false, error: 'Invalid username or password' });
        }
    }
    catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});
app.get('/api/cards', isAuthenticated, async (req, res) => {
    try {
        const userId = req.session.user.userId;
        const user = await database_1.User.findByPk(userId);
        if (user) {
            const cards = await database_1.Card.findAll({
                where: { UserId: userId },
                attributes: ['id', 'title', 'question', 'answer'],
            });
            res.json({ success: true, cards });
        }
        else {
            res.status(404).json({ success: false, error: 'User not found' });
        }
    }
    catch (error) {
        console.error('Error fetching user cards:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});
app.post('/api/cards', isAuthenticated, async (req, res) => {
    try {
        const { title, question, answer } = req.body;
        const userId = req.session.user.userId;
        const user = await database_1.User.findByPk(userId);
        if (user) {
            const card = await database_1.Card.create({ title, question, answer, UserId: userId });
            res.json({ success: true });
        }
        else {
            res.status(404).json({ success: false, error: 'User not found' });
        }
    }
    catch (error) {
        console.error('Error creating card:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});
app.delete('/api/cards/:cardId', isAuthenticated, async (req, res) => {
    try {
        const cardId = parseInt(req.params.cardId, 10);
        const userId = req.session.user.userId;
        const card = await database_1.Card.findOne({ where: { id: cardId, UserId: userId } });
        if (card) {
            await card.destroy();
            res.json({ success: true, message: 'Card deleted successfully' });
        }
        else {
            res.status(404).json({ success: false, error: 'Card not found' });
        }
    }
    catch (error) {
        console.error('Error deleting card:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});
(0, database_1.initializeDatabase)()
    .then(() => {
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
})
    .catch((error) => {
    console.error('Error initializing database:', error);
});
//# sourceMappingURL=index.js.map