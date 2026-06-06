document
.getElementById("search")
.addEventListener("input",function(){

    const term =
    this.value.toLowerCase();

    document
    .querySelectorAll(".post-card")
    .forEach(card=>{

        const title =
        card.querySelector("h2")
        .innerText
        .toLowerCase();

        card.style.display =
        title.includes(term)
        ? ""
        : "none";

    });

});
function loadPosts(data){
    console.log("script.js loaded");
console.log(
  "Total Blogger Posts:",
  data.feed.openSearch$totalResults.$t
);
console.log(
      "Posts Returned:",
      data.feed.entry.length
    );
    const posts = data.feed.entry;

    const container =
    document.getElementById("posts-container");

    container.innerHTML = "";

    posts.forEach(post => {
//console.log(post.content.$t);
//console.log(post.media$thumbnail);
let labels = "";

if(post.category){

    labels =
    post.category
    .map(cat =>
      `<span class="tag">${cat.term}</span>`
    )
    .join("");
}
        const title = post.title.$t;

        const content =
        post.content.$t
        .replace(/<[^>]+>/g,'');

        const summary =
        content.substring(0,200);

        const postId =
post.id.$t.split("-").pop();
let thumbnail = "";

if (post.media$thumbnail) {
    thumbnail = post.media$thumbnail.url;
}

const imgMatch =
post.content.$t.match(/<img[^>]+src="([^">]+)"/i);

if(imgMatch){

    console.log("POST:", title);
    console.log("IMAGE URL:", imgMatch[1]);

    thumbnail = imgMatch[1];
}
// replaced const postUrl =
// post.link.find(
//     l => l.rel === "alternate"
// ).href; with   const postId =
// post.id.$t.split("-").pop(); as i don't want blogger url on clicking read more instead 
// i want that after loading content from blogger site it should come with my 
// current site url not of blogger.
console.log("TITLE:", title);
console.log("THUMB:", thumbnail);
       container.innerHTML += `
<div class="post-card">

  ${thumbnail ? `
<img
src="${thumbnail}"
alt="${title}"
class="post-thumb">
` : ""}
${labels}
    <h2>${title}</h2>

    <p>${summary}...</p>

    <a class="read-more"
       href="post.html?id=${postId}">
       Read More
    </a>

</div>
`;
    });

}
//  changing  href="${postUrl}" with   href="post.html?url=${encodedUrl}"> 
// so that on clicking read more blogger url will come as a query parameter ? 
const script =
document.createElement("script");

script.src =
"https://interviewprepforinsiders.blogspot.com/feeds/posts/default?alt=json-in-script&max-results=35&callback=loadPosts";

document.body.appendChild(script);