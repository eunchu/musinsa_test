import styled from "styled-components";

import { IGoods } from "@/apis/interfaces/goods";

const Wrapper = styled.div`
  width: 50%;
  height: 366px;
`;
const ItemImg = styled.div<{ imageurl: string; issoldout: string }>`
  width: 100%;
  height: 226px;

  background-image: url(${(props) => props.imageurl}),
    url("https://image.msscdn.net/musinsaUI/homework/data/img.jpg");
  background-size: cover;
  background-position: center center;

  opacity: ${(props) => props.issoldout === "true" && 0.2};
`;
const SoldOutText = styled.span`
  position: absolute;
  top: -113px;
  left: calc(50% - 44px);

  color: #777777;
  font-size: 20px;
  font-weight: 500;
`;
const DescArea = styled.div`
  position: relative;

  padding: 20px 10px;
`;
const ExclusiveItem = styled.span`
  position: absolute;
  top: -13px;
  left: 10px;

  width: 33px;
  height: 26px;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 12px;
  font-weight: 400;
  background-color: #18a286;
  color: #ffffff;
`;
const BrandName = styled.h2`
  font-size: 11px;
  font-weight: 400;

  margin-bottom: 8px;
`;
const ItemName = styled.p`
  min-height: 36px;

  font-weight: 700;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;

  margin-bottom: 4px;
`;
const PriceArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  font-size: 16px;
  line-height: 24px;
`;
const Price = styled.p``;
const SaleRate = styled.p`
  color: #ff0000;
`;
const OriginalPrice = styled.p`
  font-size: 11px;
  text-decoration: line-through;
  color: #aaaaaa;

  margin-top: -6px;
`;

interface ICard {
  item: IGoods;
}
const Card = ({ item }: ICard) => {
  return (
    <Wrapper>
      <ItemImg imageurl={item.imageUrl} issoldout={item.isSoldOut.toString()} />
      <DescArea>
        {item.isSoldOut && <SoldOutText>SOLD OUT</SoldOutText>}
        {item.isExclusive && <ExclusiveItem>단독</ExclusiveItem>}
        <BrandName>{item.brandName}</BrandName>
        <ItemName title={item.goodsName}>{item.goodsName}</ItemName>
        <PriceArea>
          <Price>{item.price.toLocaleString("ko-KR")}원</Price>
          {item.isSale && <SaleRate>{item.saleRate}%</SaleRate>}
        </PriceArea>
        {item.isSale && (
          <OriginalPrice>
            {item.normalPrice.toLocaleString("ko-KR")}원
          </OriginalPrice>
        )}
      </DescArea>
    </Wrapper>
  );
};

export default Card;
