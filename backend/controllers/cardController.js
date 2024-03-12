const Card = require('../models/Card');

exports.addCard = async (req, res) => {
  try {
    const { user } = req;
    const card = await Card.create({ ...req.body, user: user._id });
    res.status(201).json({ success: true, card });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getCardsByUser = async (req, res) => {
  try {
    const { user } = req;
    const cards = await Card.find({ user: user._id });
    res.status(200).json({ success: true, cards });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getCardsByType = async (req, res) => {
  try {
    const { user } = req;
    const { type } = req.params;
    const cards = await Card.find({ user: user._id, type });
    res.status(200).json({ success: true, cards });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getCardById = async (req, res) => {
  try {
    const { user } = req;
    const { id } = req.params;
    const { pin } = req.body;

    // Find the card by ID
    const card = await Card.findById(id);

    if (!card) {
      return res.status(404).json({ success: false, message: 'Card not found' });
    }

    // Check if the card belongs to the authenticated user
    if (card.user.toString() !== user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Access denied' });
    }

    // Check if the provided PIN matches the card's PIN
    if (card.pin !== pin) {
      return res.status(401).json({ success: false, message: 'Incorrect PIN' });
    }

    // If everything is correct, return the card
    res.status(200).json({ success: true, card });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.searchCards = async (req, res) => {
  try {
    const { user } = req;
    const { query } = req.params;
    const cards = await Card.find({ user: user._id, $text: { $search: query } });
    res.status(200).json({ success: true, cards });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.deleteCardById = async (req, res) => {
  try {
    const { user } = req;
    const { id } = req.params;

    // Find the card by ID
    const card = await Card.findById(String(id));

    if (!card) {
      return res.status(404).json({ success: false, message: 'Card not found' });
    }

    // Check if the card belongs to the authenticated user
    if (card.user.toString() !== user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Access denied' });
    }

    // Delete the card
    await Card.findByIdAndDelete(id);

    res.status(200).json({ success: true, message: 'Card deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getRenewalAlerts = async (req, res) => {
  try {
    const { user } = req;
    // Assuming renewal alerts are based on expirationDate field
    const todaynorm = new Date();
    const today = todaynorm.toISOString();

    const cards = await Card.find({ user: user._id, expirationDate: { $lte: today } });
    res.status(200).json({ success: true, cards });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Add more controller methods as needed
