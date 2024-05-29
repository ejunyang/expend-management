import React, { useCallback, useEffect, useRef } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { IoIosArrowBack } from "react-icons/io";

const Detail = () => {
  const { id } = useParams();
  const navigate = useNavigate(); //페이지 이동
  const location = useLocation(); //페이지 간 props 받기
  const exe = location.state.exe;

  const dateRef = useRef(exe.date); //초기값
  const itemRef = useRef(exe.item);
  const descRef = useRef(exe.desc);
  const amountRef = useRef(exe.amount);

  let data = JSON.parse(localStorage.getItem("expenseList"));
  //저장된 데이터 불러와서 data 변수에 할당
  //객체로 저장해주어야하기 때문에 파싱
  //Detail 페이지를 컴포넌트로 만들지 않아 종속성이 없기 때문에 props를 받지 못한다.
  //로컬스토리지에 저장된 데이터를 불러와 데이터를 삭제하고 업데이트하는 로직으로 구현.

  const onBackButtonHandler = () => {
    navigate(-1); //뒤로가기
  };

  const onRemove = useCallback((id) => {
    if (confirm("정말 삭제하시겠습니까?") == true) {
      //불러온 데이터를 filter 메서드로 순회를 돌려 반환한 데이터들을 removeData 변수에 할당
      //객체 데이터를 배열로 가져옴 data => data[item.month]
      const removeData = data[exe.month].filter((ex) => ex.id !== id);
      //삭제된 데이터를 제외한 나머지 데이터를 다시 재할당(갱신)
      data[exe.month] = removeData;
      localStorage.setItem("expenseList", JSON.stringify(data));
      //삭제 후 홈으로 이동
      navigate(-1);
    } else {
      return false;
    }
  });

  const onModify = useCallback((id) => {
    const modifiedData = {
      id: exe.id,
      date: dateRef.current.value, //변수 접근
      item: itemRef.current.value,
      amount: +amountRef.current.value,
      desc: descRef.current.value,
    };

    //변경된 값
    //스프레드 연산자 사용, 객체 + 객체 = 객체 {}
    //스프레드 연산자는 좌변: 원본 데이터 복사 , 우변 덮어씌울 데이터 복사
    //중복된 키 값은 덮어씌울 데이터로 변경된다.
    const modifyExes = data[exe.month].map((ex) =>
      ex.id === id ? { ...ex, ...modifiedData } : ex
    );
    data[exe.month] = modifyExes;

    localStorage.setItem("expenseList", JSON.stringify(data));
    navigate(-1);
  });

  return (
    <>
      <StContainer>
        <TopWrap>
          <IoIosArrowBack
            style={{ fontSize: "25px", cursor: "pointer" }}
            onClick={onBackButtonHandler}
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
            <EditButton onClick={() => onModify(id)}>수정</EditButton>
            <RemoveButton onClick={() => onRemove(id)}>삭제</RemoveButton>
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
