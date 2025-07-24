function connect() {
    var searchTerm = document.getElementById("searchBox").value;
    document.getElementById("searchBox").value = "";
  
    var url = `https://restcountries.com/v3.1/name/${searchTerm}`;
  
    fetch(url)
      .then(res => res.json())
      .then(data => showInBrowser(data));
  }
  
  function showInBrowser(data) {
    var oldContent = document.getElementById("displayArea");
    oldContent.textContent = "";
  
    for (var a = 0; a < data.length; a++) {
      var country = data[a];
  
      var newDiv = document.createElement("div");
      newDiv.classList.add("innerStyle");
  
      var countryName = country.name.common;
      var capital = country.capital ? country.capital[0] : "N/A";
      var region = country.region;
      var population = country.population;
      var flag = country.flags.png;
  
      newDiv.innerHTML = `
        <h3>${countryName}</h3>
        <p><strong>Region:</strong> ${region}</p>
        <p><strong>Capital:</strong> ${capital}</p>
        <button class="more-btn">More Details</button>
        <div class="details">
          <img src="${flag}" alt="${countryName} Flag" class="flag-img">
          <p><strong>Population:</strong> ${population}</p>
          <div class="weather-info"><em>Loading weather...</em></div>
        </div>
      `;
  
      newDiv.querySelector(".more-btn").addEventListener("click", function () {
        var detailsDiv = this.nextElementSibling;
        detailsDiv.style.display = "block";
  
        var capitalCity = this.previousElementSibling.textContent.split(": ")[1];
        var api = "766405f09da38eaca6dedd075e07c75f";
        var url = `https://api.openweathermap.org/data/2.5/weather?q=${capitalCity}&appid=${api}&units=metric`;
  
        fetch(url)
          .then(response => response.json())
          .then(weatherData => {
            var weatherDiv = detailsDiv.querySelector(".weather-info");
  
            if (weatherData.main) {
              weatherDiv.innerHTML = `
                <p><strong>Temperature:</strong> ${weatherData.main.temp} °C</p>
                <p><strong>Weather:</strong> ${weatherData.weather[0].description}</p>
              `;
            } else {
              weatherDiv.innerHTML = "<p>Weather data not available.</p>";
            }
          });
      });
  
      oldContent.appendChild(newDiv);
    }
  }
