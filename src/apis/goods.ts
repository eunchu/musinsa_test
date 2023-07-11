import axios from "axios";

import { IFactory } from "@/apis/interfaces/factory";
import { IGoodsApiRes } from "./interfaces/goods";

export const goodsFactory = ({ baseURL }: IFactory) => {
  // NOTE 상품 리스트1
  const getGoods = async (urlCode: string) =>
    (await axios.get(`${baseURL}/${urlCode}.json`)).data as IGoodsApiRes;

  return { getGoods };
};
