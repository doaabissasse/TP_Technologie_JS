const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json()); // Middleware pour analyser les corps de requêtes JSON

let items = [];

// Créer un élément (POST)
app.post('/items', (req, res) => {
  const newItem = req.body;
  items.push(newItem);
  res.status(201).send('Item ajouté');
});

// Obtenir tous les éléments (GET)
app.get('/items', (req, res) => {
  res.json(items);
});

// Obtenir un élément par ID (GET)
app.get('/items/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const item = items[id];
  if (item) {
    res.json(item);
  } else {
    res.status(404).send('Item non trouvé');
  }
});

// Mettre à jour un élément (PUT)
app.put('/items/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const updatedItem = req.body;
  if (items[id]) {
    items[id] = updatedItem;
    res.send('Item mis à jour');
  } else {
    res.status(404).send('Item non trouvé');
  }
});

// Supprimer un élément (DELETE)
app.delete('/items/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (items[id]) {
    items.splice(id, 1);
    res.send('Item supprimé');
  } else {
    res.status(404).send('Item non trouvé');
  }
});

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur http://localhost:${PORT}`);
});
