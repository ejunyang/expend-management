import { configureStore } from "@reduxjs/toolkit";
import expense from "../slices/expense";
import month from "../slices/month";

// 1. 스토어 생성
// 2. 리듀서 생성
// 3. 리듀서 기능 구현
// 4. 리듀서 사용

//조합된 리듀서가 있는 rootReducer로 스토어 생성
const store = configureStore({
  reducer: {
    //expense.js에서 만든 객체 그자체
    expense: expense,
    month: month,
  },
});

//다른 컴포넌트에서 사용하기 위해 export
export default store;
