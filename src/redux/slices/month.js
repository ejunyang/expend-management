import { createSlice } from "@reduxjs/toolkit";

// 초기값을 객체로 만든다.
// localStorage 데이터는 모두 string
let selectedMonth = JSON.parse(localStorage.getItem("selectedMonth"));

// 로컬스토리지에 저장된 월이 없으면 현재 월을 가져온다.
if (!selectedMonth) {
  selectedMonth = new Date().getMonth();
}

const initialState = {
  //selectedMonth 키 = 월 정보 저장
  selectedMonth: selectedMonth,
};

const monthSlice = createSlice({
  name: "month",
  initialState: initialState,
  reducers: {
    setSelectedMonth: (state, action) => {
      //state = initialState
      //현재 월 정보 = 선택된 월을 변경
      state.selectedMonth = action.payload;
      //현재 월 상태를 action.payload 이 값을 사용해서 업데이트 할꺼야
      //액션 객체의 전달인지인 payload는 리듀서에서 매개변수로 사용되어 상태를 업데이트할 때 사용한다.
    },
  },
});

//monthSlice의 액션 생성자를 내보냄
export const { setSelectedMonth } = monthSlice.actions;
// 리듀서 함수를 내보냄
export default monthSlice.reducer;
