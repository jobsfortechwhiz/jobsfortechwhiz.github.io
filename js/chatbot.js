const CHAT_API =
"https://script.google.com/macros/s/AKfycbxs4_UAGEdcqWfVUjfDeTs-IRPhnIvR8poqkkZ4qnCny5QaFaTbvQXM3kHONplHUek";

$(document).on(
"click",
"#jftw-send",
function(){

    const msg =
    $("#jftw-input")
    .val()
    .trim();

    if(!msg) return;

    $("#jftw-messages")
    .append(`
      <div class="user-msg">
        ${msg}
      </div>
    `);

    $("#jftw-input")
    .val("");

    $("#jftw-messages")
    .append(`
      <div id="typing">
        Assistant is typing...
      </div>
    `);

    $.ajax({

      url: CHAT_API,

      method: "POST",

      contentType:
      "application/json",

      data:
      JSON.stringify({
        message: msg
      }),

      success: function(res){

          $("#typing").remove();

          const data =
          typeof res === "string"
          ? JSON.parse(res)
          : res;

          $("#jftw-messages")
          .append(`
             <div class="bot-msg">
                ${data.reply}
             </div>
          `);

          $("#jftw-messages")
          .scrollTop(
             $("#jftw-messages")[0]
             .scrollHeight
          );

      },

      error:function(){

          $("#typing").remove();

          $("#jftw-messages")
          .append(`
            <div class="bot-msg">
              Service unavailable.
            </div>
          `);

      }

    });

});

$(document).on(
"click",
"#jftw-chat-btn",
function(){

$("#jftw-chat-window")
.toggle();

});