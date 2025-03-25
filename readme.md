# Formation NodeJS / Express

1. Pour créer un projet, nous utilisons la commande :

```bash
npm init -y
```

2. Vous pouvez générer un fichier `.gitignore` avec la commande suivante :

```bash
npx gitignore node
```

3. Installer les librairies et dépendances :

```bash
npm install express
```

4. Créer votre fichier d'application :

```javascript
const express = require ('express');

const app = express();
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
});
```
