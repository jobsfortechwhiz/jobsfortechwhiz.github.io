const params =
new URLSearchParams(window.location.search);

const id =
params.get("id");

function loadPost(data){

    const post =
    data.feed.entry.find(
        item => item.id.$t.includes(id)
    );

    if(!post){

        document.getElementById(
            "post-content"
        ).innerHTML =
        "<h2>Post not found</h2>";

        return;
    }

    console.log(post.content.$t);

    let content = post.content.$t;

    content = content.replace(
        /src="\/\//g,
        'src="https://'
    );

    document.title =
    post.title.$t;

    document.getElementById(
        "post-content"
    ).innerHTML = `
        <h1>${post.title.$t}</h1>
        <div>${content}</div>
    `;
}

const script =
document.createElement("script");

script.src =
"https://interviewprepforinsiders.blogspot.com/feeds/posts/default?alt=json-in-script&max-results=100&callback=loadPost";

document.body.appendChild(script);