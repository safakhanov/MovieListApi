const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NjE5ODQ5NjMxYTRlMWZiYzVlMDIzYWUwMDc4ZDgzOSIsInN1YiI6IjY0NjdmNmIwMmJjZjY3MDEzODk0MzM2ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.dyQbf0TAGw-xO-uOrPoWL_okGTOkcJlklzGraLB8-d8'
    }
};

// Səhifə yükləndikdə avtomatik olaraq işlənəcək funksiya
window.onload = displayMovieList;

// Film siyahısını göstərmək üçün async funksiya
async function displayMovieList() {
    try {
        //  API-dən film məlumatlarını alaraq GET isteği göndərilməsi
        const response = await fetch('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc', options);

        // Gələn məlumatı JSON formatına çevirmə
        const data = await response.json();

        // HTML-də göstəriləcək #movieList ID-sinə sahib elementin seçilməsi
        const movieContainer = document.querySelector('#movieList');

        // API-dən gələn hər film üçün kart yaratmaq və HTML-ə əlavə etmək
        const movieCards = data.results.map((movie) => `
            <div class="col-md-4">
                <div class="card movie-card">
                    <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" class="card-img-top" alt="${movie.title}">
                    <div class="card-body">
                        <h5 class="card-title">${movie.title}</h5>
                        <p class="card-text">${movie.overview}</p>
                    </div>
                </div>
            </div>
        `);

        // Yaratılan kartları movieContainer daxilinə yerləşdirmək
        movieContainer.innerHTML = movieCards.join('');
    } catch (err) {
        // Xəta halında konsola xəta mesajını yazdırmaq
        console.error(err);
    }
}