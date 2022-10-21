export default class GalleryApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  fetchImages() {
    console.log(this);
    return fetch(
      `https://pixabay.com/api/?key=30757055-8f8e35a6024963473ffe3e1a3&per_page=40&page=${this.page}&q=${this.searchQuery}&image_type=photos&orientation=horizontal&safesearch=true`
    )
      .then(response => response.json())
      .then(data => {
        this.incrementPage();

        return data.hits;
      });
  }
  incrementPage() {
    this.page += 1;
  }
  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
