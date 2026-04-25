/* ===== ESTADO ===== */
let points = Number(localStorage.getItem("points")) || 0;
let currentTheme = Number(localStorage.getItem("currentTheme")) || 1;

const startBtn = document.getElementById("startBtn");
const pointsSpan = document.getElementById("points");
const exercise = document.getElementById("exercise");

const title = document.querySelector("#exercise h2");
const wordsContainer = document.querySelector(".words");
const answerBox = document.getElementById("answer");

const checkBtn = document.getElementById("checkBtn");
const retryBtn = document.getElementById("retryBtn");
const nextBtn = document.getElementById("nextBtn");
const feedback = document.getElementById("feedback");

pointsSpan.textContent = points;

/* ===== TEMAS ===== */
const themes = [
  { title: "Tema 1: Preséntate", type:"order", correct:"my name is Carlos", words:["my","name","is","Carlos"] },
  { title: "Tema 2: Colores", type:"order", correct:"This shirt is blue", words:["This","shirt","is","blue"] },
  { title: "Tema 3: Números", type:"order", correct:"I have two pets", words:["I","have","two","pets"] },
  { title: "Tema 4: Gustos", type:"order", correct:"I like pizza", words:["I","like","pizza"] },
  { title: "Tema 5: No me gusta", type:"order", correct:"I don't like coffee", words:["I","don't","like","coffee"] },
  { title: "Tema 6: He / She", type:"order", correct:"She likes music", words:["She","likes","music"] },
  { title: "Tema 7: He doesn't like", type:"order", correct:"He doesn't like coffee", words:["He","doesn't","like","coffee"] },
  { title: "Tema 8: Rutinas", type:"order", correct:"She works every day", words:["She","works","every","day"] },
  { title: "Tema 9: Frecuencia", type:"order", correct:"I usually study at night", words:["I","usually","study","at","night"] },
  { title: "Tema 10: Preguntas", type:"order", correct:"Do you like music", words:["Do","you","like","music"] },
  { title: "Tema 11: Does she like", type:"order", correct:"Does she like music", words:["Does","she","like","music"] },
  { title: "Tema 12: Pasado simple", type:"order", correct:"I went to school yesterday", words:["I","went","to","school","yesterday"] },
  { title: "Tema 13: Experiencias", type:"order", correct:"I have been to Mexico", words:["I","have","been","to","Mexico"] },
  { title: "Tema 14: Futuro cercano", type:"order", correct:"I am going to study tomorrow", words:["I","am","going","to","study","tomorrow"] },
  { title: "Tema 15: Opiniones", type:"order", correct:"I think pizza is good because it's delicious", words:["I","think","pizza","is","good","because","it's","delicious"] },
  { title: "Tema 16: Comparaciones", type:"order", correct:"Pizza is better than burgers", words:["Pizza","is","better","than","burgers"] },
  { title: "Tema 17: Acuerdo", type:"order", correct:"I agree", words:["I","agree"] },
  { title: "Tema 18: Razones", type:"order", correct:"I like pizza but I don't like pasta", words:["I","like","pizza","but","I","don't","like","pasta"] },
  { title: "Tema 19: Conversación", type:"free", prompt:"What do you think about pizza?" },
  { title: "Tema 20: Gaming", type:"free", prompt:"What video games do you like and why?" },
  { title: "Tema 21: Viajes", type:"free", prompt:"Where have you traveled and where are you going next?" },
  { title: "Tema 22: Trabajo", type:"free", prompt:"What do you do or study, and do you like it?" },
  { title: "Tema 23: Estudios", type:"free", prompt:"What are you studying or what would you like to study in the future?" }
];

/* ===== UTILIDADES ===== */
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function saveProgress() {
  localStorage.setItem("points", points);
  localStorage.setItem("currentTheme", currentTheme);
}

function getLevel() {
  if (points < 80) return "A1 Básico";
  if (points < 140) return "A2 Funcional";
  return "B1 Inicial";
}

/* ===== INICIAR ===== */
startBtn.addEventListener("click", () => {
  exercise.style.display = "block";
  loadTheme();
});

/* ===== CARGAR ===== */
function loadTheme() {
  if (currentTheme > themes.length) {
    showStats();
    return;
  }

  const theme = themes[currentTheme - 1];

  title.textContent = theme.title;
  answerBox.textContent = "";
  feedback.textContent = "";
  feedback.className = "";

  retryBtn.style.display = "none";
  nextBtn.style.display = "none";
  wordsContainer.innerHTML = "";

  if (theme.type === "order") {
    shuffleArray(theme.words);
    theme.words.forEach(word => {
      const btn = document.createElement("button");
      btn.className = "word";
      btn.textContent = word;
      btn.onclick = () => {
        answerBox.textContent += word + " ";
        btn.disabled = true;
      };
      wordsContainer.appendChild(btn);
    });
  } else {
    wordsContainer.innerHTML = `
      <p><strong>${theme.prompt}</strong></p>
      <textarea id="freeInput" rows="3" style="width:100%; margin-top:10px;"></textarea>
    `;
  }
}

/* ===== REVISAR ===== */
checkBtn.addEventListener("click", () => {
  const theme = themes[currentTheme - 1];

  if (theme.type === "order") {
    if (answerBox.textContent.trim() === theme.correct) {
      correct();
    } else {
      wrong();
    }
  } else {
    const text = document.getElementById("freeInput").value.trim();
    text.length > 0 ? correct() : wrong("Write something");
  }
});

function correct() {
  feedback.textContent = "✅ Correcto";
  feedback.className = "correct";
  points += 10;
  pointsSpan.textContent = points;
  saveProgress();
  nextBtn.style.display = "block";
}

function wrong(msg = "Incorrecto") {
  feedback.textContent = "❌ " + msg;
  feedback.className = "incorrect";
}

/* ===== SIGUIENTE ===== */
nextBtn.addEventListener("click", () => {
  currentTheme++;
  saveProgress();
  loadTheme();
});

/* ===== ESTADÍSTICAS ===== */
function showStats() {
  title.textContent = "🎉 Progreso completado";
  wordsContainer.innerHTML = `
    <p><strong>Puntos:</strong> ${points}</p>
    <p><strong>Temas completados:</strong> ${themes.length}</p>
    <p><strong>Nivel alcanzado:</strong> ${getLevel()}</p>
    <p>¡Sigue practicando para mejorar!</p>
  `;
  checkBtn.style.display = "none";
  nextBtn.style.display = "none";
  retryBtn.style.display = "none";
}
