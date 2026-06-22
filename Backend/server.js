const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

let currentCase = null;

function generateCase() {

    const suspects = [
        {
            name: "Alex Mercer",
            alibi: "I was at the gym until midnight.",
            victim: "We argued last week.",
            evidence: "My fingerprints are on the glass."
        },
        {
            name: "Jordan Blake",
            alibi: "I was at home watching TV.",
            victim: "The victim owed me money.",
            evidence: "I have never been to the mansion."
        },
        {
            name: "Riley Stone",
            alibi: "I was working late.",
            victim: "We were business partners.",
            evidence: "I lost my watch yesterday."
        }
    ];

    const killerIndex =
        Math.floor(Math.random() * suspects.length);

    currentCase = {
        killer: suspects[killerIndex].name
    };

    return {
        title: "The Last Clue",

        story:
        "A billionaire was found dead inside an abandoned mansion.",

        clues: [
            "A broken watch was found.",
            "Security cameras were disabled.",
            "A muddy footprint was discovered."
        ],

        evidence: [
            "📸 Security footage corrupted",
            "⌚ Broken watch",
            "👣 Muddy footprint",
            "📄 Financial records"
        ],

        suspects
    };
}

app.get("/api/case", (req, res) => {

    const mysteryCase =
        generateCase();

    res.json(mysteryCase);
});

app.post("/api/accuse", (req, res) => {

    const suspect =
        req.body.suspect;

    if (!currentCase) {

        return res.status(400).json({
            error: "No active case."
        });
    }

    const correct =
        suspect === currentCase.killer;

    res.json({
        correct
    });
});

const PORT = 5000;

app.listen(PORT, () => {
    console.log(
        `🔥 Server running on http://localhost:${PORT}`
    );
});