import React, { useContext } from "react";
import styled from "styled-components";
import { device } from "../styles/Global";
import axios from "axios";
import { SearchContext } from "../context/SearchContext";
const API_URL = "http://localhost:8099";

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

export const FilterBox: React.FC = () => {
  const { setUsers, setMinAge, setMaxAge, minAge, maxAge, name } =
    useContext(SearchContext);

  async function getUsers(min: number, max: number, name: string | null) {
    try {
      const kids = await axios.get(`${API_URL}/users/kids`);
      const adults = await axios.get(`${API_URL}/users/adults`);
      const seniors = await axios.get(`${API_URL}/users/seniors`);
      let all = [...kids.data.data, ...adults.data.data, ...seniors.data.data];
      let result: Users["user"] = [];

      //#region age filters

      //has min and max
      if (min && max) {
        for (let i = 0; i < all.length; i++) {
          if (all[i].age >= min && all[i].age <= max) {
            console.log("FOI ESSE AQUI::: ", all[i].age);
            result.push(all[i]);
          }
        }
      }
      //has min age but no max
      else if (min) {
        for (let i = 0; i < all.length; i++) {
          if (all[i].age >= min) {
            result.push(all[i]);
          }
        }
      }
      //has max age but no min age
      else if (max) {
        for (let i = 0; i < all.length; i++) {
          if (all[i].age <= max) {
            result.push(all[i]);
          }
        }
      } else {
        //keep the same
        result = all;
      }
      //#endregion

      //#region sort name ascending and if same name, age descending
      result.sort((a: any, b: any): any => {
        let nameA = a.name.firstName + a.name.lastName;
        let nameB = b.name.firstName + b.name.lastName;
        let ageA = a.age;
        let ageB = b.age;

        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        if (nameA === nameB) {
          if (ageA < ageB) {
            return 1;
          } else {
            return -1;
          }
        }
        return null;
      });
      setUsers(result);
      //#endregion
    } catch (error) {
      console.log(error);
    }
  }

  //main component
  return (
    <div style={{ marginTop: -19.92 }}>
      <h2>Users</h2>
      <FilterBoxStyled>
        <StyledInputBox>
          <span style={{ color: "#dee3e7" }}>Min</span>
          <StyledInpuField
            type="number"
            onChange={(e) => setMinAge(parseInt(e.target.value))}
          />
        </StyledInputBox>
        <StyledInputBox>
          <span style={{ color: "#dee3e7" }}>Max</span>
          <StyledInpuField
            type="number"
            onChange={(e) => setMaxAge(parseInt(e.target.value))}
          />
        </StyledInputBox>
        <StyledButton
          type="button"
          onClick={() => getUsers(minAge, maxAge, name)}
        >
          Retrieve users
        </StyledButton>
      </FilterBoxStyled>
    </div>
  );
};

const FilterBoxStyled = styled.div`
  @media ${device.laptop} {
    height: 200px;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    padding: 40px;
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.03) 0px 6px 24px 0px, #ececec 0px 0px 0px 1px;
  }
  @media ${device.mobileL} {
    display: flex;
    background-color: #fff;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-around;
    margin-left: auto;
    flex-wrap: wrap;
    margin-right: auto;
    padding: 40px;
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.03) 0px 6px 24px 0px, #ececec 0px 0px 0px 1px;
  }
`;

const StyledInputBox = styled.div`
  display: flex;
  flex-grow: 1;
  width: 87%;
  align-items: center;
  height: 50px;
  border: 2px;
  margin-right: 20px;
  border-radius: 10px;
  margin-bottom: 25px;
  border-color: #dee3e7;
  -webkit-appearance: none;
  border-style: solid;
  padding: 0px 10px 0px 20px;
  &:focus {
    outline: none;
  }
  &::placeholder {
    color: #dee3e7;
    font-size: 16px;
    margin-right: 10px;
    position: absolute;
    left: 15px;
    top: 15px;
  }
`;

const StyledInpuField = styled.input`
  border: none;
  padding-top: 0px;
  margin-left: 10px;
  background: transparent;
  margin-right: 10px;
  font-size: 16px;
  flex-grow: 1;
  height: 30px;
  &:focus {
    outline: none;
  }
  &::placeholder {
    color: #dee3e7;
    font-size: 16px;
    margin-right: 10px;
    position: absolute;
    left: 15px;
    top: 15px;
  }
`;

const StyledButton = styled.button`
  background: #52a27e;
  border-style: solid;
  height: 50px;
  padding-left: 20px;
  padding-right: 20px;
  border-radius: 40px;
  border: none;
  color: #fff;

  font-size: 16px;
  width: 50%;
  &:hover {
    background: green;
  }
`;
