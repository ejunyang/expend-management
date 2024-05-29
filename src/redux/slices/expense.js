import { createSlice } from "@reduxjs/toolkit";

// 초기값을 객체로 만든다. expenseList - key, localstorage - value
const initialState = {
  expenseList: localStorage.getItem("expenseList")
    ? JSON.parse(localStorage.getItem("expenseList"))
    : {},
};

const expense = createSlice({
  name: "expense",
  initialState: initialState,
  reducers: {
    //리듀서는 두개의 매개변수를 갖는다. (현재상태, 액션)
    //useState에서 set의 역할 => 리듀서
    addExpense: (state, action) => {
      const { selectedMonth, newExes } = action.payload;
      //이전 데이터 복사 : 불변성 유지
      const addExes = { ...state };

      //해당 월에 지출 내역이 없다면 빈배열을 넣어준다
      if (!addExes[selectedMonth]) {
        addExes[selectedMonth] = [];
      }
      //새로운 지출내역 추가
      addExes[selectedMonth].push(newExes);

      //로컬스토리지 저장
      localStorage.setItem("expenseList", JSON.stringify(addExes));
    },
  },
});

//다른 컴포넌트에서 사용하기 위해 export
export const { addExpense } = expense.actions;
export default expense.reducer;
