const express = require('express');
const convert = require('./convert');

const app = express();
app.use(express.json());

app.get('/convert', (req, res) => {
  const { inr } = req.query;

  if (!inr) {
    return res.status(400).json({ error: 'Missing required query parameter: inr' });
  }

  const amount = parseFloat(inr);
  if (isNaN(amount)) {
    return res.status(400).json({ error: 'Invalid amount. Please enter a valid number.' });
  }

  try {
    const usd = convert(amount);
    res.json({ inr: amount, usd });
  } catch (e) {
    res.status(500).json({ error: 'Conversion error. Please try again later.' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
