import styled from "styled-components";

import { makeImagePath } from "@/utils";

const HeaderWrap = styled.header`
  height: 50px;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: #ffffff;
`;

const Header = () => {
  return (
    <HeaderWrap>
      <img src={makeImagePath("logo_musinsa.png")} alt="로고" />
    </HeaderWrap>
  );
};

export default Header;
