# StudyFlash

StudyFlash is a flashcard web application for learning developed with the Angular framework, a server written in Typescript and Express.js and a PostgreSQL database.

## Features

This web application features :

- Create a list with flashcards. Each card has a question, up to three possible answers and an image (in development).

- Test your knowledge of a list and learn by displaying unlearned cards.

- Display a performance graph to encourage you to learn in a fun way!

## Application screens

### Login

Link: http://localhost:4200/login
Allows you to log in to your user account. Lists and their cards are assigned to a single user and cannot be viewed by others.

### Dashboard

Link: http://localhost:4200/dashboard
The dashboard is the main page of the web app, where you can observe your progress on the learning cards through graphics. Underneath, you have access to all your lists, which you can start or modify.

### Editor

Link: http://localhost:4200/editor/**listId**
The editor allows you to modify the information on a list, and to add, modify or delete the learning cards it contains.

### Learn

Link: http://localhost:4200/learn/**listId**/**cardId**
The learning page appears when a list is launched to test your knowledge. It displays the question, possible answers, a submit button and then corrects you with an explanation of the answer.
