import { goodsFactory } from "./goods";
import { queryKeys } from "./query-keys";

const goodsAPIs = goodsFactory({
  baseURL: "https://static.msscdn.net/musinsaUI/homework/data",
});

export { goodsAPIs, queryKeys };
