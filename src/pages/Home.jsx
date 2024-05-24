import React, { useState } from "react";
import styled from "styled-components";
import ExesList from "../component/ExesList";
import ExesForm from "../component/ExesForm";
import MonthList from "../component/MonthList";
import { v4 as uuidv4 } from "uuid";

const Home = () => {
  //로컬스토리지에 저장되어있는 데이터가 있다면 불러오고 없다면 빈 객체로 가지고 온다.
  //JSON.stringify로 객체를 string으로 변환해준 것을 다시 객체로 변환해주기 위해 JSON.parse를 이용
  const initalLocalData = localStorage.getItem("expenseList")
    ? JSON.parse(localStorage.getItem("expenseList"))
    : {};

  //값을 불러올 때는 useState 기본값에 넣어준다.
  const [exes, setExes] = useState(initalLocalData);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth()); //현재 날짜로 출력

  const handleMonthSelect = (idx) => {
    setSelectedMonth(idx);
  };

  const onInsert = (date, item, amount, desc) => {
    const newExes = {
      id: uuidv4(),
      date,
      item,
      amount,
      desc,
      month: selectedMonth, //추가할때마다 해당하는 월이 어딘지 확인
    };

    //객체로 가져오기
    //key - 월, value - 지출내역
    const addExes = {
      ...exes,
    };

    //해당 월에 지출 내역이 없다면 빈배열을 넣어준다
    if (!addExes[selectedMonth]) {
      addExes[selectedMonth] = [];
    }
    //새로운 지출내역 추가
    addExes[selectedMonth].push(newExes);

    //지출 내역 상태 업데이트
    setExes(addExes);
    //로컬스토리지 저장
    localStorage.setItem("expenseList", JSON.stringify(addExes));
  };

  //해당 월 지출 내역을 변수에 할당
  //월별 지출 내역이 노출되도록 리스트 컴포넌트에 props로 내려준다.
  const filteredList = exes[selectedMonth];

  return (
    <>
      <StContainer>
        <MonthList
          key={exes.id}
          exes={exes}
          selectedMonth={selectedMonth}
          handleMonthSelect={handleMonthSelect}
        />
        <ExesList key={exes.id} filteredList={filteredList} setExes={setExes} />
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
