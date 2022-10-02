let weatherData = {
    API : "3fa1334f934f49f53f6834d8e5c5ad61",
    fetchData : function(city){
        fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${this.API}`
        ).then((res) =>{      
            if(!res.ok){
                alert("City Not Found. Enter valid City name")
                throw new Error("Weather Not Found  ")
            }
            return(res.json())
        }).then((data) => {
            this.showData(data)            
        })
    },
    showData : function(data){        
        const { name } = data;
        const { temp, humidity} = data.main;
        const {icon, description} = data.weather[0]
        const {speed} = data.wind
        
        document.querySelector(".cityName").innerHTML = `Weather in ${name.toUpperCase()}`;
        document.querySelector(".temp").innerHTML = `${temp} °C`;
        document.querySelector(".weathericon").src = `https://openweathermap.org/img/wn/${icon}.png`;
        document.querySelector(".weatherDesc").innerHTML = description ;
        document.querySelector(".humidity").innerHTML = `Humidity: ${humidity}%`;
        document.querySelector(".wind").innerHTML = `Wind Speed: ${speed}km/h`;
        document.body.style.backgroundImage = `url("https://source.unsplash.com/1600x900/?${name}")`        
    },
    search: function(){
        const inputCity = document.querySelector(".input").value
        
        if(inputCity == null){
            
            weatherData.fetchData("Mumbai") 
        }
        this.fetchData(inputCity)
    }
    }

function handleclick(){
      
    weatherData.search();
}
function ontype(){
    document.querySelector(".input").addEventListener('keyup', function(event){
        
        if(event.key === "Enter"){
            
            weatherData.search();
        }
    })
}

weatherData.fetchData("Mumbai")
   