import express from 'express';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { exec } from 'child_process';
import util from 'util';

const execPromise = util.promisify(exec);

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = process.env.PORT || 3000;

  app.use(express.json({ limit: '10mb' }));

  // Initialize Gemini if key is present
  const apiKey = process.env.GEMINI_API_KEY;
  let ai: GoogleGenAI | null = null;
  if (apiKey) {
    try {
      ai = new GoogleGenAI({ apiKey });
    } catch (e) {
      console.warn('Could not initialize GoogleGenAI with key:', e);
    }
  }

  // AI Suggestion API for listing creation
  app.post('/api/ai/suggest', async (req, res) => {
    try {
      const { rawTitle, categoryHint } = req.body;
      if (!ai) {
        return res.status(200).json(null);
      }

      const prompt = `Ești asistentul inteligent al marketplace-ului românesc Repedero.
Utilizatorul dorește să vândă un produs cu titlul/indiciul: "${rawTitle || categoryHint}".
Generează în format strict JSON (fără markdown) următoarele câmpuri adaptate pieței din România:
{
  "categoryId": "vehicule" | "imobiliare" | "telefoane" | "electronice" | "casa-gradina" | "moda" | "locuri-de-munca" | "servicii",
  "subcategoryId": string,
  "suggestedTitle": string (titlu atrăgător, clar, în limba română),
  "suggestedDescription": string (descriere detaliată cu puncte cheie, stare, pachet inclus),
  "suggestedPriceRON": number (preț realist în lei / RON pe piața second-hand din România),
  "attributes": object (câmpuri specifice categoriei, ex: brand, model, storage, year etc.),
  "keywords": string[]
}`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
        }
      });

      const text = response.text || '';
      const parsed = JSON.parse(text);
      return res.json(parsed);
    } catch (error) {
      console.error('Error in /api/ai/suggest:', error);
      return res.status(500).json({ error: 'Failed to generate suggestions' });
    }
  });

  // AI Translation API for listings
  app.post('/api/ai/translate', async (req, res) => {
    try {
      const { text, targetLang } = req.body;
      if (!ai || !text) {
        return res.status(200).json({ translatedText: text });
      }

      const prompt = `Translate the following marketplace listing text into ${targetLang === 'ro' ? 'Romanian' : 'English'}. Preserve formatting and tone:\n\n${text}`;
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
      });

      return res.json({ translatedText: response.text });
    } catch (error) {
      console.error('Error in /api/ai/translate:', error);
      return res.status(500).json({ error: 'Translation failed' });
    }
  });

  // Sync to GitHub repository rumeshta/rumesh-tharanga
  app.post('/api/sync-github', async (req, res) => {
    try {
      const { token } = req.body;
      if (!token || typeof token !== 'string') {
        return res.status(400).json({ error: 'GitHub Token is required' });
      }

      const cleanToken = token.trim();
      if (!/^[a-zA-Z0-9_\-]+$/.test(cleanToken)) {
        return res.status(400).json({ error: 'Invalid token format' });
      }

      // Execute git push with credentials
      const repoUrl = `https://${cleanToken}@github.com/rumeshta/rumesh-tharanga.git`;
      const cmd = `git push "${repoUrl}" main --force`;
      
      const { stdout, stderr } = await execPromise(cmd, { cwd: __dirname });
      return res.json({
        success: true,
        message: 'Successfully pushed to rumeshta/rumesh-tharanga on GitHub!',
        stdout,
        stderr
      });
    } catch (err: any) {
      console.error('Error syncing to GitHub:', err);
      const msg = err.stderr || err.message || 'Push failed. Please verify token permissions (repo scope).';
      return res.status(500).json({
        error: msg.includes('Authentication failed')
          ? 'GitHub authentication failed. Check your Personal Access Token.'
          : msg
      });
    }
  });

  // Production or Dev Vite middleware
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    // In dev, Vite can run or be mounted
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: process.env.DISABLE_HMR !== 'true',
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`Repedero app listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
