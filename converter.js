// get country list
const getCurriences = async () => {
    const response = await fetch("https://currency-converter5.p.rapidapi.com/currency/list?format=json", {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "currency-converter5.p.rapidapi.com",
            "x-rapidapi-key": "9385076803msh567a5a23713774ap1397b5jsnd3bdb66f01b3"
        }
    })
    const data = await response.json();
    return { data };
}
const convert = async (from, to, amount) => {
    const response = await fetch(`https://currency-converter5.p.rapidapi.com/currency/convert?format=json&from=${from}&to=${to}&amount=${amount}`,
        {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "currency-converter5.p.rapidapi.com",
                "x-rapidapi-key": "9385076803msh567a5a23713774ap1397b5jsnd3bdb66f01b3"
            }
        })
    const data = response.json();
    return data;
}