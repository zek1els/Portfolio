import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Project from '../models/Project.js';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/portfolio';

const projects = [
  {
    title: 'Kova — Discord Custom Message Bot',
    description:
      'Un bot Discord permettant de créer des messages embed personnalisés et de planifier des publications récurrentes, avec une interface web intégrée.',
    longDescription:
      "Kova est un bot Discord complet qui permet aux utilisateurs de composer des messages embed riches et de planifier des publications récurrentes. Le bot offre des commandes slash comme /send pour poster des embeds formatés avec titre, description, couleur, URL, auteur, footer, thumbnail, image et champs inline. Il inclut un système de templates (/message save, send, list, delete) et un planificateur (/schedule create, list, delete) supportant des intervalles en minutes, quotidiens ou hebdomadaires. Une interface web locale (port 3000) accompagne le bot pour composer et envoyer des messages depuis le navigateur avec sélection de serveur/canal et support des fuseaux horaires. Le projet est déployable sur Railway avec authentification Discord.",
    technologies: ['JavaScript', 'Node.js', 'Discord.js', 'HTML', 'CSS', 'Express'],
    imageUrl: '',
    emoji: '⚡',
    githubUrl: 'https://github.com/zek1els/DiscordBot',
    liveUrl: 'https://kova.lol',
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
