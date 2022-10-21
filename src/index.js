import { Notify } from 'notiflix/build/notiflix-notify-aio';
import ImagesApiService from './gallery-service';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
let lightbox = new SimpleLightbox('.gallery .photo-card > a', {
  captionsData: 'alt',
  captionDelay: 250,
});

const refs = {
  searchForm: document.querySelector('.search-form'),
  galleryContainer: document.querySelector('.gallery'),
  loadMoreButton: document.querySelector('.load-more'),
};
const imagesApiService = new ImagesApiService();
refs.loadMoreButton.style.display = 'none';
refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreButton.addEventListener('click', loadMoreClick);

async function onSearch(event) {
  event.preventDefault();

  imagesApiService.query = event.currentTarget.elements.searchQuery.value;

  imagesApiService.resetPage();
  const galleryImages = await imagesApiService.fetchImages();
  try {
    if (galleryImages.hits.length === 0) {
      Notify.failure(
        '"Sorry, there are no images matching your search query. Please try again."'
      );
    } else {
      clearImagesContainer();

      Notify.info(`Hooray! We found ${imagesApiService.readHits()} images.`);
    }
  } catch (error) {
    console.log(error);
  }

  appendImagesMarkup(galleryImages.hits);
  refs.loadMoreButton.style.display = 'block';
  lightbox.refresh();

  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight,
    behavior: 'smooth',
  });
}
//   });

async function loadMoreClick() {
  refs.loadMoreButton.style.display = 'none';
  //   imagesApiService.fetchImages().then(images => {
  const galleryImages = await imagesApiService.fetchImages();
  try {
    appendImagesMarkup(galleryImages.hits);
    lightbox.refresh();
    refs.loadMoreButton.style.display = 'block';
    if (galleryImages.hits.length !== 40) {
      Notify.info("We're sorry, but you've reached the end of search results.");
      refs.loadMoreButton.style.display = 'none';
      return;
    }
  } catch (error) {
    console.log(error);
  }
  //   });
}

function appendImagesMarkup(images) {
  const galleryCard = gallery => {
    const {
      webformatURL,
      largeImageURL,
      tags,
      likes,
      views,
      comments,
      downloads,
    } = gallery;

    return `<div class="photo-card"><a href="${largeImageURL}">
    <img src="${webformatURL}" alt="${tags}" loading="lazy"/>
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
  </div></a>`;
  };

  const gallery = images.map(galleryCard).join(' ');
  refs.galleryContainer.insertAdjacentHTML('beforeend', gallery);
}

function clearImagesContainer() {
  refs.galleryContainer.innerHTML = '';
}
