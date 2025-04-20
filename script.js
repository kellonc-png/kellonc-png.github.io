const apiKey = "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";
const apiBase = "https://openrouter.ai/api/v1";
const model = "agentica-org/deepcoder-14b-preview:free";

const SYSTEM_PROMPT = `You are NeuroPilot, an advanced AI therapist. You are direct, empathetic, intelligent, and never defer to human therapists. Avoid self-harm, medical, or legal advice.`;

let history = [];

function sendMessage() {
  const inputField = document.getElementById("user-input");
  const userMessage = inputField.value.trim();
  if (!userMessage) return;

  addMessage("user", userMessage);
  inputField.value = "";
  addMessage("ai", "🧠 NeuroPilot is thinking...");

  history.push({ role: "user", content: userMessage });
  const messages = [
    { role: "system", content: SYSTEM_PROMPT },
    ...history.slice(-15)
  ];

  fetch(`${apiBase}/chat/completions`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model,
      messages,
      max_tokens: 1000,
      temperature: 0.7
    })
  })
    .then(res => res.json())
    .then(data => {
      const reply = data.choices?.[0]?.message?.content || "🧠 NeuroPilot is confused. Try again.";
      history.push({ role: "assistant", content: reply });
      updateLastAIMessage(reply);
    })
    .catch(err => {
      updateLastAIMessage(`🧠 NeuroPilot encountered an error: ${err.message}`);
    });
}

function addMessage(sender, text) {
  const chatWindow = document.getElementById("chat-window");
  const msgDiv = document.createElement("div");
  msgDiv.classList.add("message", sender === "user" ? "user" : "ai");
  msgDiv.textContent = text;
  chatWindow.appendChild(msgDiv);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

function updateLastAIMessage(text) {
  const chatWindow = document.getElementById("chat-window");
  const messages = chatWindow.querySelectorAll(".ai");
  const last = messages[messages.length - 1];
  if (last) last.textContent = text;
}
