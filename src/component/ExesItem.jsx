import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const ExesItem = ({ exe }) => {
  const navigate = useNavigate();
  const { id, date, item, amount, desc } = exe;

  const onDetailButtonHandler = (id) => {
    navigate(`/detail/${id}`, { state: { exe } }); //페이지 간 props 전달 -> Detail.jsx
  };
  return (
    <>
      <ExeItem onClick={() => onDetailButtonHandler(id)}>
        <ExeHead>{item}</ExeHead>
        <ExeItemP>
          {desc}
          <Sapn>{date}</Sapn>
        </ExeItemP>
        <H2>{amount}원</H2>
      </ExeItem>
    </>
  );
};

export default ExesItem;

const ExeItem = styled.li`
  background: #fff;
  border-radius: 15px;
  display: flex;
  width: 600px;
  padding: 30px;
  flex-flow: wrap row;
  justify-content: space-between;
  align-items: center;
  font-size: 20px;
  margin: 15px 0;
  box-shadow: 10px 10px 10px #efefef;
  transition: all 0.3s ease;
  &:hover {
    transform: scale(1.02);
    cursor: pointer;
  }
`;

const ExeItemP = styled.p`
  flex: auto;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
const Sapn = styled.span`
  display: block;
  font-size: 15px;
  color: #ccc;
  margin-top: 5px;
`;

const ExeHead = styled.p`
  margin-right: 15px;
  font-size: 30px;
`;

const H2 = styled.h2`
  font-weight: bold;
`;
