import React, { useCallback, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { IoIosArrowBack } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { removeExpense, modifyExpense } from "../redux/slices/expense";

const Detail = () => {
  const { id } = useParams();
  const navigate = useNavigate(); //페이지 이동
  const dispatch = useDispatch();
  const allExpenses = useSelector((state) => state.expense.expenseList);

  // 특정 id에 해당하는 지출 항목만 가져오기
  let exe = null;
  //month = key 값(인덱스 역할)
  for (const month in allExpenses) {
    //각 월의 지출내역 데이터 할당
    const expensesOfMonth = allExpenses[month];
    exe = expensesOfMonth.find((expense) => expense.id === id);
    if (exe) break; // id에 해당하는 항목을 찾았으면 반복문 중단
  }

  const dateRef = useRef(exe.date); //초기값
  const itemRef = useRef(exe.item);
  const descRef = useRef(exe.desc);
  const amountRef = useRef(exe.amount);

  const onRemove = useCallback(() => {
    if (confirm("정말 삭제하시겠습니까?") == true) {
      dispatch(removeExpense({ id }));
      navigate("/");
    } else {
      return false;
    }
  });

  const onModify = useCallback(() => {
    dispatch(
      modifyExpense({
        modifiedData: {
          id: exe.id,
          date: dateRef.current.value,
          item: itemRef.current.value,
          amount: +amountRef.current.value,
          desc: descRef.current.value,
        },
      })
    );

    //navigate(-1);
  });

  return (
    <>
      <StContainer>
        <TopWrap>
          <IoIosArrowBack
            style={{ fontSize: "25px", cursor: "pointer" }}
            onClick={() => navigate(-1)}
          />
          <H1>상세 내역</H1>
          <IoIosArrowBack style={{ fontSize: "25px", opacity: "0" }} />
        </TopWrap>

        <ExeItem>
          <ExeHead>{exe.item}</ExeHead>
          <ExeItemP>
            {exe.desc} <Sapn>{exe.date}</Sapn>
          </ExeItemP>
          <H2>{exe.amount}원</H2>
        </ExeItem>

        <DetailContainer>
          <label>날짜</label>
          <StInput ref={dateRef} type="date" defaultValue={exe.date} />
          <label>항목</label>
          <StSelect ref={itemRef} defaultValue={exe.item}>
            <option defaultValue={exe.item}>🎬</option>
            <option defaultValue={exe.item}>🍜</option>
            <option defaultValue={exe.item}>🍿</option>
            <option defaultValue={exe.item}>📚</option>
            <option defaultValue={exe.item}>👕</option>
            <option defaultValue={exe.item}>🧗🏻</option>
          </StSelect>
          <label>내용</label>
          <StInput ref={descRef} defaultValue={exe.desc} />
          <label>금액</label>
          <StInput ref={amountRef} defaultValue={+exe.amount} />

          <ButtonWrap>
            <EditButton onClick={onModify}>수정</EditButton>
            <RemoveButton onClick={onRemove}>삭제</RemoveButton>
          </ButtonWrap>
        </DetailContainer>
      </StContainer>
    </>
  );
};

export default Detail;

const TopWrap = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
`;

const StContainer = styled.section`
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
  margin: 30px 0;
`;

const H1 = styled.h1`
  font-size: 28px;
  font-weight: bold;
  margin: 15px 0;
  text-align: center;
  flex-grow: 2;
`;

const DetailContainer = styled.div`
  max-width: 600px;
  background-color: #fff;
  padding: 30px;
  border-radius: 30px;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

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
`;

const ExeItemP = styled.p`
  flex: auto;
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

const StInput = styled.input`
  height: 30px;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 10px;
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
  margin: 30px 0;
`;

const EditButton = styled.button`
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

const RemoveButton = styled.button`
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
