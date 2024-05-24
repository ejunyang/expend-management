import React from "react";
import ExesItem from "./ExesItem";

const ExesList = ({ filteredList, setExes }) => {
  return (
    <div>
      <ul>
        {/*
        Uncaught TypeError: Cannot read properties of undefined (reading 'map')
        커밋 된 후에야 모든 효과를 실행
        React는 return에서 map을 반복실행할 때 첫 턴에 데이터가 아직 안들어와도 렌더링이 실행되며 
        당연히 그 데이터는 undefined로 정의되어 오류

        && 사용
        true && expression은 항상 expression으로 실행
        */}
        {filteredList &&
          filteredList.map((exe) => {
            return <ExesItem key={exe.id} exe={exe} setExes={setExes} />;
          })}
      </ul>
    </div>
  );
};

export default ExesList;
