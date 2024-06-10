import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Detail from "../pages/Detail";
import Layout from "./Layout";

//BrowserRouter를 Router로 감싸는 이유는, 브라우저가 깜빡이지 않고 다른 페이지로 이동할 수 있게 만들어준다.
//홈 페이지와 디테일 페이지 둘다 state를 쓸 수 있는 방법
//라우터를 사용하면 ContextAPI로 state를 한군데 모아 뽑아서 사용해야한다.
//라우턴 함수 전달은 불가하기 때문에 setExes 를 디테일 페이지로 전달하는 것은 불가
const Router = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/detail/:id" element={<Detail />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};
export default Router;
