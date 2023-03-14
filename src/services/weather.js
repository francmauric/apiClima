import { ajax } from "../tools/ajax";

export const getCityWeather = async city => {
    const optionsRequest = {
        method: "GET",
        url: "https://api.openweathermap.org/data/2.5/weather",
        params: {
            q: city,
            appid: "8b4585ba1674af3fa7900d21e25a8a23",
            units: "metric",
        }
    };
    return await ajax(optionsRequest)
}