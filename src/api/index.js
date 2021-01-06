import axios from "axios";

const url = "https://covid19.mathdro.id/api";

export const fetchData = async (country) => {
  let countryURL = url;
  if (country) {
    countryURL = `${url}/countries/${country}`;
  }
  try {
    const { data } = await axios.get(countryURL);
    const modifiedData = {
      confirmed: data.confirmed,
      recovered: data.recovered,
      deaths: data.deaths,
      lastUpdate: data.lastUpdate,
    };
    return modifiedData;
  } catch (err) {
    alert(err);
  }
};

export const FetchDailyData = async () => {
  try {
    const { data } = await axios.get(`${url}/daily`);
    const modifiedData = data.map((dailydata) => ({
      confirmed: dailydata.confirmed.total,
      deaths: dailydata.deaths.total,
      date: dailydata.reportDate,
    }));
    // console.log(modifiedData);
    return modifiedData;
  } catch (err) {
    console.log(err);
  }
};

export const FetchCountryData = async () => {
  try {
    const {
      data: { countries },
    } = await axios.get(`${url}/countries`);

    return countries.map((country) => country.name);
  } catch (err) {
    console.log(err);
  }
};
