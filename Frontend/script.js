const suspects = [
  "Bruce Wilson",
  "Steve Lance",
  "Peter Crane",
  "Elena Frost",
  "Leah Stone",
  "Malcolm Vane"
];

// 🔊 SOUND SYSTEM
const sfx = {
  click: new Audio("click.mp3"),
  clue: new Audio("clue.mp3"),
  correct: new Audio("correct.mp3"),
  wrong: new Audio("wrong.mp3")
};

function play(sound) {
  if (sfx[sound]) {
    sfx[sound].currentTime = 0;
    sfx[sound].play();
  }
}

let state = {
  killer: "",
  clues: [],
  index: 0,
  selected: null,
  gameOver: false
};

// 💬 emotion memory system
let interrogationCount = {};

const evidenceBox = document.getElementById("evidenceBox");
const suspectBox = document.getElementById("suspectBox");
const chatBox = document.getElementById("chatBox");
const result = document.getElementById("result");

// ===============================
// START NEW CASE
function newCase() {
  state.killer = suspects[Math.floor(Math.random() * suspects.length)];
  state.clues = generateClues();
  state.index = 0;
  state.selected = null;
  state.gameOver = false;

  interrogationCount = {};

  evidenceBox.innerHTML = "";
  result.innerHTML = "";
  chatBox.innerHTML = "Select a suspect to interrogate";

  renderSuspects();
}

// ===============================
function generateClues() {
  return [
    "Security system was tampered with before the incident.",
    "Victim was familiar with the attacker.",
    "Entry was likely planned in advance.",
    "Digital logs show unusual activity.",
    "Multiple suspects overlap in timeline.",
    "Evidence was partially cleaned after the event."
  ].sort(() => Math.random() - 0.5);
}

// ===============================
// NEXT CLUE
function nextClue() {
  if (state.index >= state.clues.length) {
    evidenceBox.innerHTML += `<div class="item">🧠 All clues revealed. Make your deduction.</div>`;
    play("click");
    return;
  }

  const clue = state.clues[state.index];

  const div = document.createElement("div");
  div.className = "item";
  div.innerText = clue;

  evidenceBox.appendChild(div);

  play("clue");

  state.index++;
}

// ===============================
// SUSPECT RENDER
function renderSuspects() {
  suspectBox.innerHTML = "";

  suspects.forEach(name => {
    const div = document.createElement("div");
    div.className = "item";
    div.innerText = name;

    if (state.selected === name) {
      div.classList.add("selected");
    }

    div.onclick = () => {
      state.selected = name;
      interrogate(name);
      renderSuspects();
      play("click");
    };

    suspectBox.appendChild(div);
  });
}

// ===============================
// 🔥 EMOTION SYSTEM
function getEmotion(name) {
  if (!interrogationCount[name]) interrogationCount[name] = 0;

  interrogationCount[name]++;

  if (interrogationCount[name] === 1) return "calm";
  if (interrogationCount[name] === 2) return "nervous";
  if (interrogationCount[name] === 3) return "scared";
  return "panicked";
}

// ===============================
// 💬 INTERROGATION SYSTEM (UPGRADED)
function interrogate(name) {
  const emotion = getEmotion(name);

  const responses = {
    calm: [
      `${name}: I was around, but nothing unusual happened.`,
      `${name}: Everything seemed normal that day.`,
      `${name}: I was in the gym.`,
      `${name}: I went to Mcdonalds for a big mac`,
      `${name}: The day was pretty calm`
    ],
    nervous: [
      `${name}: I… I might have seen something odd.`,
      `${name}: Why are you asking me again?`,
      `${name}: I swear i am not the killer`,
      `${name}: Do you still think it's me`
    ],
    scared: [
      `${name}: I already told you everything I know!`,
      `${name}: Please, I don’t want trouble.`,
      `${name}: Please, I am innocent`,
      `${name}: Why are you looking at me like that.`
    ],
    panicked: [
      `${name}: I DIDN’T DO ANYTHING!`,
      `${name}: You’re mistaken… I swear!`,
      `${name}: Why dont you belive me?!`,
      `${name}: Stop Accusing me !!`,
      `${name}: Please, just leave me alone!`
      
    ]
  };

  let text = responses[emotion][Math.floor(Math.random() * responses[emotion].length)];

  // 🔥 killer behavior (hesitation + pressure reaction)
  if (name === state.killer) {
    if (emotion === "nervous") {
      text += " (brief hesitation...)";
    }
    if (emotion === "scared") {
      text += " (voice shaking)";
    }
    if (emotion === "panicked") {
      text += " (contradiction detected)";
    }
  }

  chatBox.innerHTML = text;
}

// ===============================
// 🔥 FINAL ACCUSATION
function confirm() {
  if (!state.selected) {
    alert("Select a suspect first!");
    return;
  }

  state.gameOver = true;

  if (state.selected === state.killer) {
    result.innerHTML = "🟢 Correct deduction!";
    play("correct");
  } else {
    result.innerHTML = "🔴 Wrong! The killer was " + state.killer;
    play("wrong");
  }

  setTimeout(() => newCase(), 2500);
}

// ===============================
window.onload = newCase;