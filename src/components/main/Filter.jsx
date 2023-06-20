import React, { useState } from "react";
import useFetch from "../../hooks/use-fetch";
import Select from "react-select";
// import Coloroptions from "../data";

const customStyles = {
  option: (provided, state) => {
    return {
      ...provided,

      backgroundColor:
        state.data === state.selectProps.value ? "#182C61" : "white",
      color: state.data === state.selectProps.value ? "white" : "#182C61"
    };
  }
};

const catergoryOptions = [
  { value: "ability", label: "abilities" },
  { value: "pokemon-color", label: "color" },
  { value: "pokemon-shape", label: "shape" },
  { value: "pokemon-habitat", label: "habitat" },
  { value: "growth-rate", label: "growthRate" }
];

const initialValue = { value: "", label: "" };

function Filter({ onFilter }) {
  const [category, setCategory] = useState(initialValue);
  const [options, setOptions] = useState(null);
  const [subCategory, setSubCategory] = useState(initialValue);

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

  const filterSubCatergoryHandler = async function (e) {
    const categoryValue = category.label;
    const value = e.value;
    setSubCategory(e);

    onFilter({ category: categoryValue, subCategory: value });
  };

  return (
    <div className="relative w-56 bg-red-400   ">
      <div className="fixed  w-56 left-0 h-full bg-[#182C61]  text-[#e8eaef] z-50 px-5">
        <p className="flex-1 mt-20 capitalize mb-4 ">filter by:</p>
        <div className="flex flex-wrap gap-2 justify-center ">
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
          <div className="flex flex-wrap gap-2 mt-4 ">
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
