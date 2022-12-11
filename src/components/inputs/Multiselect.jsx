import React, { useState, useRef, useEffect } from "react";
import { BiX } from "react-icons/bi";

function MultiSelect({ items, selectedOptions = [], onChange }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [optionsVisible, setOptionsVisible] = useState(false);
  const ref = useRef(null);

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setOptionsVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  });

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleOptionSelect = (value) => {
    onChange([...selectedOptions, parseInt(value)])
  };

  const handleOptionDeselect = (option) => {
    const filteredOptions = selectedOptions.filter((o) => o !== option);
    onChange(filteredOptions)
  };

  const itemArray = Object.keys(items).map((key) => ({
    id: key,
    value: items[key],
  }));

  const filteredItems = itemArray.filter((item) =>
    !selectedOptions.find(id => parseInt(id) === parseInt(item.id)) &&
    item.value.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
    <div className="flex relative">
      <input
        className="input input-sm border-gray-300 rounded-md border w-full"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearch}
        onClick={() => setOptionsVisible(true)}
      />
      {optionsVisible && filteredItems.length > 0 && (
        <div ref={ref} className="absolute z-50 w-full mt-8 rounded-md bg-white shadow-lg max-h-32 overflow-scroll">
          {filteredItems.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`w-full px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900 ${
                selectedOptions.includes(item) ? "bg-blue-500" : ""
              }`}
              onClick={() => handleOptionSelect(item.id) }
            >
              {item.value}
            </button>
          ))}
        </div>
      )}
    </div>
      {selectedOptions.length > 0 && (
        <>
          {selectedOptions.map((id, index) => (
            <div
              className="ml-2 mt-1 items-center badge badge-lg"
              key={id}
            >
              {items[id]}
              <BiX size="1em" className='cursor-pointer ml-2 mt-0.5' onClick={() => handleOptionDeselect(id)}/>
            </div>
          ))}
        </>
      )}
    </>
  );
}

export default MultiSelect;
