document.addEventListener('DOMContentLoaded', () => {
    const actionForm = document.getElementById('commentFormAction');
    const comedyForm = document.getElementById('commentFormComedy');
    const dramaForm = document.getElementById('commentFormDrama');

    loadComments('Action');
    loadComments('Comedy');
    loadComments('Drama');

    if (actionForm) {
        actionForm.addEventListener('submit', function(e) {
            e.preventDefault();
            addComment('Action');
        });
    }

    if (comedyForm) {
        comedyForm.addEventListener('submit', function(e) {
            e.preventDefault();
            addComment('Comedy');
        });
    }

    if (dramaForm) {
        dramaForm.addEventListener('submit', function(e) {
            e.preventDefault();
            addComment('Drama');
        });
    }
});

function loadComments(genre) {
    const commentsList = document.getElementById(`commentsList${genre}`);
    const comments = JSON.parse(localStorage.getItem(`comments${genre}`)) || [];

    comments.forEach(comment => {
        displayComment(comment.name, comment.message, commentsList, genre);
    });
}

function addComment(genre) {
    const name = document.getElementById(`name${genre}`).value;
    const message = document.getElementById(`message${genre}`).value;
    const commentsList = document.getElementById(`commentsList${genre}`);
    const comments = JSON.parse(localStorage.getItem(`comments${genre}`)) || [];

    if (name && message) {
        const comment = { name, message };
        comments.push(comment);
        localStorage.setItem(`comments${genre}`, JSON.stringify(comments));

        displayComment(name, message, commentsList, genre);

        document.getElementById(`name${genre}`).value = '';
        document.getElementById(`message${genre}`).value = '';
    }
}

function displayComment(name, message, commentsList, genre) {
    const comment = document.createElement('div');
    comment.classList.add('comment');
    comment.innerHTML = `<div><strong>${name}</strong><p>${message}</p></div><button onclick="deleteComment('${name}', '${message}', '${genre}')">Delete</button>`;
    commentsList.appendChild(comment);
}

function deleteComment(name, message, genre) {
    const commentsList = document.getElementById(`commentsList${genre}`);
    let comments = JSON.parse(localStorage.getItem(`comments${genre}`)) || [];
    comments = comments.filter(comment => comment.name !== name || comment.message !== message);
    localStorage.setItem(`comments${genre}`, JSON.stringify(comments));

    commentsList.innerHTML = '';
    comments.forEach(comment => {
        displayComment(comment.name, comment.message, commentsList, genre);
    });
}

const genres = [
    { name: "Action", url: "action.html" },
    { name: "Thriller", url: "thriller.html" },
    { name: "Romance", url: "romance.html" },
    { name: "Comedy", url: "comedy.html" },
    { name: "Horror", url: "horror.html" },
    { name: "Science Fiction", url: "scifi.html" },
    { name: "Drama", url: "drama.html" },
    { name: "Documentary", url: "documentary.html" },
    { name: "WebSeries", url: "webseries.html" },
    { name: "Anime", url: "anime.html" },
];

// Function to create and append list items
function populateGenresList() {
    const genresList = document.getElementById('genres-list');

    genres.forEach(genre => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = genre.url;
        a.textContent = genre.name;
        li.appendChild(a);
        genresList.appendChild(li);
    });
}

// Call the function to populate the list
populateGenresList();