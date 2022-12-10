// store search data in var 
var searchedData = []

// var for root url
var rootUrl = 'https://api.openweathermap.org'
// var for your apiKEy
var apiKey = 'df3fb9934a7d8ebae97c6749b588071a'
var searchForm = document.querySelector("#search-form")
var searchInput = document.querySelector("#search-input")
var searchBtn = document.querySelector("#search-button")
var weatherResults = document.querySelector("#weather-results")
var fiveDay = document.querySelector(".five-day")
// declare variables for dom elements
// form 
// in put 

// get timezone plugin and initialise it here
var now = dayjs('2019-01-25').toDate()

// function for rendering search history
// this will include a foor loop

// function to update histotry in local storage
// we can use local storage for this 

// functon to get search history from local storage 

// function to render the current weather
// function renderCurrentWeather (city, weather) {
//     var date = dayjs().format("M/D/YYYY")
//     var iconUrl = `${rootUrl}/img/w/${weather.weather[0].icon}.png`
//     var iconDescription = weather.weather[0].description || weather[0].main
//     var tempF = weather.main.temp
//     var windSpeed = weather.wind.speed
//     var humidity = weather.main.humidity


//     var container = document.createElement("div")
//     var containerBody = document.createElement("div")

//     var cityName = document.createElement("h2")
//     var weatherIcon = document.createElement("img")
//     var windElement = document.createElement("p")
//     var tempElement = document.createElement("p")
//     var humidityElement = document.createElement("p")

    
//     cityName.setAttribute("class", "h3 card-title")
//     cityName.textContent = `${city}(${date})`
//     weatherResults.append(cityName)
    
//     container.setAttribute("class", "container")
//     containerBody.setAttribute("class", "container-body")
//     container.append(containerBody)

//     tempElement.setAttribute("class", "container-text")
//     windElement.setAttribute("class", "container-text")
//     humidityElement.setAttribute("class", "container-text")

//     weatherIcon.setAttribute("src", iconUrl)
//     weatherIcon.setAttribute("alt", iconDescription)
//     weatherIcon.setAttribute("class", "weather-icon")
//     cityName.append(weatherIcon)
//     tempElement.textContent = `temp ${tempF} degrees`
//     windElement.textContent = `windspeed ${windSpeed} mph`
//     humidityElement.textContent = `humidity ${humidity} percentage`
//     containerBody.append(cityName, windElement, tempElement, humidityElement)
//     weatherResults.innerHTML = ""
//     weatherResults.append(container)
// }
// // you will need to know the  date
// function renderFiveDayCards (forecast) {
//     var iconUrl = `https://openweathermap.org/img/w/${forecast.weather[0].icon}.png`;
//     var iconDescription = forecast.weather[0].description
//     var tempF = forecast.main.temp
//     var windSpeed = forecast.wind.speed
//     var humidity = forecast.main.humidity
//     var cardTitle = dayjs(forecast.dt_txt).format("M/D/YYYY")
//     var fiveDayCard = `
//     <div class="card-column">
//         <div class="card">
//             <div class="card-wrapper">
//             <h5 class="card-title">${cardTitle}</h5>
//             <img src=${iconUrl} alt=${iconDescription}></img>
//                 <p class="card-text">${tempF}</p>
//                 <p class="card-text">${humidity}</p>
//                 <p class="card-text">${windSpeed}</p>
//             </div>
//         </div>
//     </div>
//     `
//     fiveDay.append(fiveDayCard)

// } 

// function renderMiniForecast (daily) {
//     var firstDay = dayjs().add(1, "day").startOf("day").unix()
//     var lastDay = dayjs().add(6, "day").startOf("day").unix()
//     for(var i=0; i<daily.length;i++){
//         if (daily[i].dt >= firstDay && daily[i].dt < lastDay){
//             if (daily[i].dt_txt.slice(11, 13) =="12"){
//                 renderFiveDayCards(daily[i])
//             }
//         }
//     }
// }

// // function for rendering the forecaar

// // function to render the forecast card 

// // function to  fetch thr weather from the api 
// function renderStuff(city, data) {
//     renderCurrentWeather(city, data.list[0], data.city.timezone)
//     renderMiniForecast(data.list)
// }

// function fetchWeather (location) {
//     var {lat} = location
//     var {lon} = location
//     var city = location.name
//     var apiUrl = `${rootUrl}/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`
//     fetch (apiUrl)
//     .then(function (response){
//         return response.json()
//     })
//     .then(function (data){
//         console.log(city, data)
//         renderStuff(city, data)
//     })
//     .catch(function (error){
//         console.error(error)
//     })
// }

// function getLocation (search) {
//     var apiUrl = `${rootUrl}/geo/1.0/direct?q=${search}&limit=5&appid=${apiKey}`
//     fetch (apiUrl)
//     .then(function (response){
//         return response.json()
//     })
//     .then(function (data){
//         if (!data[0]){
//             alert("Nope")
//         } else {
//             fetchWeather(data[0])
//         }
//     })
//     .catch(function (error){
//         console.error(error)
//     })
// }

// // functin to handle search submit
// function handleSearch (event) {
//     if (!searchInput.value){
//         return
//     }
//     event.preventDefault()
//     var search = searchInput.value
//     getLocation (search)
//     searchInput.value = ""
// }
// searchForm.addEventListener("submit", handleSearch)

function search (city) {
    fetch(`${rootUrl}/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}
    `)
    .then(function(response){
        return response.json()
    })
    .then(function(data){
        $(".weather-results").css("display", "block")
        $("#search-input").empty()
        var iconEl = data.weather[0].icon
        var iconUrl = `${rootUrl}/img/w/${iconEl}.png`
        var currentCity = $(`
            <h2 id="current-city">${data.name} ${now} <img
            src="${iconUrl}"alt="${data.weather[0].description}"/></h2>
            <p>wind-speed:${data.wind.speed}</p>
            <p>humidity:${data.main.humidity}</p>
            <p>temperature:${data.main.temp}</p>
        `)
        $(".weather-results").append(currentCity)
var lat = data.coord.lat
var lon = data.coord.lon

        fetch(`
            ${rootUrl}/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=${apiKey}        `)
        .then(function(response){
            return response.json()
        })
        .then(function(uv){
            console.log(uv)
            var uvIndex = uv.value
            var uvEl = $(`<p>uv-index:<span id="uvEl-color">${uvIndex}</span></p>`)
            $(".weather-results").append(uvEl)
            if (uvIndex < 3) {
                $("#uvEl-color").css("background-color", "green")
            } else if (uvIndex < 6) {
                $("#uvIndexColor").css("background-color", "yellow");
              } else if (uvIndex < 8) {
                $("#uvIndexColor").css("background-color", "orange");
              } else if (uvIndex < 11) {
                $("#uvIndexColor").css("background-color", "red");
              } else {
                $("#uvIndexColor").css("background-color", "grey");
              }
              fetch (`
                ${rootUrl}/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}
              `)
              .then(function (response){
                return response.json()
              })
              .then(function (data){
                $(".five-day").empty()
                let fiveDayArr = data.list.filter(day => day.dt_txt.includes("12:00:00"))

                for (let i = 0; i < fiveDayArr.length; i++){
                    var currentDate = new Date(fiveDayArr[i].dt_txt).toLocaleString().split(",")[0]
                    // var iconPic = `<img src="${rootUrl}/img/wn/${iconUrl}@2x.png"/>`
                    var weeklyCard = $(`
                    
                    <div class="pl-3">
                    <div class="card pl-3 pt-3 mb-3 bg-primary text-light" style="width: 12rem;>
                        <div class="card-body">
                            <p>${iconPic}</p>
                            <p>${currentDate}</p>
                            <p>Temperature: ${fiveDayArr[i].main.temp} °C</p>
                            <p>Humidity: ${fiveDayArr[i].main.humidity}\%</p>
                        </div>
                    </div>
                <div>

                    `)
                    $(".fiveDay").append(weeklyCard)
                }
              })
    
        })
    })
}
function saveSearch(cityName) {
    var storedCity = document.getElementById("search-input").value;
    localStorage.setItem(cityName, storedCity);
    var createLi = document.createElement("li");
    createLi.textContent = storedCity;
    document.getElementById("searchHistory").appendChild(createLi);
  }
  

searchBtn.addEventListener("click", function (event) {
    event.preventDefault();
    saveSearch();
    var city = $("#search-input").val().trim();
    search(city);
    
  });
  

$(document).on("click", "#searchHistory li", function() {
    var listCity = $(this).text();
    search(listCity);
});
