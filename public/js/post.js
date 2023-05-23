const newFormHandler = async (event) => {
    event.preventDefault();

    const comment_text = document.querySelector('#new-comment-form').value.trim();
    const post_id = parseInt(window.location.pathname.split('/').pop());

    if (comment) {
        const requestBody = { contents: comment_text, post_id: post_id };
        console.log(requestBody); 

        const response = await fetch(`/api/comments/`, {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            document.location.replace('/post/' + postId);
        } else {
            alert('Failed to create post');
        }
    }
};


const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');

        const response = await fetch(`/api/posts/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Failed to delete post');
        }
    }
};

document
    .querySelector('.comment-text')
    .addEventListener('submit', newFormHandler);