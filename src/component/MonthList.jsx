import React from "react";
import "../App.css";
import styled from "styled-components";
import { useSelector } from "react-redux";

const MonthList = ({ handleMonthSelect }) => {
  const exes = useSelector((state) => state.expense.expenseList);
  const selectedMonth = useSelector((state) => state.month.selectedMonth);
  // 함수를 handleClick으로 만들어 주고 idx 인덱스 값을 받게 된다.
  // index값을 받은 것만 true로 변경
  const monthArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  //exes를 그대로 사용하니 type error reduce is not a function 오류
  //exes 객체 안에 amount 말고 다른 값들이 있어 NaN으로 출력 오류
  //삼항연산자로 수정 해당 월 지출 내역에 amount 합이 나오도록했다. 지출내역이 없다면 0
  //exes[selectedMonth]가 존재하고 그 길이가 0보다 크면 reduce 함수가 실행되어 합산이 이루어지고, 그렇지 않으면 0 반환
  const totalAmount =
    exes[selectedMonth] && exes[selectedMonth].length > 0
      ? exes[selectedMonth].reduce((acc, cur) => {
          return (acc += cur.amount);
        }, 0)
      : 0;

  return (
    <>
      <Top>
        {/* 현재 날짜로 출력 */}
        <H1>{`2024년 ${selectedMonth + 1}월`}</H1>
        <p>월간 리포트</p>
      </Top>
      <MonthWrap>
        {monthArray.map((MonthText, idx) => {
          return (
            <MonthItem
              key={idx}
              $active={selectedMonth === idx}
              onClick={() => handleMonthSelect(idx)}
            >
              {`${MonthText}월`}
            </MonthItem>
          );
        })}
      </MonthWrap>

      <TotalTitle>
        {`${selectedMonth + 1}월`} 한 달 동안
        <Strong>총 {totalAmount}원</Strong>
        사용했어요.
      </TotalTitle>
    </>
  );
};

export default MonthList;

const Top = styled.div`
  margin: 20px 0;
`;

const H1 = styled.h1`
  font-size: 28px;
  font-weight: bold;
  margin: 15px 0;
`;

const MonthWrap = styled.div`
  width: 620px;
  height: auto;
  background-color: #fff;
  display: flex;
  justify-content: center;
  border-radius: 30px;
  box-shadow: 10px 10px 10px #efefef;
  flex-flow: wrap row;
  padding: 20px;
`;

const MonthItem = styled.li`
  height: 40px;
  background-color: ${(props) => (props.$active ? "#89ACEC" : "#f4f5f7")};
  color: ${(props) => (props.$active ? "#fff" : "#2e2e2e")};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 60px;
  padding: 5px;
  width: 7%;
  margin: 20px 24px;
  cursor: pointer;
`;

const TotalTitle = styled.h1`
  font-size: 38px;
  font-weight: 200;
  line-height: 1.2em;
  margin: 50px 0 0px 0;
`;

const Strong = styled.strong`
  font-weight: 700;
  display: block;
`;
