const router = require('express').Router();

const apiRoutes = require('./api');

router.use('/api', apiRoutes);

router.use((req, res) => {
  res.status(404).send('<img src="https://i.ibb.co/0J67kZR/404cat.png" />');
});

module.exports = router;