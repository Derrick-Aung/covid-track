import Axios from "axios";

const api_url = "https://covid19.mathdro.id/api";

export const fetchData = async (country) => {
    let changeableUrl = api_url;

    if (country) {
        changeableUrl = `${api_url}/countries/${country}`;
    }
    try {
        const {
            data: { confirmed, recovered, deaths, lastUpdate },
        } = await Axios.get(changeableUrl);
        const modifiedData = { confirmed, recovered, deaths, lastUpdate };

        return modifiedData;
    } catch (error) {}
};

export const fetchDailyData = async () => {
    try {
        const { data } = await Axios.get(`${api_url}/daily`);
        const modifiedData = data.map((dailyData) => ({
            confirmed: dailyData.confirmed.total,
            deaths: dailyData.deaths.total,
            date: dailyData.reportDate,
        }));
        console.log(modifiedData);
        return modifiedData;
    } catch (error) {}
};

export const fetchCountries = async () => {
    try {
        const {
            data: { countries },
        } = await Axios.get(`${api_url}/countries`);
        return countries.map((country) => country.name);
    } catch (error) {}
};
