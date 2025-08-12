const express = require('express');
const app = express();
const port = 4000;

// Define your serverless functions here
const functions = {
  hello: () => {
    return { message: 'Hello from custom serverless!' };
  },
  add: (params) => {
    const a = Number(params.a);
    const b = Number(params.b);
    return { result: a + b };
  }
};

app.get('/function/:name', (req, res) => {
  const funcName = req.params.name;
  const func = functions[funcName];

  if (!func) {
    return res.status(404).json({ error: 'Function not found' });
  }

  // Pass query params to function
  try {
    const result = func(req.query);
    res.json({ data: result });
  } catch (err) {
    res.status(500).json({ error: 'Function execution error', details: err.message });
  }
});

app.listen(port, () => {
  console.log(`Mini serverless app listening at http://localhost:${port}`);
});
