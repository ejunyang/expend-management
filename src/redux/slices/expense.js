import { createSlice } from "@reduxjs/toolkit";

// 초기값을 객체로 만든다.
const initialState = {
  expenseList: localStorage.getItem("expenseList")
    ? JSON.parse(localStorage.getItem("expenseList"))
    : {},
};

const expense = createSlice({
  name: "expense",
  initialState: initialState,
  reducers: {
    //리듀서 함수는 두개의 매개변수를 갖는다. (현재상태, 액션)
    //useState에서 set의 역할 => 리듀서
    addExpense: (state, action) => {
      //받아올 값 : 해당 월과 새로운 지출내역
      const { selectedMonth, newExes } = action.payload;
      if (!state.expenseList[selectedMonth]) {
        state.expenseList[selectedMonth] = [];
      }
      //state : 현재상태 / expenseList : 모든 월의 지출내역
      //불변성 유지(push사용이 가능한 이유) : immer.js가 있어 mutable하게 코드를 작성해도 immutable하게 변환해준다.
      state.expenseList[selectedMonth].push(newExes);
      //로컬스토리지 저장
      localStorage.setItem("expenseList", JSON.stringify(state.expenseList));
      return state;
    },

    removeExpense: (state, action) => {
      //받아올 값 : id
      const { id } = action.payload;
      //for-in 문으로 객체 month를 키값으로 객체 순회
      for (const month in state.expenseList) {
        //각 월 지출 내역 데이터 할당
        const expensesOfMonth = state.expenseList[month];
        //해당 월 지출 내역에 삭제하려는 Id를 제외한 나머지 데이터 할당
        const filteredExpenses = expensesOfMonth.filter(
          (expense) => expense.id !== id
        );
        // 필터링된 결과를 해당 월의 지출 내역에 재할당
        state.expenseList[month] = filteredExpenses;
      }
      localStorage.setItem("expenseList", JSON.stringify(state.expenseList));
    },
    modifyExpense: (state, action) => {
      const { modifiedData } = action.payload;
      for (const month in state.expenseList) {
        //각 월 지출 내역 배열 할당
        const expensesOfMonth = state.expenseList[month];
        const modifyExpense = expensesOfMonth.map((ex) =>
          ex.id === modifiedData.id ? { ...ex, ...modifiedData } : ex
        );
        console.log("modifyExpense", modifyExpense);
        state.expenseList[month] = modifyExpense;
      }
      localStorage.setItem("expenseList", JSON.stringify(state.expenseList));
    },
  },
});

//다른 컴포넌트에서 사용하기 위해 export
export const { addExpense, removeExpense, modifyExpense } = expense.actions;
export default expense.reducer;
