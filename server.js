require('dotenv').config();
const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

// Serve i file statici (HTML, CSS, JS, immagini)
app.use('/typedesign', express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use((req, res) => {
  res.status(404).send('Not found');
});

const PORT = process.env.PORT || 3011;
app.listen(PORT, '0.0.0.0', () => console.log(`🚀 Server attivo su http://0.0.0.0:${PORT}`));
