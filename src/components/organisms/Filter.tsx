import { makeImagePath } from "@/utils";
import { useCallback, useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div``;
const FilterArea = styled.div`
  display: flex;
  align-items: cneter;

  gap: 5px;
  padding: 10px 7px;
`;
const SearchBtn = styled.button<{ active: string }>`
  width: 72px;
  height: 35px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  background-color: ${(props) => props.active === "true" && "#0078ff"};
  color: ${(props) => props.active === "true" && "#ffffff"};

  border: 1px solid #eeeeee;
  border-radius: 18px;

  padding: 7px 15px;
`;
const SeachIcon = styled.img`
  width: 12px;
`;
const FilterBtn = styled.button`
  border: 1px solid #eeeeee;
  border-radius: 18px;

  padding: 7px 15px;
`;
const SearchArea = styled.div`
  position: relative;

  height: 80px;

  background-color: #f9f9f9;
  padding: 20px 15px;
`;
const SearchInput = styled.input`
  width: 100%;
  height: 40px;

  text-indent: 36px;
  border: 1px solid #cccccc;

  &::placeholder {
    font-size: 16px;
    font-weight: 400;
    color: #aaaaaa;
  }
`;
const InputIcon = styled.img`
  position: absolute;
  top: 31px;
  left: 28px;

  width: 16px;
`;
const AutoSearchWrap = styled.div`
  position: absolute;
  bottom: -30px;
  left: 15px;

  width: calc(100% - 30px);

  background-color: #ffffff;
  border: 1px solid red;

  padding: 10px;
`;

const FILTER_OPTION = ["세일상품", "단독상품", "품절포함"];

const Filter = () => {
  const [keyword, setKeyword] = useState<string>("");
  const [isSearchClick, setIsSearchClick] = useState<boolean>(false);

  // NOTE 검색 버튼 클릭
  const onClickSearch = useCallback(() => {
    setIsSearchClick((prev) => !prev);
  }, []);

  return (
    <Wrapper>
      <FilterArea>
        <SearchBtn active={isSearchClick.toString()} onClick={onClickSearch}>
          검색
          <SeachIcon src={makeImagePath("search.svg")} />
        </SearchBtn>
        {FILTER_OPTION.map((item, idx) => (
          <FilterBtn key={idx}>{item}</FilterBtn>
        ))}
      </FilterArea>

      {isSearchClick && (
        <SearchArea>
          <InputIcon src={makeImagePath("search.svg")} />
          <SearchInput
            placeholder="상품명 검색"
            onChange={(e: React.FormEvent<HTMLInputElement>) =>
              setKeyword(e.currentTarget.value)
            }
          />
          {keyword && <AutoSearchWrap>...</AutoSearchWrap>}
        </SearchArea>
      )}
    </Wrapper>
  );
};

export default Filter;
