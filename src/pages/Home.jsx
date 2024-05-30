import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import ExesList from "../component/ExesList";
import ExesForm from "../component/ExesForm";
import MonthList from "../component/MonthList";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { addExpense } from "../redux/slices/expense";
import { setSelectedMonth } from "../redux/slices/month";

const Home = () => {
  //dispatch로 리듀서한테 상태 변경을 요청한다.
  const dispatch = useDispatch();
  //구독할 대상 => expense.expenseList (모든 월의 지출내역)
  const exes = useSelector((state) => state.expense.expenseList);
  const selectedMonth = useSelector((state) => state.month.selectedMonth);

  console.log("selectedMonth1", selectedMonth);
  const handleMonthSelect = (idx) => {
    dispatch(setSelectedMonth(idx));
  };

  const onInsert = useCallback((date, item, amount, desc) => {
    //addExpense() - 리듀서는 함수이다.
    dispatch(
      addExpense({
        selectedMonth: selectedMonth,
        newExes: {
          id: uuidv4(),
          date,
          item,
          amount,
          desc,
          month: selectedMonth,
        },
      })
    );
  });

  //해당 월 지출 내역을 변수에 할당
  //월별 지출 내역이 노출되도록 리스트 컴포넌트에 props로 내려준다.
  const filteredList = exes[selectedMonth];

  useEffect(() => {
    localStorage.setItem("selectedMonth", JSON.stringify(selectedMonth));
  }, [selectedMonth]);

  return (
    <>
      <StContainer>
        <MonthList key={exes.id} handleMonthSelect={handleMonthSelect} />
        <ExesList key={exes.id} filteredList={filteredList} />
        <ExesForm onInsert={onInsert} />
      </StContainer>
    </>
  );
};

export default Home;

const StContainer = styled.section`
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
`;
