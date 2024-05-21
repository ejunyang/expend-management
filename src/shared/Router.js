import React from "react";
import { BrowserRouter, Routes } from "react-router-dom";

//BrowserRouter를 Router로 감싸는 이유는, 브라우저가 깜빡이지 않고 다른 페이지로 이동할 수 있게 만들어준다.
const Router = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="detail" element={<Detail />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default Router;
