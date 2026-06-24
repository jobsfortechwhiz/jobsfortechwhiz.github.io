const firebaseConfig = {
  apiKey: "AIzaSyAOdRVwmg-Mtfvc2UennLCI-4V1VO5Nnoc",
  authDomain: "storequiz.firebaseapp.com",
  projectId: "storequiz",
  storageBucket: "storequiz.firebasestorage.app",
  messagingSenderId: "462730005071",
  appId: "1:462730005071:web:23d37871959ee5f4e8783a",
  measurementId: "G-SFRF5RK0KT"
};

firebase.initializeApp(firebaseConfig);

const db =
firebase.firestore();

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

const quizIndexSnapshot =
await db.collection("quizzes").get();


const validSlugs =
new Set();

quizIndexSnapshot.forEach(doc => {

validSlugs.add(doc.id);

});

console.log(
"Valid quizzes:",
validSlugs.size
);

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

if(
!validSlugs.has(
firestoreSlug
)
){
   return;
}

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

const box =
document.getElementById("quizSearch");

box.addEventListener("keyup", function(){

console.log(
"TYPING:",
this.value
);

});
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