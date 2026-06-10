async function sendMessage() {

    const input = document.getElementById("message");

    const message = input.value.trim();

    if (!message) return;

    const chatBox = document.getElementById("chat-box");

    chatBox.innerHTML += `
        <div class="user">
            <strong>You:</strong> ${message}
        </div>
    `;

    input.value = "";

    const response = await fetch("/chat", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            message: message
        })
    });

    const data = await response.json();

    chatBox.innerHTML += `
        <div class="assistant">
            <strong>Insure AI:</strong> ${data.response}
        </div>
    `;

    chatBox.scrollTop = chatBox.scrollHeight;
}