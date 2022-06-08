import './sass/main.scss';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { renderMarkup  } from './js/cardMarkup';
import { cardList } from './js/cardMarkup';
import { clearPicturesContainer } from './js/cleanCard';
import ApiService from './js/search';
import Notiflix from 'notiflix';
import LoadMoreBtn from './js/loadMoreBtn';

import axios from 'axios';

const refs = {
    form: document.getElementById('search-form'),
    gallery: document.querySelector('.gallery'),
    loadMoreBtn: document.querySelector('.load-more'),

};
console.log(refs.loadMoreBtn);



const apiService = new ApiService();
const loadMoreBtn = new LoadMoreBtn({
  selector: '.load-more',
  hidden: true,
})


refs.form.addEventListener('submit', onFormSubmit);
refs.loadMoreBtn.addEventListener('click', onLoadMore);



function onFormSubmit(e) {
  e.preventDefault();

  apiService.query = e.currentTarget.elements.searchQuery.value.trim();
  if (!apiService.query) {
    return
  }

  apiService.resetPage();
  
  fetchFirstPictures();

  async function fetchFirstPictures() {
    const itemPictures = await apiService.fetchPictures();
  
    const { hits, totalHits } = itemPictures;
    if (hits.length === 0) {
      Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
      clearPicturesContainer();
      return
    }
         
    else {
      clearPicturesContainer()
      renderMarkup(hits);
      Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`)
      console.log(hits);
      console.log(totalHits);
      loadMoreBtn.show();

      const lightbox = new SimpleLightbox('.gallery a', { });
    
    }
          
    if (apiService.getCalculatePages() > totalHits) {
      loadMoreBtn.hide();
    }
          
  }
  }

function onLoadMore() {
  const { height: cardHeight } = document
  .querySelector(".gallery")
  .firstElementChild.getBoundingClientRect();

window.scrollBy({
  top: cardHeight * 2,
  behavior: "smooth",
});

  loadMoreBtn.hide();

  fetchMorePictures();

  async function fetchMorePictures() {
    const itemPictures = await apiService.fetchPictures();
    const { hits, totalHits } = itemPictures;
    
        if (apiService.getCalculatePages() > totalHits) {
          renderMarkup(hits);
          loadMoreBtn.hide();
          Notiflix.Notify.warning(`We're sorry, but you've reached the end of search results.`);
          const lightbox = new SimpleLightbox('.gallery a', { });
          lightbox.refresh();
  
        }
        else {
          renderMarkup(hits);
          loadMoreBtn.show();
          const lightbox = new SimpleLightbox('.gallery a', { });
          lightbox.refresh();
        }
      }
  }
  

