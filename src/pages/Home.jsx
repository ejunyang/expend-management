import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import ExesList from "../component/ExesList";
import ExesForm from "../component/ExesForm";
import MonthList from "../component/MonthList";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { addExpense } from "../redux/slices/expense";

const Home = () => {
  const initalLocalData = localStorage.getItem("expenseList")
    ? JSON.parse(localStorage.getItem("expenseList"))
    : {};

  const initialSelectedMonth = localStorage.getItem("selectedMonth")
    ? parseInt(localStorage.getItem("selectedMonth"))
    : new Date().getMonth();

  //const [exes, setExes] = useState(initalLocalData);
  //dispatch로 리듀서한테 상태 변경을 요청한다.
  const dispatch = useDispatch();
  const exes = useSelector((state) => state.expense.expenseList);
  console.log(exes);
  const [selectedMonth, setSelectedMonth] = useState(initialSelectedMonth);

  const handleMonthSelect = (idx) => {
    setSelectedMonth(idx);
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
    // const newExes = {
    //   id: uuidv4(),
    //   date,
    //   item,
    //   amount,
    //   desc,
    //   month: selectedMonth,
    // };

    // //객체로 가져오기
    // //key - 월, value - 지출내역
    // const addExes = {
    //   ...exes,
    // };

    // //해당 월에 지출 내역이 없다면 빈배열을 넣어준다
    // if (!addExes[selectedMonth]) {
    //   addExes[selectedMonth] = [];
    // }
    // //새로운 지출내역 추가
    // addExes[selectedMonth].push(newExes);

    // //지출 내역 상태 업데이트
    // setExes(addExes);
    // //로컬스토리지 저장
    // localStorage.setItem("expenseList", JSON.stringify(addExes));
  });

  //해당 월 지출 내역을 변수에 할당
  //월별 지출 내역이 노출되도록 리스트 컴포넌트에 props로 내려준다.
  const filteredList = exes[selectedMonth];

  useEffect(() => {
    localStorage.setItem("selectedMonth", JSON.stringify(selectedMonth));
  });

  return (
    <>
      <StContainer>
        <MonthList
          key={exes.id}
          exes={exes}
          selectedMonth={selectedMonth}
          handleMonthSelect={handleMonthSelect}
        />
        <ExesList key={exes.id} filteredList={filteredList} />
        <ExesForm onInsert={onInsert} exes={exes} />
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
