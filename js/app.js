const carousel = document.querySelector('.carousel');
let sliders = [];
let slideIndex = 0; // to track current slide index.

const createSlide = () => {
    if (slideIndex >= movies.length) {
        slideIndex = 0;
    }

    // creating DOM element
    let slide = document.createElement('div');
    let imgElement = document.createElement('img');

    // attaching all elements
    imgElement.appendChild(document.createTextNode(''));
    slide.appendChild(imgElement);
    carousel.appendChild(slide);

    // setting up image
    imgElement.src = movies[slideIndex].image;
    slideIndex++;

    // setting elements classname
    slide.className = 'slider';

    sliders.push(slide);

    if (sliders.length) {
        sliders[0].style.marginLeft = `calc(-${100 * (sliders.length - 2)}% - ${10 * (sliders.length - 2)}px)`;
    }
}

for (let i = 0; i < 3; i++) {
    createSlide();
}

setInterval(() => {
    createSlide();
}, 3000);

let selectedMovie;

function storeDataInLocalStorage() {
    if (localStorage.getItem("movies") === null) {
        localStorage.setItem("movies", JSON.stringify(
            [
                {
                    id: 'movie1',
                    image: 'img/banner/banner1.webp',
                    name: 'Therppu',
                    likes: '93%',
                    votes: '928',
                    genre: 'Drama/Thriller',
                    price: 10
                },
                {
                    id: 'movie2',
                    image: 'img/banner/banner2.webp',
                    name: 'Thallumalla',
                    likes: '92%',
                    votes: '16k',
                    genre: 'Action/Comedy',
                    price: 8
                }
            ]
        ));
    }
    if (localStorage.getItem("theatres") === null) {
        localStorage.setItem("theatres", JSON.stringify(
            [
                {
                    id: "fun",
                    name: "FUN CINEMAS",
                    movies: [{
                        id: 'movie1',
                        image: 'img/banner/banner1.webp',
                        name: 'Therppu',
                        likes: '93%',
                        votes: '928',
                        genre: 'Drama/Thriller',
                        price: 10
                    }],
                    timeslot: [
                        {
                            id: "9",
                            time: "09:00 AM"
                        },
                        {
                            id: "12",
                            time: "12:00 PM"
                        }
                    ],
                    seats: [
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,]
                    ]
                },
                {
                    id: "pvr",
                    name: "PVR CINEMAS",
                    movies: [
                        {
                            id: 'movie2',
                            image: 'img/banner/banner2.webp',
                            name: 'Thallumalla',
                            likes: '92%',
                            votes: '16k',
                            genre: 'Action/Comedy',
                            price: 8
                        }],
                    timeslot: [
                        {
                            id: "3",
                            time: "03:00 PM"
                        },
                        {
                            id: "6",
                            time: "6:00 PM"
                        }
                    ],
                    seats: [
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,]
                    ]
                }
            ]
        ));
    }
}

function setThreatreDropdown(data) {
    $("#theatre").html('<option value="select">SELECT</option>');
    for (let i = 0; i < data.length; i++) {
        const dropdownNode = document.createElement("option");
        const titleTextNode = document.createTextNode(data[i].name);
        dropdownNode.appendChild(titleTextNode);
        $("#theatre").append(dropdownNode);
    }
}

function setTimeDropdown(data) { }



$(document).ready(function () {
    storeDataInLocalStorage();

    //* FUNCTION INVOKED WHEN MOVIE IS CLICKED
    $(".movie").click(function () {
        let id = this.id;
        $("#book").removeClass("invisible");
        $('html,body').animate({
            scrollTop: $(".body").offset().top
        },
            'slow');
        let data = JSON.parse(localStorage.getItem("theatres"));
        function searchTheatres(item) {
            for (let i = 0; i < item.movies.length; i++) {
                if (item.movies[i].id === id)
                    return item;
            }
        };
        let theatres = data.filter(searchTheatres);
        setThreatreDropdown(theatres);
    });



});

