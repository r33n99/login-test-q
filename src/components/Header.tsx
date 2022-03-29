import React from "react";
import styled from "styled-components";

export const Header = () => {
  return (
    <HeaderContainer>
      <p>ONLY.</p>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
  p {
    font-weight: 700;
    font-size: 64px;
    line-height: 78px;
    @media (max-width: 425px) {
    font-size: 48px;
}
  }
`;
