document.addEventListener("DOMContentLoaded", function () {
    const menuBtn = document.getElementById("menuBtn");
    const nav = document.querySelector(".navbar nav");

    if (menuBtn && nav) {
        menuBtn.addEventListener("click", function () {
            nav.classList.toggle("show");

            const icon = menuBtn.querySelector("i");

            if (nav.classList.contains("show")) {
                icon.classList.remove("fa-bars");
                icon.classList.add("fa-xmark");
            } else {
                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");
            }
        });
    }

    const searchInput = document.getElementById("searchInput");
    const movieCards = document.querySelectorAll(".movie-card");
    const searchResults = document.getElementById("searchResults");
    const searchMovieGrid = document.getElementById("searchMovieGrid");
    const resultCount = document.getElementById("resultCount");

    if (searchInput) {

        searchInput.addEventListener("input", function () {

            const searchValue = searchInput.value.trim().toLowerCase();

            if (searchValue === "") {

                if (searchResults) {
                    searchResults.classList.remove("show");
                }

                movieCards.forEach(function (card) {
                    card.style.display = "";
                });

                return;
            }

            if (searchResults === null) {

                movieCards.forEach(function (card) {

                    const title = card.dataset.title.toLowerCase();

                    if (title.includes(searchValue)) {
                        card.style.display = "";
                    } else {
                        card.style.display = "none";
                    }

                });

                updateMovieCount();

                return;
            }

            searchResults.classList.add("show");

            searchMovieGrid.innerHTML = "";

            let count = 0;

            movieCards.forEach(function (card) {

                const title = card.dataset.title.toLowerCase();

                if (title.includes(searchValue)) {

                    const clone = card.cloneNode(true);

                    searchMovieGrid.appendChild(clone);

                    count++;
                }

            });


            if (resultCount) {
                resultCount.textContent =
                    count + (count === 1 ? " movie found" : " movies found");
            }


            if (count === 0) {

                searchMovieGrid.innerHTML = 
                    <div class="no-results" style="display:block;">
                        <i class="fa-solid fa-film"></i>
                        <h3>No Movies Found</h3>
                        <p>Try searching for another movie.</p>
                    </div>
                ;
            }

        });

    }

    const filterButtons = document.querySelectorAll(".filter-btn");

    filterButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const selectedGenre = button.dataset.filter;

            filterButtons.forEach(function (btn) {
                btn.classList.remove("active");
            });

            button.classList.add("active");

            movieCards.forEach(function (card) {

                const cardGenre = card.dataset.genre;

                if (
                    selectedGenre === "All" ||
                    cardGenre === selectedGenre
                ) {
                    card.style.display = "";
                } else {
                    card.style.display = "none";
                }

            });

            updateMovieCount();

        });

    });

    const genreCards = document.querySelectorAll(".genre-card");

    genreCards.forEach(function (genre) {

        genre.addEventListener("click", function () {

            const selectedGenre = genre.dataset.genre;

            window.location.href =
                "movies.html?genre=" +
                encodeURIComponent(selectedGenre);

        });

    });

    const params = new URLSearchParams(window.location.search);
    const genreFromURL = params.get("genre");

    if (genreFromURL && filterButtons.length > 0) {

        const matchingButton =
            document.querySelector(
                `.filter-btn[data-filter ="${genreFromURL}"]`
            );

        if (matchingButton) {
            matchingButton.click();
        } 

    }

    function updateMovieCount() {

        const movieCount = document.getElementById("movieCount");

        if (!movieCount) {
            return;
        }

        let visibleMovies = 0;

        movieCards.forEach(function (card) {

            if (card.style.display !== "none") {
                visibleMovies++;
            }

        });

        movieCount.textContent =
            visibleMovies +
            (visibleMovies === 1 ? " movie" : " movies");

        const noResults = document.getElementById("noResults");

        if (noResults) {

            if (visibleMovies === 0) {
                noResults.style.display = "block";
            } else {
                noResults.style.display = "none";
            }

        }

    }

    updateMovieCount();

    const filterLinks =
        document.querySelectorAll("[data-filter-link]");

    filterLinks.forEach(function (link) {

        link.addEventListener("click", function (event) {

            event.preventDefault();

            const genre = link.dataset.filterLink;

            window.location.href =
                "movies.html?genre=" +
                encodeURIComponent(genre);

        });

    });

    const navLinks =
        document.querySelectorAll(".navbar nav a");

    navLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            if (nav) {
                nav.classList.remove("show");
            }

            if (menuBtn) {

                const icon = menuBtn.querySelector("i");

                if (icon) {
                    icon.classList.remove("fa-xmark");
                    icon.classList.add("fa-bars");
                }

            }

        });

    });

    const animatedElements =
        document.querySelectorAll(
            ".movie-card, .genre-card, .section-title"
        );

    const observer =
        new IntersectionObserver(
            function (entries) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        entry.target.style.opacity = "1";
                        entry.target.style.transform = "translateY(0)";

                        observer.unobserve(entry.target);
                    }

                });

            },
            {
                threshold: 0.1
            }
        );

    animatedElements.forEach(function (element) {

        element.style.opacity = "0";
        element.style.transform = "translateY(20px)";
        element.style.transition =
            "opacity 0.6s ease, transform 0.6s ease";

        observer.observe(element);

    });

    const searchIcon =
        document.querySelector(".nav-search i");

    if (searchIcon && searchInput) {

        searchIcon.addEventListener("click", function () {
            searchInput.focus();
        });

    }

    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape" && searchInput) {

            searchInput.value = "";
            searchInput.dispatchEvent(
                new Event("input")
            );

            searchInput.blur();
        }

    });

});