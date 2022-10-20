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

let selectedMovieData;
let selectedTheatreData;
let selectedTimeData;
let selectedSeatsData;

const seats = document.querySelectorAll('.row .seat:not(.occupied');

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
                            id: "time0",
                            time: "09:00 AM"
                        },
                        {
                            id: "time1",
                            time: "12:00 PM"
                        }
                    ],
                    seats: [
                        [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0]
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
                            id: "time0",
                            time: "03:00 PM"
                        },
                        {
                            id: "time1",
                            time: "06:00 PM"
                        }
                    ],
                    seats: [
                        [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                        [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                    ]
                }
            ]
        ));
    }
}

function setThreatreDropdown(data) {
    selectedMovieData = data;
    $("#theatre").html('<option value="select">SELECT</option>');
    for (let i = 0; i < data.length; i++) {
        const dropdownNode = document.createElement("option");
        dropdownNode.setAttribute("id", data[i].id);
        const titleTextNode = document.createTextNode(data[i].name);
        dropdownNode.appendChild(titleTextNode);
        $("#theatre").append(dropdownNode);
    }
}

function setTimeDropdown(id) {
    $("#time").html('<option value="select">SELECT</option>');
    let selectedTheatre = selectedMovieData.filter(item => item.id === id);
    selectedTheatreData = selectedTheatre[0];
    for (let i = 0; i < selectedTheatre[0].timeslot.length; i++) {
        const dropdownNode = document.createElement("option");
        dropdownNode.setAttribute("id", selectedTheatre[0].timeslot[i].id);
        const titleTextNode = document.createTextNode(selectedTheatre[0].timeslot[i].time);
        dropdownNode.appendChild(titleTextNode);
        $("#time").append(dropdownNode);
    }
}

function setSeats(index) {
    selectedTimeData = index;
    let seatList = selectedTheatreData.seats[index];
    for (let i = 0; i < seatList.length; i++) {
        if (seatList[i] === 1) {
            $(`#${i + 1}`).addClass("occupied");
        } else {
            $(`#${i + 1}`).removeClass("occupied");
        }

    }
}

function updateSelectedCount() {

    const selectedSeats = document.querySelectorAll('.row .seat.selected');

    const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));
    selectedSeatsData = seatsIndex;
    console.log(seatsIndex);

    const selectedSeatsCount = selectedSeats.length;

    $("#count").text(selectedSeatsCount);
    $("#total").text(selectedSeatsCount * 10);
}

function bookTickets() {
    if (selectedTheatreData === undefined) {
        alert("Select threatre");
        return;
    }

    if (selectedTimeData === undefined) {
        alert("Select time slot");
        return;
    }

    if (selectedSeatsData === undefined) {
        alert("Select seats");
        return;
    }

    let theatresData = localStorage.getItem("theatres");
    theatresData = JSON.parse(theatresData);

    for (let i = 0; i < theatresData.length; i++) {
        if (theatresData[i].id === selectedTheatreData.id) {
            for (let j = 0; j < selectedSeatsData.length; j++) {
                theatresData[i].seats[selectedTimeData][selectedSeatsData[j]] = 1;
            }
        }
    }

    localStorage.setItem("theatres", JSON.stringify(theatresData));
    alert("Ticket Booked Successfully");
    location.reload();
}



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

    $("#theatre").change(function () {
        setTimeDropdown($(this).find('option:selected').attr('id'));
    });

    $("#time").change(function () {
        let id = $(this).find('option:selected').attr('id');
        setSeats(id.substring(4));
    });

    document.querySelector(".container").addEventListener('click', (e) => {
        if (selectedTimeData == undefined) {
            return;
        }
        if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
            e.target.classList.toggle('selected');
            updateSelectedCount();
        }
    });

    $("#bookTicket").click(bookTickets);

});

