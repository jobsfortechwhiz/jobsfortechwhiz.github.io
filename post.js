// const params =
// new URLSearchParams(window.location.search);

// const id =
// params.get("id");
const slug =
new URLSearchParams(
window.location.search
).get("slug");
console.log("POST JS VERSION 999");
function loadPost(data){

const post =
data.feed.entry.find(item => {

const postSlug =
item.title.$t
.toLowerCase()
.replace(/[^a-z0-9]+/g,"-")
.replace(/^-|-$/g,"");

return postSlug === slug;

});
    if(!post){

        document.getElementById(
            "post-content"
        ).innerHTML =
        "<h2>Post not found</h2>";

        return;
    }

  console.log(post.link);

const summary =
post.content.$t
.replace(/<[^>]+>/g,'')
.substring(0,160);


const metaDesc =
document.querySelector(
'meta[name="description"]'
);

if(metaDesc){

metaDesc.setAttribute(
"content",
summary
);

}
const currentCategories =
post.category
? post.category.map(cat => cat.term)
: [];

 
    document.title =
post.title.$t +
" | JobsForTechWhiz";
    console.log(post.content.$t);

   let content = post.content.$t;
console.log(content.substring(0,5000));
content = content.replace(
    /<style[\s\S]*?<\/style>/i,
    ""
);
    content = content.replace(
        /src="\/\//g,
        'src="https://'
    );
// content = content.replace(
//     /<div class="my-top-header">[\s\S]*?<\/div>/i,
//     ""
// );

// content = content.replace(
// /color\s*:\s*black/gi,
// 'color:white'
// );

// content = content.replace(
// /color\s*:\s*#000000/gi,
// 'color:white'
// );

const relatedPosts =
data.feed.entry.filter(item => {

    if(item.id.$t === post.id.$t){
        return false;
    }

    if(!item.category){
        return false;
    }

    return item.category.some(cat =>
        currentCategories.includes(cat.term)
    );

}).slice(0,4);

let finalRelatedPosts = relatedPosts; //for the case when there r no relatable post

if(finalRelatedPosts.length === 0){

    finalRelatedPosts =
    data.feed.entry
    .filter(item =>
        item.id.$t !== post.id.$t
    )
    .slice(0,4);

}
console.log("Related:", relatedPosts.length);
console.log(relatedPosts);
    document.title =
    post.title.$t;
/*
document.getElementById(
    "post-content"
).innerHTML = `
    <h1>${post.title.$t}</h1>
    <div>${content}</div>
`;  */
const slug =
new URLSearchParams(
window.location.search
).get("slug");
const bloggerUrl =
post.link.find(
    l =>
    l.href &&
    l.href.includes("interviewprepforinsiders.blogspot.com")
)?.href;
const quizUrl =
"https://interviewprepforinsiders.blogspot.com/p/quiz.html?url=https://interviewprepforinsiders.blogspot.com/2026/05/terraform-automation-tool.html";
document.getElementById(
    "post-content"
).innerHTML = `

<div class="post-actions">

<a
id="quizBtn"
class="quiz-btn"
href="${quizUrl}"
target="_blank">

📝 Take Quiz

</a>

</div>

<h1>${post.title.$t}</h1>

<div>${content}</div>
`;

setTimeout(() => {

    document
    .querySelectorAll('#post-content script')
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

}, 100);

document
.querySelectorAll('.img-number')
.forEach((el,index)=>{
    el.textContent = index + 1;
});
const oldHeader =
document.querySelector(".my-top-header");

if(oldHeader){
    oldHeader.remove();
}
const wrapper =
document.querySelector("#post-content > div");

const sidebar =
wrapper.querySelector(".sidebar"); /* to fix sidebar ,main ,faq */

const main =
wrapper.querySelector(".main");

const faq =
wrapper.querySelector(".faq-sect");

if(sidebar && main){

    const layout =
    document.createElement("div");

    layout.className =
    "custom-layout";

    wrapper.prepend(layout);

    layout.appendChild(sidebar);
    layout.appendChild(main);

    if(faq){
        wrapper.appendChild(faq);
    }
}
   "post-content"
    const relatedContainer =
document.getElementById(
    "related-posts"
);

relatedContainer.innerHTML = "";
console.log(
document.getElementById("related-posts")
);
finalRelatedPosts.forEach(item=>{

    const title =
    item.title.$t;

    const postSlug =
    item.title.$t
    .toLowerCase()
    .replace(/[^a-z0-9]+/g,"-")
    .replace(/^-|-$/g,"");
    console.log(
"TITLE =", title
);

console.log(
"SLUG =", postSlug
);

    console.log(
    "Related:",
    item.title.$t,
    postSlug
    );

    let thumb = "";

    if(item.media$thumbnail){
        thumb = item.media$thumbnail.url;
    }

    relatedContainer.innerHTML += `
    <div class="related-card">

        ${thumb ? `
        <img
        src="${thumb}"
        class="related-thumb">
        ` : ""}

        <a
        href="post.html?slug=${postSlug}">
        ${title}
        </a>

    </div>
    `;

});

}

const script =
document.createElement("script");

script.src =
"https://interviewprepforinsiders.blogspot.com/feeds/posts/default?alt=json-in-script&max-results=100&callback=loadPost";

document.body.appendChild(script);