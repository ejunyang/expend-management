import React, { useCallback, useContext, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { IoIosArrowBack } from "react-icons/io";
import { Context } from "../context/Context";

const Detail = () => {
  const { id } = useParams(); //id를 파라미터로 받아온다
  const navigate = useNavigate(); //페이지 이동
  //useContext로 월별 지출내역이 있는 변수를 가져온다.
  const { filteredList, setExes } = useContext(Context);
  //useParams의 id 값과 월별 지출내역의 id 값이 같은 것을 찾아 변수에 넣어준다

  const exe = filteredList.find((item) => item.id === id);

  //초기값
  const dateRef = useRef(exe.date);
  const itemRef = useRef(exe.item);
  const descRef = useRef(exe.desc);
  const amountRef = useRef(exe.amount);

  //저장된 데이터 불러와서 data 변수에 할당
  //객체로 저장해주어야하기 때문에 파싱
  //로컬스토리지에 저장된 데이터를 불러와 데이터를 삭제하고 업데이트하는 로직으로 구현.
  let data = JSON.parse(localStorage.getItem("expenseList"));

  const onBackButtonHandler = () => {
    navigate(-1); //뒤로가기
  };

  const onRemove = useCallback(
    (id) => {
      if (confirm("정말 삭제하시겠습니까?") == true) {
        //객체 데이터를 배열로 가져옴 data => data[exe.month]
        //전체 월 지출 내역 : 삭제할 지출내역을 제외한 나머지 내역

        //삭제할 지출 내역을 제외한 새로운 배열을 생성
        //새로운 배열을 포함한 새로운 객체를 생성
        //전체 월 지출내역 복사, 삭제할 월의 지출 내역을 변경하고 새로운 객체 생성 => removeExes
        const removeExes = {
          ...data,
          [exe.month]: data[exe.month].filter((ex) => ex.id !== id),
        };
        localStorage.setItem("expenseList", JSON.stringify(removeExes));

        //상태 업데이트
        setExes(removeExes);

        //삭제 후 홈으로 이동
        navigate("/");
      } else {
        return false;
      }
    },
    [exe]
  );

  const onModify = useCallback(
    (id) => {
      const modifiedData = {
        id: exe.id,
        date: dateRef.current.value, //변수 접근
        item: itemRef.current.value,
        amount: +amountRef.current.value, //숫자로만 받아야하기때문에 +연산자 사용(NaN 오류 발생)
        desc: descRef.current.value,
      };

      //변경된 값
      //스프레드 연산자 사용, 객체 + 객체 = 객체 {}
      //스프레드 연산자는 좌변: 원본 데이터 복사 , 우변 덮어씌울 데이터 복사
      //중복된 키 값은 덮어씌울 데이터로 변경된다.
      data[exe.month] = data[exe.month].map((ex) =>
        ex.id === id ? { ...ex, ...modifiedData } : ex
      );

      //상태 업데이트 + 불변성 유지
      //기존 월 지출 내역을 수정된 월 지출 내역으로 업데이트
      setExes((prevExe) => ({
        ...prevExe,
        [exe.month]: data[exe.month],
      }));

      localStorage.setItem("expenseList", JSON.stringify(data));
      alert("수정이 완료되었습니다.");
    },
    [exe]
  );

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
          <StInput ref={dateRef} defaultValue={exe.date} />
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
          <StInput ref={amountRef} defaultValue={exe.amount} />

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

const ButtonWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 20px;
  margin: 30px 0;
`;

const StSelect = styled.select`
  height: 50px;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 10px;
  margin: 10px 0;
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
