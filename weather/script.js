// const axios = require("axios");
const url = 'https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'de1769ddb9msh50bb38051e75ae9p18a980jsn61f25ce747fb',
		'X-RapidAPI-Host': 'weather-by-api-ninjas.p.rapidapi.com'
	}
};

const getweather = (city) => {
	cityname.innerHTML = city;

	fetch(url + city, options)
		.then(response => response.json())
		.then(response => {
			console.log(response);
			cloud_pct.innerHTML = response.cloud_pct;
			feels_like.innerHTML = response.feels_like;
			temp.innerHTML = response.temp;
			humidity.innerHTML = response.humidity;
			max_temp.innerHTML = response.max_temp;
			min_temp.innerHTML = response.min_temp;
			sunrise.innerHTML = response.sunrise;
			sunset.innerHTML = response.sunset;
			wind_degrees.innerHTML = response.wind_degrees;
			wind_speed.innerHTML = response.wind_speed;

		})
		.catch(err => console.log(err));

}

btn.addEventListener("click", () => {
	getweather(search.value);
})

getweather("Delhi");


fetch(url + "jaipur", options)
	.then(response => response.json())
	.then(response => {
		jcloud_pct.innerHTML = response.cloud_pct;
		jfeels_like.innerHTML = response.feels_like;
		jtemp.innerHTML = response.temp;
		jhumidity.innerHTML = response.humidity;
		jmax_temp.innerHTML = response.max_temp;
		jmin_temp.innerHTML = response.min_temp;
		jsunrise.innerHTML = response.sunrise;
		jsunset.innerHTML = response.sunset;
		jwind_degrees.innerHTML = response.wind_degrees;
		jwind_speed.innerHTML = response.wind_speed;

	})

fetch(url + "kolkata", options)
	.then(response => response.json())
	.then(response => {
		kcloud_pct.innerHTML = response.cloud_pct;
		kfeels_like.innerHTML = response.feels_like;
		ktemp.innerHTML = response.temp;
		khumidity.innerHTML = response.humidity;
		kmax_temp.innerHTML = response.max_temp;
		kmin_temp.innerHTML = response.min_temp;
		ksunrise.innerHTML = response.sunrise;
		ksunset.innerHTML = response.sunset;
		kwind_degrees.innerHTML = response.wind_degrees;
		kwind_speed.innerHTML = response.wind_speed;

	})
fetch(url + "mumbai", options)
	.then(response => response.json())
	.then(response => {
		mcloud_pct.innerHTML = response.cloud_pct;
		mfeels_like.innerHTML = response.feels_like;
		mtemp.innerHTML = response.temp;
		mhumidity.innerHTML = response.humidity;
		mmax_temp.innerHTML = response.max_temp;
		mmin_temp.innerHTML = response.min_temp;
		msunrise.innerHTML = response.sunrise;
		msunset.innerHTML = response.sunset;
		mwind_degrees.innerHTML = response.wind_degrees;
		mwind_speed.innerHTML = response.wind_speed;

	})
fetch(url + "chennai", options)
	.then(response => response.json())
	.then(response => {
		ccloud_pct.innerHTML = response.cloud_pct;
		cfeels_like.innerHTML = response.feels_like;
		ctemp.innerHTML = response.temp;
		chumidity.innerHTML = response.humidity;
		cmax_temp.innerHTML = response.max_temp;
		cmin_temp.innerHTML = response.min_temp;
		csunrise.innerHTML = response.sunrise;
		csunset.innerHTML = response.sunset;
		cwind_degrees.innerHTML = response.wind_degrees;
		cwind_speed.innerHTML = response.wind_speed;

	})
fetch(url + "bangalore", options)
	.then(response => response.json())
	.then(response => {
		bcloud_pct.innerHTML = response.cloud_pct;
		bfeels_like.innerHTML = response.feels_like;
		btemp.innerHTML = response.temp;
		bhumidity.innerHTML = response.humidity;
		bmax_temp.innerHTML = response.max_temp;
		bmin_temp.innerHTML = response.min_temp;
		bsunrise.innerHTML = response.sunrise;
		bsunset.innerHTML = response.sunset;
		bwind_degrees.innerHTML = response.wind_degrees;
		bwind_speed.innerHTML = response.wind_speed;

	})


