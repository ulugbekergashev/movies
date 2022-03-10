var id = 0;
var movies = movies.map(function(movie){
	return {
		name: movie.Title,
		rating: movie.imdb_rating,
		categories: movie.Categories.split('|'),
		year: movie.movie_year,
		ytid: movie.ytid,
		id: id++,
		summar: movie.summary
	}
});
function $(e) {
	return document.querySelector(e);
}
