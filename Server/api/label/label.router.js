const {
  getAllLabels,
  getLabel,
  getRandomColor,
  createLabel,
  updateLabel,
  deleteLabel,
} = require('./label.controller');
const router = require('express').Router();

router.get('/', getAllLabels);
router.get('/:label_id', getLabel);
router.get('/color', getRandomColor);

router.post('/', createLabel);

router.put('/:label_id', updateLabel);

router.delete('/:label_id', deleteLabel);

module.exports = router;
