var elMovies = document.querySelector('.movies');
var elMovieTemplate = document.querySelector('#movie-template').content;
var elForm = document.querySelector('#form');
var elInput = document.querySelector('#input');
var elButton = document.querySelector('#btn');
var butrating = document.querySelector(".butrating")
var categoryTemplate = document.querySelector("#category").content
var sortselect = document.querySelector("#select")
var categselect = document.querySelector("#select2")
var yearselect = document.querySelector("#select3")


var moviesFragment = document.createDocumentFragment();


movies.slice(0,30).forEach(function(movie){
	var movieTemplateClone = elMovieTemplate.cloneNode(true);
	movieTemplateClone.querySelector('.movie-title').textContent = movie.name;
	movieTemplateClone.querySelector('.movie-year').textContent = movie.year;
	movieTemplateClone.querySelector('.movie-link').href += movie.ytid;
	movieTemplateClone.querySelector('.movie-id').textContent = movie.id +1;
	movieTemplateClone.querySelector(".sumbtn").dataset.open =  movie.id;

	movieTemplateClone.querySelector(".addlistbtn").dataset.index =  movie.id;

	if(localStorage.getItem('watchlist')){
		if(localStorage.getItem('watchlist').split(",").indexOf(movieTemplateClone.querySelector(".addlistbtn").dataset.index) !== -1){
			movieTemplateClone.querySelector(".addlistbtn").disabled = true;
			movieTemplateClone.querySelector(".addlistbtn").classList.add('not-allow');
		}
	}
	
	movieTemplateClone.querySelector('.rating').textContent = movie.rating;

	var categFragment = document.createDocumentFragment();
	movie.categories.forEach(function(categ){
		var	categoryTemplateClone = categoryTemplate.cloneNode(true)
		categoryTemplateClone.querySelector(".category-name").textContent = categ
		categFragment.appendChild(categoryTemplateClone)
	})
	movieTemplateClone.querySelector(".category-list").appendChild(categFragment)
	moviesFragment.appendChild(movieTemplateClone);

});


elMovies.appendChild(moviesFragment);



var elYearSelect = document.querySelector('.movie-year');
var categarray = [] 
var years = [];

movies.forEach(function(movie){
	movie.categories.forEach(function(category){
		if(categarray.indexOf(category) === -1){
			categarray.push(category);
		}
	});
	if(years.indexOf(movie.year) === -1){
		years.push(movie.year);
	}
});
	categarray.sort().forEach(function(category){
		var option = document.createElement('option');
		option.value = category.toLowerCase();
		option.textContent = category;
		categselect.appendChild(option);
	});
	years.sort(function(year1,year2){
		if(year2<year1){
			return 1
		}else{
			return -1
		}
	})
	years.forEach(function(year){
		var yearr = document.createElement("option")
		yearr.value = year;
		yearr.textContent = year;
		yearselect.appendChild(yearr)
	})

elForm.addEventListener('submit', function(evt){
	evt.preventDefault();



		
	var named = elInput.value;
	var namereg = new RegExp(named, "gi");
	var categoryRegex = new RegExp(categselect.value, "gi")
	// var yearRegex = new RegExp(categselect.value, "gi")
	var search = movies.filter(function(movie){
	if(elInput.value !== "" && categselect.value !== "all" && yearselect.value !== "all"){
		return movie.name.toString().match(namereg) && movie.categories.join("").match(categoryRegex) && movie.year === yearselect.value ;
	}else if(elInput.value !== "" && categselect.value === "all" && yearselect.value === "all"){
		return movie.name.toString().match(namereg);
	}else if(elInput.value === "" && categselect.value !== "all" && yearselect.value === "all"){
		return movie.categories.join("").match(categoryRegex);
	}else if(elInput.value === "" && categselect.value === "all" && yearselect.value !== "all"){
		return movie.year === yearselect.value;
	}else if(elInput.value !== "" && categselect.value !== "all" && yearselect.value === "all"){
		return movie.name.toString().match(namereg) && movie.categories.join("").match(categoryRegex)
	}else if(elInput.value !== "" && categselect.value === "all" && yearselect.value !== "all"){
		return movie.name.toString().match(namereg) && movie.year.toString() === yearselect.value;
	}else if(elInput.value === "" && categselect.value !== "all" && yearselect.value !== "all"){
		return movie.categories.join("").match(categoryRegex) && movie.year.toString() === yearselect.value;
	}else if(elInput.value === "" && categselect.value === "all" && yearselect.value === "all"  && sortOption !== "default"){
		return movie
	}
	})

	

	var sortOption = sortselect.value;
	if(sortOption !== "default"){
		if(sortOption === 'az'){
			search.sort(function(movie1, movie2){
				if(movie1.Title > movie2.Title){
					return 1;
				} else {
					return -1;
				}
			});
		} else if(sortOption === 'za'){
			search.sort(function(movie1, movie2){
				if(movie1.Title < movie2.Title){
					return 1;
				} else {
					return -1;
				}
			});
		} else if(sortOption === 'lr'){
			search.sort(function(movie1, movie2){
				if(movie1.rating > movie2.rating){
					return 1;
				} else {
					return -1;
				}
			});
		} else if(sortOption === 'hr'){
			search.sort(function(movie1, movie2){
				if(movie1.rating < movie2.rating){
					return 1;
				} else {
					return -1;
				}
			});
		}
	}
	if(search.length <= 0){
		var output = 'Sorry but there are no results related to your response!';
            var infoText = document.createElement('div');
            infoText.classList.add('info-div');
            infoText.innerHTML = output;
            elMovies.innerHTML = '';
            elMovies.append(infoText);
	}else{
	elMovies.innerHTML = "";

	var moviesFragment = document.createDocumentFragment();

	search.forEach(function(movie){
		var movieTemplateClone = elMovieTemplate.cloneNode(true);
		movieTemplateClone.querySelector('.movie-title').textContent = movie.name;
		movieTemplateClone.querySelector('.movie-link').href += movie.ytid;
		movieTemplateClone.querySelector('.movie-id').textContent = movie.id+1;
		movieTemplateClone.querySelector(".sumbtn").dataset.open =  movie.id;
		movieTemplateClone.querySelector(".addlistbtn").dataset.index =  movie.id;
		if(localStorage.getItem("watchlist")){
			if(localStorage.getItem('watchlist').split(",").indexOf(movieTemplateClone.querySelector(".addlistbtn").dataset.index) !== -1){
				movieTemplateClone.querySelector(".addlistbtn").disabled = true;
				movieTemplateClone.querySelector(".addlistbtn").classList.add('not-allow')
				}
		}	
		movieTemplateClone.querySelector('.rating').textContent = movie.rating;
		movieTemplateClone.querySelector('.movie-year').textContent = movie.year.toString();
		
		var categFragment = document.createDocumentFragment();
		movie.categories.forEach(function(categ){
			var	categoryTemplateClone = categoryTemplate.cloneNode(true)
			categoryTemplateClone.querySelector(".category-name").textContent = categ
			categFragment.appendChild(categoryTemplateClone)
		})
		movieTemplateClone.querySelector(".category-list").appendChild(categFragment)

		moviesFragment.appendChild(movieTemplateClone);
	});
	elMovies.appendChild(moviesFragment);
	}	
});	

	var watchlistTemplate = document.querySelector('#watchlist-template').content;
    var watchlist = document.querySelector(".favourite-list")
	var array = [];
	
	if(localStorage.getItem('watchlist')){
		array = localStorage.getItem('watchlist').split(',');
		
		var watchlistFragment = document.createDocumentFragment();
		watchlist.innerHTML = "";
		for(var i = 0 ; i < array.length;i++){
			var watchlistTemplateClone = watchlistTemplate.cloneNode(true);
			watchlistTemplateClone.querySelector('.watchlist__title').textContent = movies[Number(array[i])].name;
			watchlistTemplateClone.querySelector(".watchlist__remove-button").dataset.iden = i
			watchlistTemplateClone.querySelector(".watchlist__remove-button").dataset.disfalse = (array[i])
			watchlistFragment.appendChild(watchlistTemplateClone);
			}
			watchlist.appendChild(watchlistFragment);
	}

	elMovies.addEventListener("click",function(evt){

		if(evt.target.className !== 'addlistbtn'){
			return;
		}
		evt.target.disabled = true;
		evt.target.classList.add('not-allow')
		array.push(evt.target.dataset.index);
		
		
		var watchlistFragment = document.createDocumentFragment();
	
		watchlist.innerHTML = "";
		for(var i = 0 ; i < array.length;i++){
			var watchlistTemplateClone = watchlistTemplate.cloneNode(true);
			watchlistTemplateClone.querySelector('.watchlist__title').textContent = movies[Number(array[i])].name;
			watchlistTemplateClone.querySelector(".watchlist__remove-button").dataset.iden = i
			watchlistTemplateClone.querySelector(".watchlist__remove-button").dataset.disfalse = [Number(array[i])]

			watchlistFragment.appendChild(watchlistTemplateClone);
			}
			watchlist.appendChild(watchlistFragment);

			localStorage.setItem('watchlist', array);

	})

var addbtn = document.querySelectorAll(".addlistbtn")

watchlist.addEventListener("click",function(evt){
	if(evt.target.className !== "watchlist__remove-button"){
		return
	}

	document.querySelectorAll('.addlistbtn').forEach(function(btn){
			if(btn.dataset.index === evt.target.dataset.disfalse){
				document.querySelector('.movies').querySelector(`.addlistbtn[data-index="${evt.target.dataset.disfalse}"]`).disabled = false
				document.querySelector('.movies').querySelector(`.addlistbtn[data-index="${evt.target.dataset.disfalse}"]`).classList.remove('not-allow')
	
			}
		});

	// if(document.querySelector(".movies").querySelector(`.addlistbtn[data-index="${evt.target.dataset.disfalse}"]`)){
	// 	document.querySelector('.movies').querySelector(`.addlistbtn[data-index="${evt.target.dataset.disfalse}"]`).disabled = false
	// 	document.querySelector('.movies').querySelector(`.addlistbtn[data-index="${evt.target.dataset.disfalse}"]`).classList.remove('not-allow')
	// }
	array.splice(evt.target.dataset.iden,1)
	
	var watchlistFragment = document.createDocumentFragment();
	
		watchlist.innerHTML = "";
		for(var i = 0 ; i < array.length;i++){
			var watchlistTemplateClone = watchlistTemplate.cloneNode(true);
			watchlistTemplateClone.querySelector('.watchlist__title').textContent = movies[Number(array[i])].name;
			watchlistTemplateClone.querySelector(".watchlist__remove-button").dataset.iden = i
			watchlistTemplateClone.querySelector(".watchlist__remove-button").dataset.disfalse = [Number(array[i])]
			watchlistFragment.appendChild(watchlistTemplateClone);
	
			}
			watchlist.appendChild(watchlistFragment);

	
			

			localStorage.setItem('watchlist', array);
		
})

var summarbox = document.querySelector(".summar-box")
var summar = document.querySelector(".summar")
var closebtn = document.querySelector(".close-btn")
var sumrating = document.querySelector(".sumrate")
var summyear = document.querySelector(".summyear")
var summcateg = document.querySelector(".summcateg")
var summtext = document.querySelector(".summtext")
var summname = document.querySelector(".summname")


elMovies.addEventListener("click",function(evt){

	if(evt.target.className !== 'sumbtn'){
		return;
	}
	summarbox.classList.add("modal-open")
	summar.classList.add("modal")
	summname.textContent = movies[evt.target.dataset.open].name
	sumrating.textContent = movies[evt.target.dataset.open].rating
	summyear.textContent = movies[evt.target.dataset.open].year
	summcateg.textContent = movies[evt.target.dataset.open].categories.join(",")
	summtext.textContent = movies[evt.target.dataset.open].summar

})
summarbox.addEventListener("click",function(evt){
	if(evt.target.classList.contains("summar-box") || evt.target.classList.contains("close-btn") || evt.keyCode === 27){
		summar.classList.add("modal-close")
		summar.addEventListener("animationend", removeClasses)	
	}

})
var removeClasses = function(){
	summarbox.classList.remove("modal-open")
	summar.classList.remove("modal-close")
	summar.removeEventListener("animationend", removeClasses)
}
