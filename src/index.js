import { Notify } from 'notiflix/build/notiflix-notify-aio';
import ImagesApiService from './gallery-service';

// Notify.warning('test');
const refs = {
  searchForm: document.querySelector('.search-form'),
  galleryContainer: document.querySelector('.gallery'),
  loadMoreButton: document.querySelector('.load-more'),
};
const imagesApiService = new ImagesApiService();

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreButton.addEventListener('click', loadMoreClick);

function onSearch(event) {
  event.preventDefault();

  imagesApiService.query = event.currentTarget.elements.searchQuery.value;
  imagesApiService.resetPage();
  refs.galleryContainer.innerHTML = '';
  console.log(imagesApiService.query);
  imagesApiService.fetchImages().then(images => appendImagesMarkup(images));
}

function loadMoreClick() {
  imagesApiService.fetchImages().then(images => appendImagesMarkup(images));
}

function appendImagesMarkup(images) {
  const galleryCard = gallery => {
    const { webformatURL, tags, likes, views, comments, downloads } = gallery;

    return `<div class="photo-card">
    <img src="${webformatURL}" alt="${tags}" loading="lazy" />
    <div class="info">
      <p class="info-item">
        <b>${likes} Likes</b>
      </p>
      <p class="info-item">
        <b>${views} Views</b>
      </p>
      <p class="info-item">
        <b>${comments} Comments</b>
      </p>
      <p class="info-item">
        <b>${downloads} Downloads</b>
      </p>
    </div>
  </div>`;
  };

  const gallery = images.map(galleryCard).join(' ');
  refs.galleryContainer.insertAdjacentHTML('beforeend', gallery);
}
