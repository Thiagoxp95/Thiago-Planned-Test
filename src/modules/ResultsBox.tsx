import React, { useContext } from "react";
import styled from "styled-components";
import { SearchContext } from "../context/SearchContext";
import { device } from "../styles/Global";

//#region individual components
const SearchBox: React.FC<any> = () => {
  const { setName } = useContext(SearchContext);

  return (
    <TopSearchBox>
      <img alt="Search by name" width={20} height={20} src="loupe.png" />
      <StyledInputSearch
        placeholder="Search Users"
        onChange={(e) => setName(e.target.value)}
      />
    </TopSearchBox>
  );
};

const Divider: React.FC = () => {
  return (
    <div
      style={{
        borderTop: "1px solid #F4F6F8",
        width: "100%",
        marginBottom: "10px",
        height: 10,
      }}
    />
  );
};

const TableHeader: React.FC = () => {
  return (
    <TableHeaderBox>
      <InvisibleButton
        onClick={() => {
          //handle reverse of users
        }}
      >
        <span>Name&nbsp;&nbsp;</span>
        <img alt="Sort by order" width={10} height={10} src="sort-arrows.svg" />
      </InvisibleButton>
      <InvisibleButton
        onClick={() => {
          //sort by age and reverse
        }}
        style={{ marginLeft: "50%" }}
      >
        <span>Age&nbsp;&nbsp;</span>
        <img alt="Sort by order" width={10} height={10} src="sort-arrows.svg" />
      </InvisibleButton>
    </TableHeaderBox>
  );
};

const ResultsTable: React.FC = () => {
  const { users, name } = useContext(SearchContext);

  if (users && name && name !== "") {
    let filterByName = users.filter((element: any) => {
      if (
        (element.name.firstName + element.name.lastName)
          .toUpperCase()
          .includes(name.toUpperCase())
      ) {
        return true;
      }
      return null;
    });
    return filterByName.map((element: any, index: number) => {
      return (
        <div
          style={{
            width: "100%",
          }}
          key={index}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flex: 1,
              borderTop: "1px solid #ebebeb",
              // background: "yellow",
              paddingLeft: 60,
              height: 50,
            }}
          >
            <input
              style={{ marginRight: 25, marginLeft: -25 }}
              type="checkbox"
              // value={props.data.firstName}
              name="First Name"
            />{" "}
            <div style={{ flex: 1 }}>
              {element.name.firstName} {element.name.lastName}
            </div>
            <div style={{ flex: 1 }}>
              <span style={{ marginLeft: "65px" }}>{element.age}</span>
            </div>
          </div>
        </div>
      );
    });
  } else {
    if (users) {
      return users.map((element: any, index: number) => {
        return (
          <div
            style={{
              width: "100%",
            }}
            key={index}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                flex: 1,
                borderTop: "1px solid #ebebeb",
                paddingLeft: 60,
                height: 50,
              }}
            >
              <input
                style={{ marginRight: 25, marginLeft: -25 }}
                type="checkbox"
                // value={props.data.firstName}
                name="First Name"
              />{" "}
              <div style={{ flex: 1 }}>
                {element.name.firstName} {element.name.lastName}
              </div>
              <div style={{ flex: 1 }}>
                <span style={{ marginLeft: "65px" }}>{element.age}</span>
              </div>
            </div>
          </div>
        );
      });
    }
  }

  return null;
};

//#endregion

export const ResultsBox: React.FC = () => {
  const { users } = useContext(SearchContext);
  return (
    <ResultsBoxStyled>
      <SearchBox users={users} />
      <Divider />
      {users && <TableHeader />}
      <ResultsTable />
    </ResultsBoxStyled>
  );
};

const ResultsBoxStyled = styled.div`
  @media ${device.laptop} {
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    align-items: center;
    width: 600px;
    min-width: 350px;
    height: 500px;
    margin-left: 50px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.03) 0px 6px 24px 0px, #ececec 0px 0px 0px 1px;
    overflow: scroll;
    &::-webkit-scrollbar {
      display: none;
    }
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  @media ${device.mobileS} {
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 500px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.03) 0px 6px 24px 0px, #ececec 0px 0px 0px 1px;
    overflow: scroll;
    &::-webkit-scrollbar {
      display: none;
    }
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  @media ${device.mobileS} {
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    align-items: center;
    height: 500px;
    background-color: #fff;
    border-radius: 10px;
    margin-top: 50px;
    box-shadow: rgba(0, 0, 0, 0.03) 0px 6px 24px 0px, #ececec 0px 0px 0px 1px;
    overflow: scroll;
    &::-webkit-scrollbar {
      display: none;
    }
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`;

const TopSearchBox = styled.div`
  width: 85%;
  display: flex;
  align-items: center;
  margin-top: 20px;
  height: 40px;
  border: 2px;
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

const StyledInputSearch = styled.input`
  border: none;
  width: 100%;
  height: auto;
  min-height: 38px;
  font-size: 16px;
  padding-left: 10px;
  &::placeholder {
    color: #dee3e7;
  }
  &:focus {
    outline: none;
  }
`;

const TableHeaderBox = styled.div`
  width: 78%;
  display: flex;
  align-items: center;
`;

const InvisibleButton = styled.button`
  background: none;
  border: none;
  display: flex;
  align-items: center;
  padding: 10px;
  height: 20px;
  margin-bottom: 20px;
  font-size: 16px;
  font-weight: bold;
  border-radius: 20px;
  &:hover {
    background: #ebebeb;
  }
`;
