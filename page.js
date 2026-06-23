const slug =
new URLSearchParams(
window.location.search
).get("slug");
/*if(slug === "quizlet"){
   window.location.href =
   "https://interviewprepforinsiders.blogspot.com/p/quizlet.html";
} */
async function loadPage() {

  const slug =
  new URLSearchParams(
    window.location.search
  ).get("slug");

  if(slug === "quizlet") {

     const res = await fetch(
        `https://generate-quiz-ten.vercel.app/api/bloggerPage?slug=${slug}`
     );

     const data = await res.json();

     console.log(data);
     const entries = data.feed.entry;
  }

}

loadPage();

document.getElementById(
"pageContent"
).innerHTML = html;
function loadPage(data){
data.feed.entry.forEach(item => {

    console.log(
        item.title.$t,
        "=>",
        item.title.$t
        .toLowerCase()
        .replace(/[^a-z0-9]+/g,"-")
        .replace(/^-|-$/g,"")
    );

});
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
    console.log(page);
console.log(page.content.$t);
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
href="mailto:pnigam342@gmail.com?subject=Contact Support"
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

setTimeout(() => {

    if(typeof buyPDF === "function"){

        window.buyPDF = function(pdfId){

            window.location.href =
            "page.html?slug=payment&pdf=" +
            encodeURIComponent(pdfId);

        };

    }

},500);
setTimeout(() => {

    document
    .querySelectorAll('#page-content script')
    .forEach(oldScript => {

        const s =
        document.createElement('script');

        if(oldScript.src){
            s.src = oldScript.src;
        }else{
            s.textContent =
            oldScript.textContent;
        }

        document.body.appendChild(s);

    });

},100);
document
.querySelectorAll('#page-content a')
.forEach(link => {

    const href = link.getAttribute('href');

    if(
        href &&
        href.startsWith('/p/')
    ){

        const slug = href
        .replace('/p/','')
        .replace('.html','');

        link.href =
        `page.html?slug=${slug}`;
    }

});

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