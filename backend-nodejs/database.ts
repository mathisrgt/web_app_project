// database.ts
import { Sequelize } from 'sequelize-typescript';


const sequelize = new Sequelize(

     'postgres',
     'postgres',
     'postgres',

    {
    dialect: 'postgres',
    host: 'localhost',
    port: 5432,

});




async function initializeDatabase() {
    try {
        // Sync the model with the database (create tables)
        await sequelize.sync();

        // Create the 'learningapp' database if it doesn't exist
        await sequelize.query('CREATE DATABASE IF NOT EXISTS learningapp;');

        console.log('Database initialization completed.');
    } catch (error) {
        console.error('Error initializing database:', error);
    } finally {
        await sequelize.close();
    }
}

export { sequelize, initializeDatabase };
