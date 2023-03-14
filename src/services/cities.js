import { ajax } from "../tools/ajax";

export const getCities = async countryCode => {
    const optionsRequest = {
        method: "GET",
        url: "https://spott.p.rapidapi.com/places",
        headers: {
            'X-RapidAPI-Key': '52ead4be0cmshca7081ee661f591p1539c3jsnbac12967d212',
            'X-RapidAPI-Host': 'spott.p.rapidapi.com'
        },
        params: {
            limit: 100,
            type: "CITY",
            country: countryCode ?? "US",
        }
    };
    return await ajax(optionsRequest)
}  