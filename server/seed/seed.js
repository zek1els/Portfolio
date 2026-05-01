import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Project from '../models/Project.js';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/portfolio';

const projects = [
  {
    title: 'Kova',
    description:
      'Un bot Discord permettant de créer des messages embed personnalisés et de planifier des publications récurrentes, avec une interface web intégrée.',
    longDescription:
      "Kova est un bot Discord complet qui permet aux utilisateurs de composer des messages embed riches et de planifier des publications récurrentes. Le bot offre des commandes slash comme /send pour poster des embeds formatés avec titre, description, couleur, URL, auteur, footer, thumbnail, image et champs inline. Il inclut un système de templates (/message save, send, list, delete) et un planificateur (/schedule create, list, delete) supportant des intervalles en minutes, quotidiens ou hebdomadaires. Une interface web accompagne le bot pour composer et envoyer des messages depuis le navigateur avec sélection de serveur/canal et support des fuseaux horaires. Le bot et son interface tournent sur ma machine, accessibles publiquement via kova.lol.",
    technologies: ['JavaScript', 'Node.js', 'Discord.js', 'HTML', 'CSS', 'Express'],
    imageUrl: '',
    emoji: '⚡',
    githubUrl: 'https://github.com/zek1els/DiscordBot',
    liveUrl: 'https://kova.lol',
    featured: true,
  },
  {
    title: 'Portfolio',
    description:
      "Projet de session pour mon cours de Programmation Web Client. SPA full-stack avec la stack MERN (MongoDB, Express, React, Node.js).",
    longDescription:
      "Ce portfolio est mon projet de session pour le cours de Programmation Web Client au Cégep de Valleyfield. C'est une SPA en React qui présente mes projets et permet aux visiteurs de me contacter. Le backend est une API REST en Node.js, Express et MongoDB qui stocke les projets et les messages du formulaire. Le site inclut une validation côté client, un filtre par technologie et un thème sombre/clair géré avec le Context API. Le tout est auto-hébergé sur ma machine et accessible publiquement sur mon domaine personnel.",
    technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'CSS', 'Vite'],
    imageUrl: '',
    emoji: '🚀',
    githubUrl: 'https://github.com/zek1els/Portfolio',
    liveUrl: 'https://maximeimbeault.xyz',
    featured: true,
  },
];

async function seed() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB connected');

    await Project.deleteMany({});
    console.log('Cleared existing projects');

    await Project.insertMany(projects);
    console.log(`Seeded ${projects.length} project(s)`);

    await mongoose.disconnect();
    console.log('Done');
  } catch (err) {
    console.error('Seed error:', err.message);
    process.exit(1);
  }
}

seed();
