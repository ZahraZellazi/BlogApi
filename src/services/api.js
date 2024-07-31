export const BASE_URL='https://jsonplaceholder.typicode.com/ZahraZellazi/BlogApi';
// Get
export function getAllBlogs() {
    return fetch(`${BASE_URL}/posts?_limit=8`)
        .then(response => response.json())
        .catch(error => console.error('Error fetching blogs:', error));
}

// List
export function listAllBlogs() {
    return fetch(`${BASE_URL}/posts`)
        .then(response => response.json())
        .catch(error => console.error('Error fetching all blogs:', error));
}

// Add 
export function addBlogApi(blog) {
    return fetch(`${BASE_URL}/posts`, {
        method: 'POST',
        body: JSON.stringify(blog),
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
        },
    })
    .then(response => response.json())
    .catch(error => console.error('Error adding blog:', error));
}

// Delete
export function deleteBlogApi(id) {
    return fetch(`${BASE_URL}/posts/${id}`, {
        method: 'DELETE',
    })
    .then(response => response.json())
    .catch(error => console.error('Error deleting blog:', error));
}

// Update 
export function updateBlogApi(id, updatedBlog) {
    return fetch(`${BASE_URL}/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify(updatedBlog),
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
        },
    })
    .then(response => response.json())
    .catch(error => console.error('Error updating blog:', error));
}
