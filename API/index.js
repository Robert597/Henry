import Axios from "axios";

const Api = Axios.create({ baseURL: "https://cute-jade-coral-tutu.cyclic.app/"});
Api.interceptors.request.use((req) => {
    if(localStorage.getItem('profile')){
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }

    return req;
})
export const fetchPosts = () => Api.get('/products');
export const createPosts = (url, post) => Api.post(url, post);
export const updatePosts = (url, post) => Api.patch(url, post);
export const deletePost = (url) => Api.delete(url);