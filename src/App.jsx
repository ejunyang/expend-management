import Router from "./shared/Router";
import "./App.css";
import { useCallback, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Context } from "./context/Context";

const App = () => {
  //로컬스토리지에 저장되어있는 데이터가 있다면 불러오고 없다면 빈 객체로 가지고 온다.
  //JSON.stringify로 객체를 string으로 변환해준 것을 다시 객체로 변환해주기 위해 JSON.parse를 이용
  const initalLocalData = localStorage.getItem("expenseList")
    ? JSON.parse(localStorage.getItem("expenseList"))
    : {};

  //로컬 스토리지에서 가져온 "selectedMonth" 값이 있으면 그 값을 사용하고, 없으면 현재 월에 1을 더한 값을 사용하여 초기 선택
  const initialSelectedMonth = localStorage.getItem("selectedMonth")
    ? parseInt(localStorage.getItem("selectedMonth"))
    : new Date().getMonth() + 1;

  //값을 불러올 때는 useState 기본값에 넣어준다.
  const [exes, setExes] = useState(initalLocalData);
  const [selectedMonth, setSelectedMonth] = useState(initialSelectedMonth);

  const handleMonthSelect = (idx) => {
    setSelectedMonth(idx);
  };

  const onInsert = useCallback(
    (date, item, amount, desc) => {
      //이전 상태 기반 업데이트
      setExes((prevExes) => {
        const newExes = {
          id: uuidv4(),
          date,
          item,
          amount,
          desc,
          month: selectedMonth,
        };

        // 기존 지출내역 복사
        const addExes = { ...prevExes };

        //해당하는 월의 지출내역이 없다면 빈배열로 반환
        if (!addExes[selectedMonth]) {
          addExes[selectedMonth] = [];
        }

        //해당하는 월의 지출내역에 추가
        addExes[selectedMonth].push(newExes);

        //로컬스토리지에 해당 월 지출내역 저장
        localStorage.setItem("expenseList", JSON.stringify(addExes));

        return addExes;
      });
    },
    [selectedMonth]
  );

  //해당 월 지출 내역을 변수에 할당
  const filteredList = exes[selectedMonth];

  useEffect(() => {
    // 선택한 월이 변경될 때마다 로컬 스토리지 저장
    localStorage.setItem("selectedMonth", selectedMonth);
  }, [selectedMonth]);

  return (
    <Context.Provider
      value={{
        exes,
        setExes,
        selectedMonth,
        setSelectedMonth,
        handleMonthSelect,
        onInsert,
        filteredList,
      }}
    >
      <Router />
    </Context.Provider>
  );
};

export default App;
