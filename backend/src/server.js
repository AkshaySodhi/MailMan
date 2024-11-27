import express from "express";
import cors from "cors";
import { getGoogleAuthURL, getGoogleTokens, revokeGoogleTokens } from "./gmailAuth.js";
import { startService, stopService } from "./gmailHelpers.js";

const PORT = 3000;
let tokens;

const app = express();
app.use(cors());

app.get('/auth/google', (req, res) => {
    try {
        const url = getGoogleAuthURL();
        res.status(200).json(url); //2) give frontend google login url
    } catch (err) {
        console.log(`error in reaching auth: ${err}`);
        res.status(500).json("error in reaching auth");
    }
});


app.get('/auth/google/callback', async (req, res) => { //4) redirect from google login
    const code = req.query.code;
    if (!code) return res.status(400).send('Missing code parameter');

    try {
        tokens = await getGoogleTokens(code);
        startService();
        res.redirect(`http://localhost:5173/dashboard`); //5) goto frontend dashboard
    } catch (error) {
        console.error('Google Auth Error:', error);
        res.status(500).send('Google Authentication Failed');
    }
});

app.get('/auth/google/logout', async (req, res) => {
    try {
        if (tokens) {
            await revokeGoogleTokens();
            tokens = null;
            stopService();
        }
        res.json("http://localhost:5173/");
    } catch (err) {
        console.log("error logging out:", err);
        res.status(500).send('Google Logout Failed');
    }
})

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
