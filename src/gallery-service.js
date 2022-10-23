import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
export default class GalleryApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.hits = 0;
  }

  async fetchImages() {
    // return fetch(
    //   `https://pixabay.com/api/?key=30757055-8f8e35a6024963473ffe3e1a3&per_page=40&page=${this.page}&q=${this.searchQuery}&image_type=photos&orientation=horizontal&safesearch=true`
    // )
    //   .then(response => response.json())
    //   .then(data => {
    //     this.incrementPage();
    //     this.hits = data.totalHits;
    //     return data.hits;
    //   });
    try {
      return await axios
        .get(
          `https://pixabay.com/api/?key=30757055-8f8e35a6024963473ffe3e1a3&per_page=40&page=${this.page}&q=${this.searchQuery}&image_type=photos&orientation=horizontal&safesearch=true`
        )
        .then(res => {
          this.incrementPage();
          this.hits = res.data.totalHits;
          return res.data;
        });
      // const newGallery = await response.json();

      //  / return newGallery;
    } catch (err) {
      console.log(err);
    }
  }
  incrementPage() {
    this.page += 1;
  }
  resetPage() {
    this.page = 1;
  }

  readHits() {
    return this.hits;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
