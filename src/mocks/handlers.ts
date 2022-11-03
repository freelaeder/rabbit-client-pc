import { rest } from "msw";
import { faker } from "@faker-js/faker";
import XtxRequestManager from "@/utils/XtxRequestManager";
// 定义请求拦截程序
export const handles = [
  rest.get("/test", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({ test: "freelaeder hello ", address: faker.date.birthdate() })
    );
  }),
  // 我的收藏
  rest.get(`${XtxRequestManager.baseUrl}member/collect`, (req, res, ctx) => {
    return res(
      ctx.json({
        msg: "成功",
        result: {
          counts: 50,
          page: req.url.searchParams.get("page"),
          pageSize: req.url.searchParams.get("pageSize"),
          pages: 0,
          items: makeArray(10, () => ({
            id: faker.datatype.uuid(),
            name: faker.internet.userName(),
            desc: faker.commerce.productDescription(),
            price: faker.commerce.price(),
            picture: `http://zhoushugang.gitee.io/erabbit-client-pc-static/uploads/clothes_goods_${faker.datatype.number(
              { min: 1, max: 8 }
            )}.jpg`,
          })),
        },
      })
    );
  }),
];
function makeArray(length: number, generator) {
  return Array.from({ length }, generator);
}
