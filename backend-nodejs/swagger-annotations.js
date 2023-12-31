/**
 * @swagger
 * tags:
 *   - name: Auth
 *     description: Authentication operations
 *   - name: Cards
 *     description: Operations related to user cards
 *
 */
/**
 * @swagger
 * /api/register:
 *   post:
 *     summary: Register a new user
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - username
 *               - password
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Internal Server Error
 */
/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Log in a user
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - username
 *               - password
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Invalid username or password
 *       500:
 *         description: Internal Server Error
 */
/**
 * @swagger
 * /api/cards:
 *   get:
 *     summary: Get user's cards
 *     tags:
 *       - Cards
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
/**
 * @swagger
 * /api/cards:
 *   post:
 *     summary: Create a new card
 *     tags:
 *       - Cards
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               question:
 *                 type: string
 *               answer:
 *                 type: string
 *             required:
 *               - title
 *               - question
 *               - answer
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal Server Error
 */
/**
 * @swagger
 * /api/cards/{cardId}:
 *   delete:
 *     summary: Delete a card
 *     tags:
 *       - Cards
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: cardId
 *         required: true
 *         description: ID of the card to delete
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Card not found
 *       500:
 *         description: Internal Server Error
 */
//# sourceMappingURL=swagger-annotations.js.map