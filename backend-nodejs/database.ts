import { Sequelize, DataTypes, Model } from 'sequelize';
import bcrypt from 'bcrypt';

const sequelize = new Sequelize('postgres', 'postgres', 'postgres', {
    dialect: 'postgres',
    host: 'localhost',
    port: 5432,
});

class User extends Model {
    public id?: number;
    public username!: string;
    public password!: string;

    static async createUser(data: { username: string; password: string }): Promise<User | null> {
        const existingUser = await User.findOne({ where: { username: data.username } });

        if (existingUser) {
            console.log('User with the same username already exists.');
            return null;
        }

        // Hash the password using bcrypt
        const hashedPassword = await bcrypt.hash(data.password, 10);

        const user = await User.create({
            username: data.username,
            password: hashedPassword,
        });

        return user as User;
    }


    static async comparePassword(enteredPlaintextPassword: string, storedHashedPassword: string): Promise<boolean> {
        return bcrypt.compare(enteredPlaintextPassword, storedHashedPassword);
    }
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        username: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true, // Ensure that usernames are unique
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: 'users',
        timestamps: false,
    }
);

class Card extends Model {
    public id?: number;
    public title!: string;
    public question!: string;
    public answer!: string;
    public UserId?: number;
}

Card.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        question: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        answer: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: 'cards',
        timestamps: false,
    }
);

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
    } catch (error) {
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
    } catch (error) {
        console.error('Error synchronizing database:', error);
    }
};

export { sequelize, initializeDatabase, User, Card };
