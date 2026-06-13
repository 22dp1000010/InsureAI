const express = require('express');
const path = require('path');
const app = express();

const distFolder = path.join(__dirname, 'dist', 'insure-ai-ui', 'browser');
app.use(express.static(distFolder));

// SPA fallback so Angular routes work on refresh
app.get('/*', (req, res) => {
  res.sendFile(path.join(distFolder, 'index.html'));
});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on ${port}`));