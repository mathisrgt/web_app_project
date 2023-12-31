"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Card = exports.User = exports.initializeDatabase = exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const bcrypt_1 = __importDefault(require("bcrypt"));
const sequelize = new sequelize_1.Sequelize('postgres', 'postgres', 'postgres', {
    dialect: 'postgres',
    host: 'localhost',
    port: 5432,
});
exports.sequelize = sequelize;
class User extends sequelize_1.Model {
    static async createUser(data) {
        const existingUser = await User.findOne({ where: { username: data.username } });
        if (existingUser) {
            console.log('User with the same username already exists.');
            return null;
        }
        // Hash the password using bcrypt
        const hashedPassword = await bcrypt_1.default.hash(data.password, 10);
        const user = await User.create({
            username: data.username,
            password: hashedPassword,
        });
        return user;
    }
    static async comparePassword(enteredPlaintextPassword, storedHashedPassword) {
        return bcrypt_1.default.compare(enteredPlaintextPassword, storedHashedPassword);
    }
}
exports.User = User;
User.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    username: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false,
        unique: true, // Ensure that usernames are unique
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize,
    tableName: 'users',
    timestamps: false,
});
class Card extends sequelize_1.Model {
}
exports.Card = Card;
Card.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false,
    },
    question: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    answer: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize,
    tableName: 'cards',
    timestamps: false,
});
Card.belongsTo(User, { foreignKey: 'UserId' });
const createSampleUsersAndCards = async () => {
    try {
        // Create User 1
        const user1 = await User.createUser({
            username: 'user1',
            password: 'password1',
        });
        // Create User 2
        const user2 = await User.createUser({
            username: 'user2',
            password: 'password2',
        });
        // Create some random cards for User 1
        await Card.bulkCreate([
            { title: 'Card1', question: 'Question1', answer: 'Answer1', UserId: user1.id },
            { title: 'Card2', question: 'Question2', answer: 'Answer2', UserId: user1.id },
        ]);
        // Create some random cards for User 2
        await Card.bulkCreate([
            { title: 'Card3', question: 'Question3', answer: 'Answer3', UserId: user2.id },
            { title: 'Card4', question: 'Question4', answer: 'Answer4', UserId: user2.id },
        ]);
        console.log('Sample users and cards created');
    }
    catch (error) {
        console.error('Error creating sample users and cards:', error);
    }
};
const initializeDatabase = async () => {
    try {
        // Sync the models with the database
        await sequelize.sync();
        console.log('Database synchronized');
        // Create two users with some random cards
        await createSampleUsersAndCards();
    }
    catch (error) {
        console.error('Error synchronizing database:', error);
    }
};
exports.initializeDatabase = initializeDatabase;
//# sourceMappingURL=database.js.map