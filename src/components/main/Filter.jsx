import React, { useState } from "react";
import useFetch from "../../hooks/use-fetch";
import Select from "react-select";
// import Coloroptions from "../data";

const customStyles = {
  option: (provided, state) => {
    return {
      ...provided,
      // color: "#182C61",
      backgroundColor:
        state.data === state.selectProps.value ? "#182C61" : "white",
      color: state.data === state.selectProps.value ? "white" : "#182C61"
    };
  }
};

const catergoryOptions = [
  { value: "pokemon-species", label: "species" },
  { value: "ability", label: "ability" },
  { value: "pokemon-color", label: "color" },
  { value: "pokemon-shape", label: "shape" },
  { value: "pokemon-habitat", label: "habitat" },
  { value: "gender", label: "gender" }
];

const initialValue = { value: "", label: "" };

function Filter() {
  const [category, setCategory] = useState(initialValue);
  const [options, setOptions] = useState(null);
  const [subCategory, setSubCategory] = useState(initialValue);

  // console.log(category);

  const { data, error, isLoading } = useFetch("https://pokeapi.co/api/v2/");
  // const { data: species } = useFetch(
  //   "https://pokeapi.co/api/v2/pokemon-species/1"
  // );

  // console.log(data);
  // console.log(species);

  const filterCategoryHandler = async function (e) {
    const value = e.value;
    setCategory(e);
    setSubCategory(initialValue);
    if (value == "") {
      return;
    }
    const req = await fetch(`https://pokeapi.co/api/v2/${value}/`);
    const res = await req.json();
    const results = res?.results;
    const values = results?.map((item) => ({
      label: item?.name,
      value: item?.name
    }));
    setOptions(values);
  };

  const filterSubCatergoryHandler = function (e) {
    const value = e.value;
    setSubCategory(e);
    console.log(value, category.value);
  };

  return (
    <div className="relative w-56 bg-red-400   ">
      <div className="fixed  w-56 left-0 h-full bg-[#182C61]  text-[#e8eaef] z-50">
        <div className="flex flex-wrap gap-2 justify-center mt-20 px-5">
          <h3 className="flex-1">Catergory</h3>
          <Select
            options={catergoryOptions}
            styles={customStyles}
            className="w-full capitalize"
            onChange={filterCategoryHandler}
            placeholder="select..."
            value={category}
          />
        </div>

        {options && (
          <div className="flex flex-wrap gap-2 mt-4 px-5">
            <h3 className="flex-1">Sub - Catergory</h3>
            <Select
              options={options}
              styles={customStyles}
              className="w-full capitalize"
              onChange={filterSubCatergoryHandler}
              placeholder="select..."
              value={subCategory}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Filter;
