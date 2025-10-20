import express from 'express'
import { getAIResponse } from './model.ts';


const app = express()
const port = 3000

app.use(express.json())


app.post("/chat",async (req,res)=>{
    const userMessage = req.body.message;
    if (!userMessage) return res.status(400).send({ error: 'No message provided' });

    try {
        const aiResponse = await getAIResponse(userMessage); 
        res.send({ response: aiResponse });
    } catch (error) {
        res.status(500).send({ error: 'Error processing your request' });     
    }
})


app.listen(port,'0.0.0.0', () => {
  console.log(`Example app listening on port ${port}`)
})
