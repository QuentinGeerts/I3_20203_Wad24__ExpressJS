# Démonstration 04 - Database

Création d'une API REST sécurisée

1. Installation des dépendances

```bash
npm install express mssql uuid bcrypt jsonwebtoken cors
```

Ces dépendances incluent:
- `express` : Framework pour construire des applications web
- `mssql` : Librairie pour se connecter à une base de données SQL Server
- `uuid` : Générer  des identifiants uniques
- `bcrypt` : Hasher les mots de passe
- `jsonwebtoken` : Générer et vérifier les tokens JWT
- `cors` : Middleware pour gérer les requêtes cross-origin

2. Création d'un fichier `.gitignore` :

```bash
npx gitignore node
```