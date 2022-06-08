import axios from "axios";


const API_KEY = '27934875-d5b1ebc788031501deb3449ae';

export default class ApiService {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
        this.per_page = 40;
       
    };
    
   async fetchPictures() {
        axios.defaults.baseURL = 'https://pixabay.com/api';
        axios.defaults.params = {
            key: API_KEY,
            image_type: 'photo',
            orientation: 'horizontal',
            safesearch: true,
        };

       const { data } = await axios.get(
           `/?q=${this.searchQuery}&per_page=${this.per_page}&page=${this.page}`)
           .catch(error => {
               if (!error.response) {
                   throw new Error(error.response.statusText);
               }
           });
       
       const { hits, totalHits } = data;
        
        this.incrementPage();

        return { hits, totalHits };
    };
       getCalculatePages() {
           return (this.page -1) * this.per_page;

      }
    
    incrementPage() {
        this.page += 1;
    };

    resetPage() {
        this.page = 1;
    };

    get query() {
        return this.searchQuery;
    };

    set query(newQuery) {
        this.searchQuery = newQuery;
    };
}
