const slug =
new URLSearchParams(
window.location.search
).get("slug");

function loadPage(data){

    const page =
    data.feed.entry.find(item=>{

        const pageSlug =
        item.title.$t
        .toLowerCase()
        .replace(/[^a-z0-9]+/g,"-")
        .replace(/^-|-$/g,"");

        return pageSlug === slug;

    });

    if(!page){

        document.getElementById(
            "page-content"
        ).innerHTML =
        "<h2>Page not found</h2>";

        return;
    }
let content = page.content.$t;
content = content.replace(
    /Interview\s*Prep\s*For\s*Insiders/gi,
    "JobsForTechWhiz"
);
if(slug === "privacy-policy"){

    content = content.replace(
        /Last Updated:.*?</i,
        "Last Updated: 9 June 2026<"
    ); 

}
if(slug === "contact-us"){

setTimeout(()=>{

const postContent =
document.getElementById("page-content");

if(!postContent) return;

/* Update old bullet text */

postContent.innerHTML =
postContent.innerHTML

.replace(
/WhatsApp Support/gi,
"WhatsApp Support"
)

.replace(
/Comment Section/gi,
"Live AI Chat"
)
.replace(
/side panel/gi,
"footer section of page"
)
.replace(
/Contact Form/gi,
"Email Support"
);

/* Add extra content */

postContent.insertAdjacentHTML(
"beforeend",
`

<h2>Connect With Us</h2>

<p>
Need help with Interview PDFs, payment issues,
quiz access, downloads, or technical guidance?
Choose any of the support options below.
</p>

<div class="contact-options">

<a
href="https://wa.me/919129520224"
target="_blank"
class="contact-option">

<img
src="images/whatsapp.png"
alt="WhatsApp Support">

<div>WhatsApp Support</div>

</a>

<a
href="https://mail.google.com/mail/?view=cm&fs=1&to=pnigam342@gmail.com"
target="_blank" class="contact-option">

<img
src="images/gmail.png"
alt="Email Support">

<div>Email Support</div>

</a>

<a
href="#"
onclick="document.getElementById('jftw-chat-btn').click();return false;"
class="contact-option">

<img
src="images/live.png"
alt="Live Chat">

<div>Live AI Chat</div>

</a>

</div>

`
);

},1000);

}
    document.title =
    page.title.$t;

   document.getElementById(
    "page-content"
).innerHTML = `
    <h1>${page.title.$t}</h1> 
    ${content}   
`;
}

const script =
document.createElement("script");

script.src =
"https://interviewprepforinsiders.blogspot.com/feeds/pages/default?alt=json-in-script&max-results=500&callback=loadPage";

document.body.appendChild(script);

console.log("SCRIPT LOADED OK");

window.showEmailBox = function(v){

  console.log("clicked:", v);

  const emailBox = document.getElementById("emailBox"+v);
  const buyBtn = document.getElementById("buyBtn"+v);

  if(!emailBox || !buyBtn){
    console.error("Missing elements:", v);
    return;
  }

  emailBox.style.display = "block";
  buyBtn.style.display = "none";
};


window.submitAndPay = function(v, url){

  let email = document.getElementById("buyerEmail"+v).value.trim();

  let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if(!emailPattern.test(email)){
    alert("Enter valid email");
    return;
  }

  navigator.sendBeacon(
    "https://docs.google.com/forms/d/e/1FAIpQLSdcPc3yb6bWTRGvhrgnxW53OiJ4EVycZK4aMLSim5R44hKMdw/formResponse",
    new URLSearchParams({
      "entry.733654357": email
    })
  );

  window.location.href = url;
};