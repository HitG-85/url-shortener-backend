const express= require('express');
const { generateNewShortUrl, getAnalytics, getRedirected}=require('../controllers/url');

const router= express.Router();


router.post("/", generateNewShortUrl);
router.get("/analytics/:shortened", getAnalytics);
router.get('/:shortened', getRedirected);

module.exports=router;

