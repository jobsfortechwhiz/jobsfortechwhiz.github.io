let allPosts = [];
let currentPage = 1;
const postsPerPage = 9;
let currentCategory = "All";
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
 allPosts = data.feed.entry;
//console.log(allPosts.length);
renderCategories();
renderPosts();

    // const container =
    // document.getElementById("posts-container");

    // container.innerHTML = "";

    posts.forEach(post => {

const imgMatch =
post.content.$t.match(/<img[^>]+src="([^">]+)"/i);

if(imgMatch){

    console.log("POST:", title);
    console.log("IMAGE URL:", imgMatch[1]);

    thumbnail = imgMatch[1];
}

console.log("TITLE:", title);
console.log("THUMB:", thumbnail);

    });

}
//  changing  href="${postUrl}" with   href="post.html?url=${encodedUrl}"> 
// so that on clicking read more blogger url will come as a query parameter ? 
function renderCategories(){

    const categories = new Set(["All"]);

    allPosts.forEach(post => {

        if(post.category){

            post.category.forEach(cat => {

                categories.add(cat.term);

            });

        }

    });

    const container =
    document.getElementById("category-filters");

    container.innerHTML = "";

    categories.forEach(cat => {

        container.innerHTML += `
        <button
        class="cat-btn"
        onclick="filterCategory('${cat}')">

        ${cat}

        </button>
        `;

    });

}
function filterCategory(category){

    currentCategory = category;
    currentPage = 1;

    renderPosts();

}
function renderPosts(){

    const container =
    document.getElementById("posts-container");

    container.innerHTML = "";

    let filteredPosts =
    allPosts;

    if(currentCategory !== "All"){

        filteredPosts =
        allPosts.filter(post =>

            post.category &&
            post.category.some(
                cat => cat.term === currentCategory
            )

        );

    }

    const start =
    (currentPage - 1) * postsPerPage;

    const end =
    start + postsPerPage;

    const pagePosts =
    filteredPosts.slice(start,end);

    pagePosts.forEach(post => {

       const title = post.title.$t;

        const content =
        post.content.$t
        .replace(/<[^>]+>/g,'');

        const summary =
        content.substring(0,200);

        const postId =
post.id.$t.split("-").pop();
let thumbnail = "";
let labels = "";

if(post.category){

    labels = post.category
    .map(cat =>
      `<span class="tag">${cat.term}</span>`
    )
    .join("");
}

if(post.media$thumbnail){
    thumbnail = post.media$thumbnail.url;
}

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

    renderPagination(filteredPosts.length);

}
function renderPagination(totalPosts){

    const pages =
    Math.ceil(totalPosts/postsPerPage);

    const container =
    document.getElementById("pagination");

    container.innerHTML = "";

    for(let i=1;i<=pages;i++){

        container.innerHTML += `
        <button
        class="page-btn"
        onclick="changePage(${i})">

        ${i}

        </button>
        `;

    }

}
function changePage(page){

    currentPage = page;

    renderPosts();

    window.scrollTo({
        top:0,
        behavior:"smooth"
    });

}
const script =
document.createElement("script");

script.src =
"https://interviewprepforinsiders.blogspot.com/feeds/posts/default?alt=json-in-script&max-results=35&callback=loadPosts";

document.body.appendChild(script);