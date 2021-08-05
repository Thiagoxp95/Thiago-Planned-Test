import { createGlobalStyle } from "styled-components";
import * as HellixBlack from "../fonts/Hellix-Medium.ttf";

//#region Media Queries
const size = {
  mobileS: "320px",
  mobileM: "375px",
  mobileL: "425px",
  tablet: "768px",
  laptop: "1024px",
  laptopL: "1440px",
  desktop: "2560px",
};
export const device = {
  mobileS: `(min-width: ${size.mobileS})`,
  mobileM: `(min-width: ${size.mobileM})`,
  mobileL: `(min-width: ${size.mobileL})`,
  tablet: `(min-width: ${size.tablet})`,
  laptop: `(min-width: ${size.laptop})`,
  laptopL: `(min-width: ${size.laptopL})`,
  desktop: `(min-width: ${size.desktop})`,
  desktopL: `(min-width: ${size.desktop})`,
};
//#endregion

const GlobalStyle = createGlobalStyle`
    @font-face {
        font-family: 'HellixBlack';
        src: url(${HellixBlack}) format('truetype');

    }
    body{
        margin:0;
        padding-left;
        background: #F4F6F8;
        font-family: 'HellixBlack';
        @media ${device.desktop} {
          padding-left: 100px;
          padding-right: 400px;
        }
        @media ${device.laptop} {
          padding-left: -300px;

        }
        
    }

`;

export default GlobalStyle;
