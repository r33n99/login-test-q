import React from "react";
import styled from "styled-components";

export const Header = () => {
  return (
    <OnlyContainer>
      <p>ONLY.</p>
    </OnlyContainer>
  );
};

const OnlyContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
  p {
    font-weight: 700;
    font-size: 64px;
    line-height: 78px;
  }
`;
