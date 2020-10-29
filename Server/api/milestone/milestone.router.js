const {
  getAllMilestones,
  getMilestone,
  createMilestone,
  updateMilestone,
  updateMilestoneState,
} = require('./milestone.controller');
const router = require('express').Router();

router.get('/', getAllMilestones);
router.get('/:milestone_id', getMilestone);

router.post('/', createMilestone);

router.put('/:milestone_id', updateMilestone);
router.put('/:milestone_id/state', updateMilestoneState);

module.exports = router;
