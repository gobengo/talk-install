const express = require('express');
const router = express.Router();
const request = require('request');

router.get('/releases/latest', (req, res) => {
  if (process.env.REPO_PRERELEASE === 'true') {
    request({
      url: `https://api.github.com/repos/${process.env.REPO}/releases`,
      headers: {
        'User-Agent': 'coralproject/talk-install'
      },
      json: true
    }, (error, response, body) => {
      if (error || response.statusCode !== 200) {
        return res.status(response.statusCode).json(body);
      }

      let releases = body;

      // Send back the first pre-release
      res.json(releases.find((release) => release.prerelease));
    });
  } else {
    res.redirect(`https://api.github.com/repos/${process.env.REPO}/releases/latest`);
  }
});

module.exports = router;
