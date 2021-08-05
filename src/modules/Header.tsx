import React from "react";
import styled from "styled-components";

export const Header: React.FC = () => {
  return (
    <Nav>
      <img width={55} height={55} alt="Planned" src="logo.svg" />
      <p style={{ fontWeight: "bold", marginLeft: 20, fontSize: 18 }}>
        Planned test
      </p>
    </Nav>
  );
};

const Nav = styled.div`
  display: flex;
  background: white;
  height: 55px;
  align-items: center;
`;
