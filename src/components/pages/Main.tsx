import { useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";

import { goodsAPIs, queryKeys } from "@/apis";
import { IGoods } from "@/apis/interfaces/goods";
import Card from "@/components/organisms/Card";
import { makeImagePath } from "@/utils";

const MainWrap = styled.main`
  height: 0;

  display: flex;
  flex-direction: column;
  flex-grow: 1;

  background-color: #ffffff;
`;
const FilterArea = styled.div`
  display: flex;
  align-items: cneter;

  gap: 5px;
  padding: 10px 7px;
`;
const SearchBtn = styled.button<{ state: string }>`
  width: 72px;
  height: 35px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  background-color: ${(props) => props.state === "click" && "#0078ff"};
  color: ${(props) =>
    props.state === "click"
      ? "#ffffff"
      : props.state === "active"
      ? "#0078FF"
      : "#111111"};

  border: 1px solid #eeeeee;
  border-radius: 18px;

  padding: 7px 15px;
`;
const SeachIcon = styled.img`
  width: 12px;
`;
const FilterBtn = styled.button<{ active: string }>`
  border: 1px solid #eeeeee;
  border-radius: 18px;
  color: ${(props) => props.active === "true" && "#0078FF"};

  padding: 7px 15px;
`;
const FinishedWrap = styled.div`
  height: 50px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 12px 15px;
`;
const FilteredItems = styled.ul`
  display: flex;
  align-items: center;
  gap: 5px;

  width: 100%;
`;
const FilterdItem = styled.li`
  font-size: 12px;
  font-weight: 400;

  display: flex;
  align-items: center;
  justify-content: space-between;

  background-color: #0078ff;
  color: #ffffff;
  border-radius: 4px;

  padding: 4px 8px;
`;
const DeleteBtn = styled.span`
  width: 14px;

  display: flex;
  align-items: center;
  justify-content: center;

  margin-left: 4px;
  cursor: pointer;
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
const Line = styled.div`
  height: 10px;
  width: 100%;

  background-color: #f1f1f1;
`;
const ItemListArea = styled.main`
  height: 0;

  display: flex;
  flex-wrap: wrap;
  flex-grow: 1;

  overflow: auto;
`;
const LoadingArea = styled.div`
  width: 100%;
  height: 40px;

  display: flex;
  align-items: center;
  justify-content: center;
`;
const EmptyArea = styled.div`
  text-align: center;
  margin: auto;
`;
const EmptyText = styled.div`
  color: #aaaaaa;
  font-weight: 400;
  margin-top: 4px;
`;

const FILTER_OPTION = ["세일상품", "단독상품", "품절포함"];

const Main = () => {
  // 무한스크롤 기능을 위한 타겟
  const pageEndRef = useRef(null);

  /*
    {originalItems} : 무한스크롤 기능으로 호출된 목록을 보관합니다.
    {itemsByKey} : 검색 및 필터 적용 후 출력될 목록을 보관합니다.
    {page} : page를 1씩 증가시켜 다음 api를 호출하는데 이용합니다.
    {isStopLoadMore} : 검색 및 필터 적용 상태일 때 무한스크롤 기능을 중단합니다.
    {isLoading} : 로딩이 완료 되었을 때만 다음 api를 호출합니다.
    {keyword} : 검색어 입력값 관리
    {keywords} : 모든 검색어 입력값 관리
    {isSearchClick} : 상단 검색버튼 스타일변경에 사용됩니다.
    {isFinished} : 상단 검색버튼 스타일변경에 사용됩니다.
    {finishList} : 검색어, 필터의 활성화 목록을 관리합니다.
  */
  const [originalItems, setOriginalItems] = useState<Map<number, IGoods>>(
    new Map()
  );
  const [itemsByKey, setItemsByKey] = useState<IGoods[]>([]);
  const [page, setPage] = useState<number>(0);
  const [isStopLoadMore, setIsStopLoadMore] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [keyword, setKeyword] = useState<string>("");
  const [keywords, setKeywords] = useState<Set<string>>(new Set());
  const [isSearchClick, setIsSearchClick] = useState<boolean>(false);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [finishList, setFinishList] = useState<Set<string>>(new Set());

  // NOTE 데이터 호출
  const fetch = () => goodsAPIs.getGoods(`goods${page}`);
  useQuery(queryKeys.carKeyByType(["[GET]goods", `${page}`]), () => fetch(), {
    onSuccess: (data) => {
      const init = new Map(originalItems);
      data.data.list.map((item) => init.set(item.goodsNo, item));
      setOriginalItems(init);
      setIsLoading(true);
    },
    enabled: page <= 3 && !isStopLoadMore,
  });
  // 품절된 아이템을 제외한 목록 저장
  useEffect(() => {
    const initData: IGoods[] = [];

    [...originalItems.values()].map((item) =>
      finishList.has("품절포함")
        ? initData.push(item)
        : !item.isSoldOut && initData.push(item)
    );
    setItemsByKey(initData);
  }, [finishList, originalItems]);

  // NOTE 타겟(로딩)에 도달 시, loadMore함수를 실행하여 페이지 수를 증가시키고 다음 api를 호출합니다.
  useEffect(() => {
    if (isLoading) {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && !isStopLoadMore) {
            setPage((prev) => prev + 1);
          }
        },
        { threshold: 1 }
      );

      pageEndRef.current && observer.observe(pageEndRef.current);
    }
  }, [isLoading, isStopLoadMore]);

  // NOTE 키 입력 후, 1초 후에 적용
  useEffect(() => {
    const debounce = setTimeout(() => {
      if (keyword) {
        setFinishList((prev) => {
          prev = new Set(prev);
          prev.add(keyword);
          return prev;
        });
        setKeywords((prev) => {
          prev = new Set(prev);
          prev.add(keyword);
          return prev;
        });
        setIsFinished(true);
        setIsSearchClick(false);
        setIsStopLoadMore(true);
      }
    }, 1000);

    return () => clearTimeout(debounce);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyword]);

  // NOTE 필터/검색어 삭제
  const onClickDeleteFilter = (value: string) => {
    if (!FILTER_OPTION.includes(value)) {
      setKeyword("");
      setKeywords((prev) => {
        prev = new Set(prev);
        prev.delete(value);
        return prev;
      });
      setIsFinished(false);
    }
    setFinishList((prev) => {
      prev = new Set(prev);
      prev.delete(value);
      return prev;
    });
  };

  // NOTE 필터 클릭 시 토글
  const onClickFilter = (item: string) => {
    setFinishList((prev) => {
      prev = new Set(prev);
      prev.has(item) ? prev.delete(item) : prev.add(item);
      return prev;
    });
  };

  // NOTE 검색 및 필터 활성화 상태일 떈 추가로 호출하지 않음
  useEffect(() => {
    if (finishList.size) setIsStopLoadMore(true);
    else setIsStopLoadMore(false);
  }, [finishList]);

  // NOTE 검색어/필터항목 필터 적용
  useEffect(() => {
    const updateList: Map<number, IGoods> = new Map();

    if (finishList.size) {
      [...originalItems.values()].filter((item) => {
        if (finishList.has("품절포함")) {
          updateList.set(item.goodsNo, item);
        }
        if (!finishList.has("품절포함")) {
          !item.isSoldOut && updateList.set(item.goodsNo, item);
        }
        if (keywords.size) {
          [...keywords.keys()].map((key) => {
            item.goodsName.includes(key) === false &&
              updateList.delete(item.goodsNo);
          });
        }
        if (finishList.has("세일상품")) {
          !item.isSale && updateList.delete(item.goodsNo);
        }
        if (finishList.has("단독상품")) {
          !item.isExclusive && updateList.delete(item.goodsNo);
        }
      });
      setItemsByKey([...updateList.values()]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [finishList, originalItems, keywords]);

  return (
    <MainWrap>
      <FilterArea>
        <SearchBtn
          state={
            keyword && isFinished ? "active" : isSearchClick ? "click" : "init"
          }
          onClick={() => setIsSearchClick(!isSearchClick)}
        >
          검색
          <SeachIcon src={makeImagePath("search.svg")} />
        </SearchBtn>
        {FILTER_OPTION.map((item, idx) => (
          <FilterBtn
            key={idx}
            onClick={() => onClickFilter(item)}
            active={[...finishList.keys()].includes(item) ? "true" : "false"}
          >
            {item}
          </FilterBtn>
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
        </SearchArea>
      )}
      {finishList.size ? (
        <FinishedWrap>
          <FilteredItems>
            {[...finishList.keys()].map((text) => (
              <FilterdItem key={text}>
                <div>{text}</div>
                <DeleteBtn onClick={() => onClickDeleteFilter(text)}>
                  x
                </DeleteBtn>
              </FilterdItem>
            ))}
          </FilteredItems>
        </FinishedWrap>
      ) : null}
      <Line />
      <ItemListArea>
        {itemsByKey.length ? (
          <>
            {itemsByKey?.map((item) => (
              <Card key={item.goodsNo} item={item} />
            ))}
          </>
        ) : (
          <EmptyArea>
            <img src={makeImagePath("empty.png")} />
            <EmptyText>검색 결과 없음</EmptyText>
          </EmptyArea>
        )}
        {page <= 3 && !isStopLoadMore ? (
          <LoadingArea ref={pageEndRef}>
            <img src={makeImagePath("common_loading_spinner.png")} />
          </LoadingArea>
        ) : null}
      </ItemListArea>
    </MainWrap>
  );
};

export default Main;
