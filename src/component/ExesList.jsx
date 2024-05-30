import React from "react";
import ExesItem from "./ExesItem";
import { useSelector } from "react-redux";

const ExesList = ({ filteredList }) => {
  const expenseList = useSelector((state) => state.expense.expenseList);

  return (
    <div>
      <ul>
        {filteredList &&
          filteredList.map((exe) => {
            return <ExesItem key={exe.id} exe={exe} />;
          })}
      </ul>
    </div>
  );
};

export default ExesList;
