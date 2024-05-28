import React from "react";
import styled from "styled-components";
import ExesList from "../component/ExesList";
import ExesForm from "../component/ExesForm";
import MonthList from "../component/MonthList";

const Home = () => {
  return (
    <StContainer>
      <MonthList />
      <ExesList />
      <ExesForm />
    </StContainer>
  );
};

export default Home;

const StContainer = styled.section`
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
`;
