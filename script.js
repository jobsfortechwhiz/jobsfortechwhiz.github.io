let searchTerm = ""; //right now on searching any text only current paginated page cards r showing not from
                       //page 2,3,4 .now we want search through all pages 
let allPosts = []; 
let currentPage = 1;
const postsPerPage = 9;
let currentCategory = "All";

const params =
new URLSearchParams( /*added this to search exact user query on search_focus */
window.location.search
);

const q =
params.get("search");

if(q){

    const searchBox =
    document.getElementById("search");

    if(searchBox){

        searchBox.value = q;

        searchTerm =
        q.toLowerCase();

        renderPosts();

        searchBox.classList.add(
            "search-highlight"
        );

        searchBox.scrollIntoView({
            behavior:"smooth",
            block:"center"
        });

    }

}

const urlCategory =
new URLSearchParams(   /*added this to make post page header nav clickable */
window.location.search
).get("category");

const urlGroup =
new URLSearchParams(   /*added this to make post page header java nav clickable */
window.location.search 
).get("group");
const cat=
new URLSearchParams(
location.search
).get("cate");

if(cat){

currentCategory=cat;

renderPosts();

}
document
.getElementById("search")
.addEventListener("input",function(){
    searchTerm =
    this.value.toLowerCase();

    currentPage = 1;

    renderPosts();
    // const term =
    // this.value.toLowerCase();

    // document
    // .querySelectorAll(".post-card")
    // .forEach(card=>{

    //     const title =
    //     card.querySelector("h2")
    //     .innerText
    //     .toLowerCase();

    //     card.style.display =
    //     title.includes(term)
    //     ? ""
    //     : "none";

    // });

});
function loadPosts(data){
    const featured =
allPosts.slice(0,3);
console.log("RENDERING POST");
const featuredContainer =
document.getElementById(
"featured-posts"
);

featured.forEach(post=>{

const slug =
post.title.$t
.toLowerCase()
.replace(/[^a-z0-9]+/g,"-")
.replace(/^-|-$/g,"");


document.getElementById(
    "post-content"
).innerHTML = `
    <h1>${post.title.$t}</h1>
    <div>${content}</div>
`;

});
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

 if(urlCategory){
                       /*added this to make post page header nav clickable */
    currentCategory =
    decodeURIComponent(
        urlCategory
    );

}

if(urlGroup === "java"){

    currentCategory = "JAVA_GROUP";

}

renderFeaturedPosts();
renderSidebarCategories();
renderCategories();renderLatestPosts();
renderPosts();

   

    posts.forEach(post => {


    });

}
//  changing  href="${postUrl}" with   href="post.html?url=${encodedUrl}"> 
// so that on clicking read more blogger url will come as a query parameter ? 
function renderLatestPosts(){

const container =
document.getElementById(
"latest-posts"
);

container.innerHTML = "";

allPosts.slice(0,5).forEach(post=>{

const slug =
post.title.$t
.toLowerCase()
.replace(/[^a-z0-9]+/g,"-")
.replace(/^-|-$/g,"");

container.innerHTML += `

<div>

<a href="post.html?slug=${slug}">

${post.title.$t}

</a>

</div>

`;

});

}
function renderSidebarCategories(){

const container =
document.getElementById(
"sidebar-categories"
);

container.innerHTML = "";

const categories =
new Set();

allPosts.forEach(post=>{

if(post.category){

post.category.forEach(cat=>{

categories.add(cat.term);

});

}

});

categories.forEach(cat=>{

container.innerHTML += `

<div>

<a href="#"
onclick="filterCategory('${cat}')">

${cat}

</a>

</div>

`;

});

}
function renderFeaturedPosts(){

const featuredContainer =
document.getElementById(
"featured-posts"
);

featuredContainer.innerHTML = "";

allPosts.slice(0,5).forEach(post => {

const slug =
post.title.$t
.toLowerCase()
.replace(/[^a-z0-9]+/g,"-")
.replace(/^-|-$/g,"");

featuredContainer.innerHTML += `

<div class="featured-card">

<a href="post.html?slug=${slug}">
${post.title.$t}
</a>

</div>

`;

});

}
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
      class="cat-btn ${cat === currentCategory ? 'active' : ''}"
        onclick="filterCategory('${cat}')">

        ${cat}

        </button>
        `;

    });

}
window.showJavaGroup = function(){

    currentPage = 1;

    const container =
    document.getElementById("posts-container");

    container.innerHTML = "";

    const filteredPosts =
    allPosts.filter(post => {

        const cat =
        post.category?.[0]?.term;

        return [

            'Java interview Questions',

            'Spring interview Questions',

            'Android interview Questions'

        ].includes(cat);

    });

    filteredPosts.forEach(post => {

       const title = post.title.$t;

       const slug = title
       .toLowerCase()
       .replace(/[^a-z0-9]+/g,"-")
       .replace(/^-|-$/g,"");

       const content =
       post.content.$t
       .replace(/<style[\s\S]*?<\/style>/gi,'')
       .replace(/<script[\s\S]*?<\/script>/gi,'')
       .replace(/<[^>]+>/g,'');

       const summary =
       content.substring(0,200);

       let labels = "";

       if(post.category){

           labels = post.category
           .map(cat =>
             `<span class="tag">${cat.term}</span>`
           )
           .join("");
       }

       container.innerHTML += `

       <div class="post-card">

           ${labels}

           <h2>${title}</h2>

           <p>${summary}...</p>

           <a class="read-more"
             href="post.html?slug=${slug}">
             Read More
           </a>

       </div>
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
if(currentCategory === "JAVA_GROUP"){

    filteredPosts =
    allPosts.filter(post =>

        post.category &&
        post.category.some(cat =>

            [
                 "Java interview Questions",
        "Spring interview Questions",
        "Android interview Questions"
            ].includes(cat.term)

        )

    );

}
else if(currentCategory !== "All"){

    filteredPosts =
    allPosts.filter(post =>

        post.category &&
        post.category.some(
            cat => cat.term === currentCategory
        )

    );

}
    // if(currentCategory !== "All"){

    //     filteredPosts =
    //     allPosts.filter(post =>

    //         post.category &&
    //         post.category.some(
    //             cat => cat.term === currentCategory
    //         )

    //     );

    // }
if(searchTerm){

    filteredPosts =
    filteredPosts.filter(post =>

        post.title.$t
        .toLowerCase()
        .includes(searchTerm)

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
       const slug = title
.toLowerCase()                      //to change url query string with path variable {? -> /}
.replace(/[^a-z0-9]+/g,"-")
.replace(/^-|-$/g,"");

       const content =
post.content.$t

.replace(/<style[\s\S]*?<\/style>/gi,'')

.replace(/<script[\s\S]*?<\/script>/gi,'')

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
      href="post.html?slug=${slug}">
       Read More
    </a>

</div>
`;

    });

    renderPagination(filteredPosts.length);
    console.log(
"Filtered Posts:",
filteredPosts.length
);

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
       class="page-btn ${i===currentPage ? 'active-page' : ''}"
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
"https://interviewprepforinsiders.blogspot.com/feeds/posts/default?alt=json-in-script&max-results=500&callback=loadPosts";

document.body.appendChild(script);