import React, { useState } from "react";
//Styling imports
import styled from "styled-components";
import GlobalStyle from "./styles/Global";
import { device } from "./styles/Global";
//Componets imports
import { Header } from "./modules/Header";
import { FilterBox } from "./modules/FilterBox";
import { ResultsBox } from "./modules/ResultsBox";
//State management imports
import { SearchContext } from "./context/SearchContext";

interface Users {
  user: {
    age: number;
    country: string;
    email: string;
    name: {
      firstName: string;
      lastName: string;
    };
  }[];
}

const App: React.FC = () => {
  const [users, setUsers] = useState<Users[] | null>(null);
  const [minAge, setMinAge] = useState<number | null>(null);
  const [maxAge, setMaxAge] = useState<number | null>(null);
  const [name, setName] = useState<string | null>(null);

  return (
    <div>
      <GlobalStyle />
      <Header />
      <SearchContext.Provider
        value={{
          users,
          setUsers,
          minAge,
          setMinAge,
          maxAge,
          setMaxAge,
          name,
          setName,
        }}
      >
        <div style={{}}>
          <Wrapper>
            <FilterBox />
            <ResultsBox />
          </Wrapper>
        </div>
      </SearchContext.Provider>
      {/* filter box */}
      {/* search results */}
    </div>
  );
};

const Wrapper = styled.div`
  @media ${device.mobileS} {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: #f4f6f8;
    align-items: center;
    margin-left: 30px;
    margin-right: 30px;
    position: relative;
    padding: 90px 0px 0px 0px;
  }
  @media ${device.laptop} {
    display: flex;
    flex-direction: row;
    background: inherit;
    width: 70%;
    align-items: flex-start;
    margin-left: auto;
    margin-right: auto;
    position: relative;
    padding: 90px 0px 0px 0px;
  }

  background: black;
  padding: 20px;
`;

export default App;
