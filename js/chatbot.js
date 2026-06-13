const CHAT_API =
"https://script.google.com/macros/s/AKfycbxs4_UAGEdcqWfVUjfDeTs-IRPhnIvR8poqkkZ4qnCny5QaFaTbvQXM3kHONplHUek/exec";

document.addEventListener("DOMContentLoaded", function () {

    const btn =
        document.getElementById("jftw-chat-btn");

    const win =
        document.getElementById("jftw-chat-window");

    const sendBtn =
        document.getElementById("jftw-send");

    const input =
        document.getElementById("jftw-input");

    const messages =
        document.getElementById("jftw-messages");

    btn.addEventListener("click", function () {

        if (
            getComputedStyle(win).display === "none"
        ) {
            win.style.display = "flex";
        } else {
            win.style.display = "none";
        }

    });

    sendBtn.addEventListener("click", sendMessage);

    input.addEventListener("keypress", function (e) {

        if (e.key === "Enter") {
            sendMessage();
        }

    });

    function sendMessage() {

        const msg = input.value.trim();

        if (!msg) return;

        messages.innerHTML +=
            `<div class="user-msg">${msg}</div>`;

        input.value = "";

        fetch(CHAT_API, {

            method: "POST",

            headers: {
                "Content-Type":
                "application/json"
            },

            body: JSON.stringify({
                message: msg
            })

        })
        .then(r => r.json())
        .then(data => {
console.log("Response:", data);
            messages.innerHTML +=
                `<div class="bot-msg">${data.reply}</div>`;

            messages.scrollTop =
                messages.scrollHeight;

        })
        .catch(() => {

            messages.innerHTML +=
                `<div class="bot-msg">Service unavailable.</div>`;

        });

    }

});