import React, { useState, useEffect } from "react";
import { FetchCountryData } from "../../api";
import { NativeSelect, FormControl } from "@material-ui/core";
import styles from "./CountryPicker.module.css";

const CountryPicker = ({ handleCountryChange }) => {
  const [selectedCountry, setSelectedCountry] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      setSelectedCountry(await FetchCountryData());
    };
    fetchAPI();
  }, [selectedCountry]);
  return (
    <>
      <FormControl className={styles.formControl}>
        <NativeSelect
          defaultValue=""
          onChange={(event) => handleCountryChange(event.target.value)}
        >
          <option value="">Global:</option>
          {selectedCountry.map((country, i) => (
            <option key={i} value={country}>
              {country}
            </option>
          ))}
        </NativeSelect>
      </FormControl>
    </>
  );
};

export default CountryPicker;
