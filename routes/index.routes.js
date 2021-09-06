const express = require('express');
const { isAuth } = require('../middlewares/auth.middleware');

const router = express.Router();

router.get('/', (req, res, next) => {
    const msg = 'NBA Node Project';

    return res.status(200).render('index', {title: 'Nba Upgrade Node Project', msg, isAuthenticated: req.isAuthenticated() });
});


module.exports = router;
