const express = require('express');
const router = express.Router();

// GET temperature
router.get('/temperature', (req, res) => {
    const str = [{
        "name": "Ricardo",
        "msg": "This is my tweet"
    }];

    res.end(JSON.stringify(str));
});

module.exports = router;