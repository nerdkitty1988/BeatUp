const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const eventsRouter = require('./events.js');
const groupsRouter = require('./groups.js');
const rsvpsRouter = require('./rsvps');
const locationsRouter = require('./locations')

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.use('/events', eventsRouter);

router.use('/groups', groupsRouter);

router.use('/rsvps', rsvpsRouter);

router.use('/locations', locationsRouter);



router.post('/test', (req, res) => {
  res.json({ requestBody: req.body });
});

module.exports = router;
