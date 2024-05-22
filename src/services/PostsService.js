import axios from "axios";

export const getPosts = async (limit) => {
    const response = await axios.get(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}`);
    return response.data;
}

export const getPostDetails = async (postId) => {
    const postData = await axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}`);
    const comments = await axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
    console.log({...postData.data, comments: comments.data})
    return {...postData.data, comments: comments.data};
}