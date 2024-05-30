import React, { useCallback, useEffect, useRef, useState } from "react";
import { FaPen } from "react-icons/fa6";
import styled from "styled-components";

const ExesForm = ({ onInsert }) => {
  const [date, setDate] = useState(""); // 항목
  const [item, setItem] = useState(""); // 항목
  const [amount, setAmount] = useState(""); // 금액
  const [desc, setDesc] = useState(""); // 내용
  const [open, setOpen] = useState(false); //입력창

  const onSubmit = useCallback((e) => {
    if (item === "" || amount === "" || desc === "") {
      alert("빈칸을 채워주세요");
      return;
    }
    e.preventDefault();
    onInsert(date, item, amount, desc);
    setItem("");
    setAmount("");
    setDesc("");
    setOpen(false);
  });

  return (
    <div>
      {open && (
        <AddForm onSubmit={onSubmit}>
          <H1>지출 작성</H1>
          <label>날짜</label>
          <StInput
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <label>항목</label>
          <StSelect
            type="text"
            value={item}
            onChange={(e) => setItem(e.target.value)}
            placeholder="항목을 입력해주세요"
          >
            <option value="🍜" defaultValue>
              식비
            </option>
            <option value="🎬">문화</option>
            <option value="🍿">간식</option>
            <option value="📚">도서</option>
            <option value="👕">쇼핑</option>
            <option value="🧗🏻">운동</option>
          </StSelect>
          <label>내용</label>
          <StInput
            type="text"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            placeholder="내용을 입력해주세요"
          />
          <label>금액</label>
          <StInput
            type="number"
            value={amount}
            onChange={(e) => setAmount(+e.target.value)}
            placeholder="금액을 입력해주세요"
          />
          <ButtonWrap>
            <AddButton>등록</AddButton>
            <CancleButton onClick={() => setOpen(false)}>취소</CancleButton>
          </ButtonWrap>
        </AddForm>
      )}
      <ModalButton onClick={() => setOpen(!open)} open={open}>
        <FaPen style={{ color: "#fff", fontSize: "20px" }} />
      </ModalButton>
    </div>
  );
};

export default ExesForm;

const ModalButton = styled.button`
  width: 70px;
  height: 70px;
  background-color: #89acec;
  border-radius: 60px;
  padding: 10px;
  border: none;
  position: fixed;
  z-index: 9;
  bottom: 7%;
  right: 18%;
  box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  &:hover {
    cursor: pointer;
    background: #557bb5;
  }
`;

const AddForm = styled.form`
  background: #fff;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 30px;
  box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.1);
  padding: 30px;
  z-index: 99;
  display: flex;
  flex-direction: column;
  width: 600px;
`;

const StInput = styled.input`
  height: 30px;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 10px;
  margin: 10px 0;
`;

const StSelect = styled.select`
  height: 50px;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 10px;
  margin: 10px 0;
`;

const ButtonWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 20px;
  margin: 20px 0;
`;

const AddButton = styled.button`
  background: #89acec;
  color: #fff;
  border: none;
  border-radius: 30px;
  padding: 10px 20px;
  transition: all 0.3s ease;

  &:hover {
    cursor: pointer;
    background: #557bb5;
  }
`;

const CancleButton = styled.button`
  background: #f4f5f7;
  color: #2e2e2e;
  border: none;
  border-radius: 30px;
  padding: 10px 20px;
  transition: all 0.3s ease;

  &:hover {
    cursor: pointer;
    background: #cecece;
  }
`;

const H1 = styled.h1`
  font-size: 28px;
  font-weight: bold;
  margin: 15px 0;
  text-align: center;
`;
