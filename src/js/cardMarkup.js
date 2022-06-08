export const cardList = document.querySelector('.gallery');

export function renderMarkup(data) {
    const markup = data
        .map(
          ({ tags, webformatURL, largeImageURL, likes, views, comments, downloads }) => `
  <div class="card">
  <a  href="${largeImageURL}">
  <img src="${webformatURL}" alt="${tags}" class="card-preview" " loading="lazy" /></a>
  <div class="info">
    <p class="info-item">
      <b>Likes</b><span class="info-item-span">${likes}</span>
    </p>
    <p class="info-item">
      <b>Views</b><span class="info-item-span">${views}</span>
    </p>
    <p class="info-item">
      <b>Comments</b><span class="info-item-span">${comments}</span>
    </p>
    <p class="info-item">
      <b>Downloads</b><span class="info-item-span">${downloads}</span>
    </p>
</div>
</div>
    `).join('');

    cardList.insertAdjacentHTML('beforeend', markup);
}