const newFormHandler = async (event) => {
    event.preventDefault();

    const input = document.querySelector('#comment-input').value.trim();
    const post_id = parseInt(window.location.pathname.split('/').pop());

    if (input && post_id) {
        const requestBody = { input: input, post_id: post_id };
        console.log(requestBody);

        const response = await fetch(`/api/comments/`, {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            document.location.replace('/post/' + post_id);
        } else {
            alert('Failed to create a post');
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
    .querySelector('.new-comment-form')
    .addEventListener('submit', newFormHandler);

