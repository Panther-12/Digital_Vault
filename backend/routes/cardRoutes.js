const express = require('express');
const router = express.Router();
const cardController = require('../controllers/cardController');
const authMiddleware = require('../middleware/authMiddleware');

// Protect routes with authentication middleware
router.use(authMiddleware);

// Routes for card-related operations
router.post('/cards', cardController.addCard);
router.get('/cards', cardController.getCardsByUser);
router.get('/cards/type/:type', cardController.getCardsByType);
router.get('/cards/:id', cardController.getCardById);
router.get('/cards/search/:query', cardController.searchCards);
router.delete('/cards/:id', cardController.deleteCardById);
router.get('/cards/renewal', cardController.getRenewalAlerts);
// Add more routes as needed for additional controller methods

module.exports = router;
