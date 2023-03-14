import { useEffect, useState } from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import { getCountries } from './services/getCountries';
import { getCities } from './services/cities';
import { getCityWeather } from './services/weather';
import Header from './componentes/Header';
import './App.css'
import nublado from "./assets/images/nublado.jpg"
import pocasNubes from "./assets/images/pocasNubes.jpg"
import soleado from "./assets/images/soleado.jpg"



const App = () => {
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [weather, setweather] = useState(null)
  const [searchText, setSearchText] = useState("")
  const [countryInfo, setCountryInfo] = useState(null)






  
/* console.log(weather.weather[0].description) */

  /* una mejor manera de traer la promesa de paises */
  useEffect(() => {
    (async () => {
      setCountries(await getCountries())

    })();
  }, []);
  console.log(countries.name)
  
  /* bloque de codigo condicional para traer por orden alfabetico los paises */
  countries.sort((a, b) => {
    if (a.name.common < b.name.common) {
      return -1;
    }
    if (a.name.common > b.name.common) {
      return 1;
    }
    return 0;
  })


  /* console.log(countries)
  console.log(countries.capital) */

  console.log(countryInfo)
  const countryHandler = async e => {
    const value = e.currentTarget.value;
    const value2 = e.target.value
    const selected = countries.find((country) => country.cca2 === value)
    setCountryInfo(selected)
    setSearchText(value)
    e.currentTarget.value && setCities(await getCities(e.currentTarget.value));
    setweather(null);
    
    console.log(value2)
  }

  /* ORDENAR ALFABETICAMENTE LAS CIUDADES */
  cities.sort((a, b) => {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  })



  const cityHandler = async e => e.currentTarget.value && setweather(await getCityWeather(e.currentTarget.value));
  /* forma en la que traigo la ciudad por el onchange para ver en el console.log */
  /* const cityHandler = async e => {
    const temp = e.currentTarget.value;
    console.log(temp)
  } */
  /* console.log(cities) */
  /* forma en la que traigo las ciudades de manera asyncronica para ver en el console.log*/
  /* const countryHandler = async e => {
     const countryCode = e.currentTarget.value;
     const temp = await getCities(countryCode);
     console.log(temp)
   } */
  /* otra forma de traer la url para banderas con una funcion */
  /* let letraMinuscula = searchText.toLowerCase()
 function getCountryFlag(letraMinuscula) {
   if (letraMinuscula) {

     return `https://flagcdn.com/w320/${letraMinuscula}.png`;
   } else {
     return null;
   }
 } */
  /* variable donde guardo la funcion de url de las banderas */
  /* let urlImagen = getCountryFlag(letraMinuscula) */
  /* console.log(urlImagen) */
  const style = {
    /* backgroundImage: `url(${urlImagen})`, */
    backgroundSize: "cover",
    backgroundPosition: "center",
  }
  

  if(weather){
    const weatherDescription = weather.weather[0].description
    /* console.log(weatherDescription) */
    function getBackgroundStyle(weatherDescription) {
      let backgroundImage = '';
    
      if (weatherDescription.includes('few clouds')) {
        backgroundImage = `url(${pocasNubes})`;
      } else if (weatherDescription.includes('clear sky')) {
        backgroundImage = `url(${soleado})`;
      } else if (weatherDescription.includes('overcast clouds')) {
        backgroundImage = `url(${nublado})`;
      }
     
      return {
        backgroundImage,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      };
    }

    const weatherEncontrado = getBackgroundStyle(weatherDescription)
    console.log(weatherEncontrado)
  }
  
  /* function getBackgroundStyle(weatherMain) {
    let backgroundImage = '';
  
    if (weather.description.includes('few clouds')) {
      backgroundImage = 'url(./assets/images/pocasNubes.jpg)';
    } else if (weather.description.includes('clear sky')) {
      backgroundImage = 'url(./assets/images/soleado.jpg)';
    } else if (weather.description.includes('overcast clouds')) {
      backgroundImage = 'url(./assets/images/nublado.jpg)';
    }
  
    return {
      backgroundImage,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    };
  } */


  


  return (
    <BrowserRouter>



      <Route exact path="/">
        <Header />
      </Route>

      <div className="App" >
        <div className='containerPrimer' style={style} /* style={{ backgroundImage: `url(${urlImagen})` }} */>

          <div className='containerSeccion1'>
            <div className="eligePais">

              <label className='labelPais'>Elige un pais:</label>
              {/* <select option={countries} /> */}
              <select className='selectPais' onChange={countryHandler}>
                <option value="">Selecciona</option>
                {countries.map(country => <option value2={country.name.common} key={country.cca2} value={country.cca2}>{country.name.common}</option>

                )}
              </select>

            </div>
            <div className='codigoPais'>
              <label> o Ingresa su codigo</label>
              <input
                className='inputCodigo'
                type="text"
                placeholder='Search for a country'
                value={searchText}
                onChange={countryHandler}
              />
            </div>
          </div>
          <div className='containerImgPais'>
            {countryInfo && (
              <img className='imagenPais' src={countryInfo.flags.png} alt={countryInfo.flag}
              />
            )}
          </div>
        </div>


        {countryInfo && (
          <div className='seccionInfoPais'>

            <p className='detallePais'>Pais: <h1>{countryInfo.name.common}</h1> </p>
            <p className='detallePais'>Capital: <h1>{countryInfo.capital}</h1> </p>
            {/* <p>{countryInfo.currencies_name} </p> */}
            <p className='detallePais'>Continente: <h1>{countryInfo.region}</h1> </p>
            {/* <p>{countryInfo.languages} </p> */}



            {/* <pre className='json'>
              {JSON.stringify(countryInfo, null, 2)}
            </pre> */}
          </div>
        )}

        {cities.length > 0 && (
          <div className='eligeCiudad'>
            <label className='labelCiudad' >Elige una ciudad:</label>
            <select className='selectCiudad' onChange={cityHandler}>
              <option value="">Selecciona</option>
              {cities.map(city => <option key={city.name} >{city.name}</option>)}

            </select>
          </div>)}
        
        {weather && (
          <div className='containerweather1'>

            <p className='tituloWeather'>El tiempo actual</p>
            <p className='horaWeather'>hora: </p>
            <div className='container-ico-temp'>
              <img className='imgWeather' src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="weather icon" />
              <div className='tempWeather'>
                 <p className='tempWeatherNumber'>{weather.main.temp}</p>
                 <p className='centigrados'>°C</p>
              </div>
              <div className='infoWeather'>
              <p className='sensacionWeather'>Sensacion Termica: {weather.main.feels_like}°</p>
              <p className='descriptionWeather'>{weather.weather[0].description}</p>
              </div>
            </div>
           <div className='datosWeather1'> 
            <p className='datosWeather'>Min: {weather.main.temp_min}°</p>
            <p className='datosWeather'>Max: {weather.main.temp_max}°</p>
            <p className='datosWeather'>Humedad: {weather.main.humidity}°</p>
            <p className='datosWeather'>Pressure: {weather.main.pressure}°</p>
           </div> 
            {/* <pre>
              {JSON.stringify(weather, null, 2)}
            </pre> */}
            
          </div>
        )}
       {weather   && (
         <div /* style={weatherEncontrado} */>
          <h1>hola</h1>
        </div>
        )}

      </div>
    </BrowserRouter>
  );
}

export default App;
