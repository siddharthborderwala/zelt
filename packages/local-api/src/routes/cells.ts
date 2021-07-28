import fs from 'fs/promises';
import { join } from 'path';
import express from 'express';

type Cell = {
  id: string;
  content: string;
  type: 'code' | 'text';
};

export const createCellsRouter = (filename: string, dir: string) => {
  const router = express.Router();
  router.use(express.json());

  const filePath = join(dir, filename);

  router.get('/cells', async (req, res) => {
    try {
      const result = await fs.readFile(filePath, 'utf-8');
      res.status(200).json({ cells: JSON.parse(result) });
    } catch (error) {
      if (error.code === 'ENOENT') {
        await fs.writeFile(filePath, '[]', 'utf-8');
        return res.status(200).json({ cells: [] });
      } else {
        return res.status(500).json({ error });
      }
    }
  });

  router.post('/cells', async (req, res) => {
    const { cells }: { cells: Cell[] } = req.body;
    try {
      await fs.writeFile(filePath, JSON.stringify(cells), 'utf-8');
    } catch (error) {
      return res.status(500).json({ error });
    }
    return res.status(200).send();
  });

  return router;
};
