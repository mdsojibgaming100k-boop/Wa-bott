const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());

const GEMINI_API_KEY = "তোমার_এপিআই_কি_এখানে_দাও";

app.post('/webhook', async (req, res) => {
    const userMsg = req.body.query; // AutoResponder থেকে আসা মেসেজ
    try {
        const response = await axios.post(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
            contents: [{ parts: [{ text: userMsg }] }]
        });
        const aiReply = response.data.candidates[0].content.parts[0].text;
        res.json({ replies: [{ message: aiReply }] });
    } catch (e) {
        res.json({ replies: [{ message: "মামা, একটু বিজি আছি!" }] });
    }
});

app.listen(process.env.PORT || 3000);
