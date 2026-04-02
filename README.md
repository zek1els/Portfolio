# Portfolio — Application Web Monopage (SPA)

Application web portfolio full-stack construite avec la stack **MERN** (MongoDB, Express, React, Node.js).

## Fonctionnalités

- **Page d'accueil** : Hero section, présentation, compétences et projets en vedette
- **Page Projets** : Liste de tous les projets avec filtrage par technologie
- **Page Détail Projet** : Route dynamique `/projects/:id` avec description complète
- **Page Contact** : Formulaire contrôlé avec validation côté client
- **Thème sombre/clair** : Gestion d'état globale via Context API avec persistance localStorage
- **API REST** : Backend Express + MongoDB pour gérer les projets et messages
- **Design responsive** : Interface adaptée mobile, tablette et desktop

## Technologies utilisées

### Frontend
- **React 19** (Vite) — Composants fonctionnels + Hooks
- **React Router DOM** — Navigation SPA avec routes dynamiques
- **Context API** — Gestion d'état globale (thème)
- **CSS** — Variables CSS, media queries, animations

### Backend
- **Node.js + Express** — API REST
- **MongoDB + Mongoose** — Base de données NoSQL
- **CORS + dotenv** — Sécurité et configuration

## Architecture du projet

```
Portfolio/
├── server/                 # Backend API
│   ├── models/
│   │   ├── Project.js      # Modèle Mongoose pour les projets
│   │   └── Message.js      # Modèle Mongoose pour les messages
│   ├── routes/
│   │   ├── projects.js     # Routes CRUD projets
│   │   └── messages.js     # Routes messages de contact
│   ├── seed/
│   │   └── seed.js         # Script de peuplement de la BD
│   └── server.js           # Point d'entrée du serveur
├── src/                    # Frontend React
│   ├── components/
│   │   ├── Navbar.jsx      # Barre de navigation
│   │   ├── Footer.jsx      # Pied de page
│   │   ├── ProjectCard.jsx # Carte de projet
│   │   └── Loader.jsx      # Indicateur de chargement
│   ├── context/
│   │   └── ThemeContext.jsx # Contexte global du thème
│   ├── pages/
│   │   ├── Home.jsx        # Page d'accueil
│   │   ├── Projects.jsx    # Liste des projets
│   │   ├── ProjectDetail.jsx # Détail d'un projet
│   │   ├── Contact.jsx     # Formulaire de contact
│   │   └── NotFound.jsx    # Page 404
│   ├── App.jsx             # Routes de l'application
│   ├── App.css
│   ├── index.css           # Styles globaux + thèmes
│   └── main.jsx            # Point d'entrée React
├── .env                    # Variables d'environnement (non versionné)
├── package.json
├── vite.config.js
└── README.md
```

## Prérequis

- **Node.js** >= 18
- **MongoDB** en cours d'exécution (local ou Atlas)

## Installation et lancement

### 1. Cloner le dépôt

```bash
git clone <url-du-depot>
cd Portfolio
```

### 2. Installer les dépendances

```bash
npm install
```

### 3. Configurer les variables d'environnement

Créer un fichier `.env` à la racine :

```env
MONGO_URI=mongodb://localhost:27017/portfolio
PORT=5000
```

### 4. Peupler la base de données

```bash
npm run seed
```

### 5. Lancer l'application (frontend + backend)

```bash
npm run dev:full
```

- **Frontend** : http://localhost:5173
- **Backend API** : http://localhost:5000

## Routes de l'application

| Route | Page | Description |
|---|---|---|
| `/` | Accueil | Hero, à propos, projets en vedette |
| `/projects` | Projets | Liste complète avec filtres |
| `/projects/:id` | Détail | Route dynamique — détail d'un projet |
| `/contact` | Contact | Formulaire de contact avec validation |
| `*` | 404 | Page introuvable |

## Endpoints API

| Méthode | Route | Description |
|---|---|---|
| `GET` | `/api/projects` | Liste tous les projets |
| `GET` | `/api/projects/:id` | Détail d'un projet |
| `POST` | `/api/projects` | Créer un projet |
| `PUT` | `/api/projects/:id` | Modifier un projet |
| `DELETE` | `/api/projects/:id` | Supprimer un projet |
| `POST` | `/api/messages` | Envoyer un message |
| `GET` | `/api/messages` | Liste les messages |

## Exigences techniques couvertes

1. **Initialisation Vite** — Projet initialisé avec Vite (React template)
2. **ES6+** — Arrow functions, destructuring, template literals, async/await, modules
3. **Composants fonctionnels + Hooks** — useState, useEffect, useContext, useParams
4. **Gestion d'état** — useState (local) + useEffect (effets de bord)
5. **Navigation** — 4 routes dont 1 dynamique (`/projects/:id`) via react-router-dom
6. **Interaction API** — Fetch vers l'API MERN, gestion chargement/erreur visible
7. **Formulaire contrôlé** — Page Contact avec validation côté client
8. **État global** — Context API pour le thème (dark/light)
9. **CSS** — Design responsive avec thèmes clair/sombre, animations
10. **Déploiement** — Prêt pour déploiement (Render, Railway, Vercel, etc.)

## Déploiement

L'application peut être déployée sur des plateformes comme **Render**, **Railway** ou **Vercel** :

1. Configurer la variable `MONGO_URI` avec une URI MongoDB Atlas
2. Build : `npm run build`
3. Servir le dossier `dist/` pour le frontend
4. Lancer le serveur : `node server/server.js`
