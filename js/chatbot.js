const CHAT_API =
"https://script.google.com/macros/s/AKfycbxs4_UAGEdcqWfVUjfDeTs-IRPhnIvR8poqkkZ4qnCny5QaFaTbvQXM3kHONplHUek/exec";

function initChatbot() {

    const btn =
      document.getElementById(
        "jftw-chat-btn"
      );

    const win =
      document.getElementById(
        "jftw-chat-window"
      );

    const sendBtn =
      document.getElementById(
        "jftw-send"
      );

    const input =
      document.getElementById(
        "jftw-input"
      );

    const messages =
      document.getElementById(
        "jftw-messages"
      );

    if(!btn) return;

    btn.addEventListener(
      "click",
      function(){

        if(
          getComputedStyle(win)
          .display === "none"
        ){

          win.style.display =
          "flex";

        } else {

          win.style.display =
          "none";

        }

      }
    );

    sendBtn.addEventListener(
      "click",
      sendMessage
    );

    input.addEventListener(
      "keypress",
      function(e){

        if(e.key === "Enter"){
          sendMessage();
        }

      }
    );

    function sendMessage(){

      const msg =
      input.value.trim();

      if(!msg) return;

      messages.innerHTML +=
      `<div class="user-msg">${msg}</div>`;

      input.value = "";

      fetch(CHAT_API,{
        method:"POST",
        headers:{
          "Content-Type":
          "text/plain"
        },
        body:JSON.stringify({
          message:msg
        })
      })
      .then(r=>r.json())
    .then(data => {

    if(data.reply === "__FOCUS_SEARCH__"){

        const search =
        document.getElementById("search");

        if(search){

    search.scrollIntoView({
        behavior:"smooth",
        block:"center"
    });

    search.focus();

    search.classList.add(
        "search-highlight"
    );

    setTimeout(() => {

        search.classList.remove(
            "search-highlight"
        );

    },3000);

}else{

    const query =
    encodeURIComponent(msg);

    window.location.href =
    `blogs.html?search=${query}`;

    return;

}
       

    }
else if(data.action === "category"){

    messages.innerHTML += `
    <div class="bot-msg">
      ${data.response}

      <br><br>

      <button
      onclick="
      window.location.href=
      'blogs.html?cate=${encodeURIComponent(data.category)}'
      ">
      View Java Articles →
      </button>

    </div>`;
}
    else{

        messages.innerHTML +=
        `<div class="bot-msg">
          ${data.reply}
        </div>`;

    }

    messages.scrollTop =
    messages.scrollHeight;

})
.catch(() => {

    messages.innerHTML +=
    `<div class="bot-msg">
      Service unavailable.
    </div>`;

});

    }

}
