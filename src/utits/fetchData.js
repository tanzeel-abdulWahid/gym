
export const exerciseOptions = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
        'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
    }
}

export const fetchData = async (url, options) => {
    const result = await fetch(url, options);
    const data = result.json();

    return data;

}