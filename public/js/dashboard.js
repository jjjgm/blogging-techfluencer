const newFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#post-title').value.trim();
  const content = document.querySelector('#post-content').value.trim();

  if (title && content ) {
    const response = await fetch(`/api/posts`, {
      method: 'POST',
      body: JSON.stringify({content, title }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
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

// DELETE COMMENT
const delCommentHandler = async (event) => {
  if (event.target.hasAttribute('comment-data-id')) {
      const id = event.target.getAttribute('comment-data-id');

      const response = await fetch(`/api/comments/${id}`, {
          method: 'DELETE',
      });

      if (response.ok) {
          document.location.replace('/dashboard');
      } else {
          alert('Failed to delete comment');
      }
  }
};

document
  .querySelector('.new-post-form')
  .addEventListener('submit', newFormHandler);

document
  .querySelector('.post-list')
  .addEventListener('click', delButtonHandler);

  document
  .querySelector('.comments-list')
  .addEventListener('click', delCommentHandler);

