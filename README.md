# Portfolio

Mon site portfolio fait avec React, Node.js, Express et MongoDB.

## Ce que le site fait

- **Accueil** : page de présentation avec mes compétences et mes projets mis en avant
- **Projets** : liste de mes projets avec un filtre par technologie
- **Détail d'un projet** : page individuelle pour chaque projet
- **Contact** : formulaire pour m'envoyer un message (sauvegardé dans la base de données)
- **Thème sombre/clair** : bouton pour changer le thème, le choix est gardé en mémoire

## Technologies

**Frontend** : React, React Router, Context API, CSS
**Backend** : Node.js, Express, MongoDB, Mongoose

## Structure des fichiers

```
Portfolio/
├── server/                 # Le backend (API)
│   ├── models/             # Les modèles de données (Project, Message)
│   ├── routes/             # Les routes de l'API
│   ├── seed/               # Script pour remplir la base de données
│   └── server.js           # Fichier principal du serveur
├── src/                    # Le frontend (React)
│   ├── components/         # Composants réutilisables (Navbar, Footer, etc.)
│   ├── context/            # Le contexte pour le thème
│   ├── pages/              # Les pages du site
│   ├── App.jsx             # Le routing de l'app
│   ├── index.css           # Les styles
│   └── main.jsx            # Point d'entrée
├── .env                    # Variables d'environnement (pas sur GitHub)
├── package.json
└── vite.config.js
```

## Comment lancer le projet

### 1. Cloner et installer

```bash
git clone https://github.com/zek1els/Portfolio.git
cd Portfolio
npm install
```

### 2. Créer le fichier .env

Créer un fichier `.env` à la racine avec :

```
MONGO_URI=mongodb://localhost:27017/portfolio
PORT=5000
```

Ou utiliser une URI MongoDB Atlas si la base de données est en ligne.

### 3. Remplir la base de données

```bash
npm run seed
```

### 4. Lancer le tout

```bash
npm run dev:full
```

Le frontend est sur http://localhost:5173 et le backend sur http://localhost:5000.

## Les pages

| Route | Description |
|---|---|
| `/` | Page d'accueil |
| `/projects` | Liste des projets |
| `/projects/:id` | Détail d'un projet (route dynamique) |
| `/contact` | Formulaire de contact |

## L'API

| Méthode | Route | Description |
|---|---|---|
| GET | `/api/projects` | Avoir tous les projets |
| GET | `/api/projects/:id` | Avoir un projet |
| POST | `/api/projects` | Ajouter un projet |
| PUT | `/api/projects/:id` | Modifier un projet |
| DELETE | `/api/projects/:id` | Supprimer un projet |
| POST | `/api/messages` | Envoyer un message |
| GET | `/api/messages` | Voir les messages |

## Déploiement

Le site est déployé sur Render : https://portfolio-w8th.onrender.com/
