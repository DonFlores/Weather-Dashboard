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
// declare variables for dom elements
// form 
// in put 

// get timezone plugin and initialise it here
console.log(dayjs('2019-01-25').toDate())

// function for rendering search history
// this will include a foor loop

// function to update histotry in local storage
// we can use local storage for this 

// functon to get search history from local storage 

// function to render the current weather
function renderCurrentWeather (city, weather) {
    var date = dayjs().format("M/D/YYYY")
    var iconUrl = `${rootUrl}/img/w/${weather.weather[0].icon}.png`
    var iconDescription = weather.weather[0].description || weather[0].main
    var tempF = weather.main.temp
    var windSpeed = weather.wind.speed
    var humidity = weather.main.humidity


    var container = document.createElement("div")
    var containerBody = document.createElement("div")

    var cityName = document.createElement("h2")
    var weatherIcon = document.createElement("img")
    var windElement = document.createElement("p")
    var tempElement = document.createElement("p")
    var humidityElement = document.createElement("p")

    
    cityName.setAttribute("class", "h3 card-title")
    cityName.textContent = `${city}(${date})`
    weatherResults.append(cityName)
    
    container.setAttribute("class", "container")
    containerBody.setAttribute("class", "container-body")
    container.append(containerBody)

    tempElement.setAttribute("class", "container-text")
    windElement.setAttribute("class", "container-text")
    humidityElement.setAttribute("class", "container-text")

    weatherIcon.setAttribute("src", iconUrl)
    weatherIcon.setAttribute("alt", iconDescription)
    weatherIcon.setAttribute("class", "weather-icon")
    cityName.append(weatherIcon)
    tempElement.textContent = `temp ${tempF} degrees`
    windElement.textContent = `windspeed ${windSpeed} mph`
    humidityElement.textContent = `humidity ${humidity} percentage`
    containerBody.append(cityName, windElement, tempElement, humidityElement)
    weatherResults.innerHTML = ""
    weatherResults.append(container)
}
// you will need to know the  date 

// function for rendering the forecaar

// function to render the forecast card 

// function to  fetch thr weather from the api 
function fetchWeather (location) {
    var {lat} = location
    var {lon} = location
    var city = location.name
    var apiUrl = `${rootUrl}/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`
    fetch (apiUrl)
    .then(function (response){
        return response.json()
    })
    .then(function (data){
        console.log(city, data)
        renderCurrentWeather(city, data)
    })
    .catch(function (error){
        console.error(error)
    })
}

function getLocation (search) {
    var apiUrl = `${rootUrl}/geo/1.0/direct?q=${search}&limit=5&appid=${apiKey}`
    fetch (apiUrl)
    .then(function (response){
        return response.json()
    })
    .then(function (data){
        if (!data[0]){
            alert("Nope")
        } else {
            fetchWeather(data[0])
        }
    })
    .catch(function (error){
        console.error(error)
    })
}

// functin to handle search submit
function handleSearch (event) {
    if (!searchInput.value){
        return
    }
    event.preventDefault()
    var search = searchInput.value
    getLocation (search)
    searchInput.value = ""
}
searchForm.addEventListener("submit", handleSearch)