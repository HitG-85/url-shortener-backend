

const { nanoid } = require('nanoid');
const Url = require('../models/url');



//generates new short url or returns an existing one if already shortened
async function generateNewShortUrl(req, res) {
                              
    const body = req.body;
    
    const existing = await Url.findOne({ redirected: body.url });
    if (existing) {
        return res.json({ id: existing.shortened });
    }

    const shortId = nanoid(6);
    
    if (!body.url) return res.status(400).json({ error: 'url not found' });
    await Url.create({
        shortened: shortId,
        redirected: body.url,
        logs: [],
    })
    return res.json({ id: shortId });

}

// Returns analytics data (click count and timestamps) for a short URL
async function getAnalytics(req, res) {
    const shortened = req.params.shortened;
    const result = await Url.findOne({ shortened });
    return res.json({ tracker: result.logs.length, analytics: result.logs })
}

//Redirects to original url
async function getRedirected(req, res) {
    const shortened = req.params.shortened;
    const entry = await Url.findOneAndUpdate
        (
            {
                shortened
            },
            {
                $push:
                {
                    logs: { timestamp: Date.now() },
                },
            }
        )
    if (!entry) { return res.status(404).json({ error: "Short url not found" }); }
    res.redirect(entry.redirected);
}

module.exports = {
    generateNewShortUrl,
    getAnalytics,
    getRedirected,
};

