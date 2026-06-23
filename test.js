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

   if(
   labels.includes(
   "HR|Managerial interview Questions"
   )
   ){
      return;
   }

   cards += `
<div class="quiz-post-card"
     onclick="openQuiz(this)"
     data-slug="${firestoreSlug}">

   <span>${title}</span>

</div>
`;

});

document.getElementById(
"quiz-post-cards"
).innerHTML = cards;
console.log(cards.length);
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