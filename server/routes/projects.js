import { Router } from 'express';
import Project from '../models/Project.js';

const router = Router();

// liste tous les projets
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// un projet par id
router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ error: 'Projet introuvable' });
    res.json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// crée un projet
router.post('/', async (req, res) => {
  try {
    const project = await Project.create(req.body);
    res.status(201).json(project);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// modifie un projet
router.put('/:id', async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!project) return res.status(404).json({ error: 'Projet introuvable' });
    res.json(project);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// supprime un projet
router.delete('/:id', async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) return res.status(404).json({ error: 'Projet introuvable' });
    res.json({ message: 'Projet supprimé' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
