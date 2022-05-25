import React, { useEffect, useState } from "react";
import axios from "axios";

// components
import { Table, Spinner } from "react-bootstrap";
import Search from "./Search";

const Countries = () => {
  // data
  const [countries, setCountries] = useState([]);

  // search
  const [filtered, setFiltered] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [jsonSearchTerm, setJsonSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  const getCountries = () => {
    return axios.get("https://restcountries.com/v2/all").catch((err) => {
      console.log(err);
    });
  };

  useEffect(() => {
    getCountries()
      .then((resp) => {
        setCountries(resp.data);
        console.log(resp.data);
      })
      .finally(() => setLoading(false));
  }, []);

  const searchJSON = (searchValue) => {
    if (jsonSearchTerm != "") setJsonSearchTerm("");
    setJsonSearchTerm(searchValue);

    if (searchValue) {
      const filteredCountries = countries.filter((country) =>
        Object.values(country)
          .join("")
          .toLowerCase()
          .includes(searchValue.toLowerCase())
      );
      setFiltered(filteredCountries);
    } else {
      setFiltered(countries);
    }
  };

  const searchCapital = (searchValue) => {
    setSearchTerm(searchValue);
    if (searchTerm != "") setJsonSearchTerm("");

    if (searchValue) {
      const filteredCountries = countries.filter((country) =>
        String(country.capital)
          .toLowerCase()
          .includes(searchValue.toLowerCase())
      );
      setFiltered(filteredCountries);
    } else {
      setFiltered(countries);
    }
  };

  return (
    <div className="container d-flex flex-column">
      <Search
        searchCapital={searchCapital}
        searchTerm={searchTerm}
        jsonSearchTerm={jsonSearchTerm}
        searchJSON={searchJSON}
      />
      {/* {searchTerm
        ? filtered.map(({ name, capital, region, flag, numericCode }) => (
            <div key={numericCode}>
              <h1>{name}</h1>
            </div>
          ))
        : countries.map(({ name, capital, region, flag, numericCode }) => (
            <div key={numericCode}>
              <h1>{name}</h1>
            </div>
          ))} */}

      <Table striped bordered hover className="mt-5">
        <thead>
          <tr className="text-center">
            <th>Name</th>
            <th>Capital</th>
            <th>Region</th>
            <th>Flag</th>
          </tr>
        </thead>
        <tbody>
          {!loading ? (
            searchTerm.length > 0 || jsonSearchTerm.length > 0 ? (
              filtered.map(({ name, capital, region, flag, numericCode }) => (
                <tr key={numericCode}>
                  <td>{name}</td>
                  <td>{capital}</td>
                  <td>{region}</td>
                  <td className="d-flex">
                    <img
                      src={flag}
                      width={150}
                      height={70}
                      alt="flag"
                      className="m-auto"
                    />
                  </td>
                </tr>
              ))
            ) : (
              countries.map(({ name, capital, region, flag, numericCode }) => (
                <tr key={numericCode}>
                  <td>{name}</td>
                  <td>{capital}</td>
                  <td>{region}</td>
                  <td className="d-flex">
                    <img
                      src={flag}
                      width={150}
                      height={70}
                      alt="flag"
                      className="m-auto"
                    />
                  </td>
                </tr>
              ))
            )
          ) : (
            <tr>
              <td colSpan={4} className="">
                <Spinner
                  animation="border"
                  variant="primary"
                  className="my-5"
                  style={{ position: "relative", left: "50%" }}
                />
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default Countries;
