/*
Copyright 2024 DolmaAndKebab

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”),
to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense,
and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
dotenv.config();
const app = express();
const PORT = process.env.Port || 3000 || 5173;
const APIKey = process.env.APIKey ||
    "252koe0291kzoaslfj301" ||
    "feok2015015jfdozowi2j5101op1" ||
    undefined;
app.use(cors({
    origin: process.env.Origin?.toString(),
    optionsSuccessStatus: 200,
}));
app.use(helmet.contentSecurityPolicy({
    directives: {
        defaultSrc: ["'self'", "https:"],
        scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'", 'https://apis.google.com'],
    }
}));
const CheckAPIKey = (Key) => {
    return Key === process.env.backend_Key;
};
const MiddleWare = (req, res, next) => {
    const APIKey = req.query.key;
    const City = req.query.city;
    if (!APIKey || !CheckAPIKey(APIKey)) {
        return res.status(401).json({ error: "Invaild API Key!" });
    }
    ;
    if (!City) {
        return res.status(404).json({ error: "No city provided!" });
    }
    ;
    next();
};
app.use(MiddleWare);
app.get("/", (req, res) => {
    res.json({ Backend: "Back end Service." });
});
app.get("/weather", async (req, res) => {
    const city = req.query.city;
    const API = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`;
    try {
        const response = await fetch(API);
        if (!response.ok) {
            console.error(`[ERROR]: HTTP ERROR. status: ${response.status}`);
        }
        const data = await response.json();
        res.json(data);
    }
    catch (error) {
        console.error(`[ERROR]: FAILED TOO SEND REQUEST. ${error}`);
        res.json({ error: "FAILED TO SEND API REQUEST!" });
    }
});
app.listen(PORT, () => {
    console.log(`[BACKEND]: LISTENING ON PORT ${PORT}.`);
});
//# sourceMappingURL=Index.js.map