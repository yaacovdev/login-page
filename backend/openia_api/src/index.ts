import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import OpenAI from "openai";
import cors from 'cors';
dotenv.config();

const openai = new OpenAI(
  { apiKey: process.env.OPENAI_API_KEY }
);

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/random-text', async (req: Request, res: Response) => {
  try {
    console.log('Fetching data from OpenAI');
    const { message } = req.body
    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: "Get me a random text, but only the text itself without any additional phrases or introductions." }],
      model: "gpt-4o-mini",
    });

    res.json({ response: completion.choices[0] })
  } catch (error) {
    console.error('Error fetching data from OpenAI:', error);
    res.status(500).send('Error fetching data from OpenAI');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
