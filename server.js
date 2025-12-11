require('dotenv').config();
const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

// Serve i file statici (HTML, CSS, JS, immagini)
app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 3011;
app.listen(PORT, '0.0.0.0', () => console.log(`🚀 Server attivo su http://0.0.0.0:${PORT}`));
