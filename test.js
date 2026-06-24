

const slug =
new URLSearchParams(
window.location.search
).get("slug");

console.log("Slug =", slug);

if(slug === "quizlet"){

 renderQuizletPage();

}
async function renderQuizletPage(){

const res = await fetch(
"https://generate-quiz-ten.vercel.app/api/bloggerFeed"
);

const data = await res.json();

let html = `
<input
id="quizSearch"
type="text"
placeholder="Search quiz by title..."
class="quiz-search">
<div id="quiz-post-cards"></div>

`;

document.getElementById(
"page-content"
).innerHTML = html;

let cards = "";

data.feed.entry.forEach(post => {

   const title =
   post.title.$t;

   const postUrl =
post.link.find(function(l){
   return l.rel === "alternate";
}).href;

const firestoreSlug =
postUrl
.split("/")
.pop()
.replace(".html","");

   const labels =
   post.category
   ? post.category.map(c => c.term)
   : [];

    if (
    labels.some(function(label){
        return label.toLowerCase()
        .includes("managerial interview questions");
    })
){
    return;
}
const box =
document.getElementById("quizSearch");

box.addEventListener("keyup", function(){

console.log(
"TYPING:",
this.value
);

});
 cards += `
<div class="quiz-post-card"
     onclick="openQuiz(this)"
     data-slug="${firestoreSlug}"
     data-title="${title.toLowerCase()}">

   <span>${title}</span>

</div>
`;

});

document.getElementById(
"quiz-post-cards"
).innerHTML = cards;
console.log(cards.length);
// ----------search---------------
document.getElementById("quizSearch")
.addEventListener("input", function(){

const search =
this.value.toLowerCase().trim();

document
.querySelectorAll(".quiz-post-card")
.forEach(card => {

const text =
card.getAttribute("data-title");

card.style.display =
text.includes(search)
? "flex"
: "none";

});

});
}

function openQuiz(card){

const slug =
card.getAttribute(
"data-slug"
);
console.log("Opening quiz =", slug);
window.location.href =
"/tech-quiz.html?slug=" +
encodeURIComponent(slug);



}