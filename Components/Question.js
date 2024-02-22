import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Inc, Dec, UserSelecOption, ShowResult } from "../Reducer/Actions";
import api from "../API";
const Question = () => {
  const [index, setIndex] = useState(0); // Initialize index state
  const dispatch = useDispatch();
  const stats = useSelector((state) => state.Reducer);

  useEffect(() => {
    if (stats.UserArray[index] != null) {
      setIndex(stats.UserArray[index]);
    }
  }, [stats.UserArray, index]);

  const handleOptionSelect = (selectedOptionIndex) => {
    dispatch(UserSelecOption(index, selectedOptionIndex)); // Dispatch action to update selected option
  };

  const handlePrevious = () => {
    if (index > 0) {
      dispatch(Dec());
    }
  };

  const handleNext = () => {
    if (index < api.length - 1) {
      dispatch(Inc());
    }
  };

  const handleSubmit = () => {
    dispatch(ShowResult());
  };

  return (
    <div>
      <div className="text-white p-3 my-2 bg-green rounded-md">
        <div className="Ask">Question : {`${api[index].Question} ? `}</div>

        <div className="Options">
          {api[index].Options.map((option, optionIndex) => (
            <label
              key={optionIndex}
              onClick={() => handleOptionSelect(optionIndex)}
              htmlFor={optionIndex}
              className="flex space-x-2 Blur my-3 p-2 rounded-md items-center"
            >
              <input
                type="radio"
                id={optionIndex}
                name={index}
                value={option}
                className="appearance-none bg-white h-[15px] w-[15px] rounded-full"
              />
              <p>{option}</p>
            </label>
          ))}
        </div>
      </div>
      <div className="Buttons flex w-[100%] justify-between space-x-2">
        <div
          onClick={handlePrevious}
          className="B1 bg-green-500 w-[50%] p-2 rounded-md cursor-pointer text-center"
        >
          Previous
        </div>
        <div
          onClick={handleNext}
          className={`B2 ${
            index !== api.length - 1
              ? "text-center block bg-green-500 w-[50%] p-2 rounded-md cursor-pointer"
              : "hidden"
          }`}
        >
          Next
        </div>
        <div
          onClick={handleSubmit}
          className={`B3 ${
            index === api.length - 1
              ? "block bg-blue-500 text-white w-[50%] p-2 rounded-md cursor-pointer text-center"
              : "hidden"
          }`}
        >
          Submit
        </div>
      </div>
    </div>
  );
};

export default Question;
