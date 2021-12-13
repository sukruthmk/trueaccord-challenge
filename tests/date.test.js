import { calculateNextPaymentDate } from "../src/helpers/date";

describe("calculateNextPaymentDate", () => {
  test("calculateNextPaymentDate to be defined", () => {
    expect(calculateNextPaymentDate).toBeDefined();
  });

  test("test end > start with weekly interval", () => {
    const start = new Date("2021-12-05");
    const end = new Date("2021-12-12");
    const result = calculateNextPaymentDate(start, end, "WEEKLY");
    expect(result).toEqual("2021-12-19");
  });

  test("test end == start with weekly interval", () => {
    const start = new Date("2021-12-05");
    const end = new Date("2021-12-05");
    const result = calculateNextPaymentDate(start, end, "WEEKLY");
    expect(result).toEqual("2021-12-12");
  });

  test("test end > start with bi-weekly interval", () => {
    const start = new Date("2021-12-05");
    const end = new Date("2021-12-12");
    const result = calculateNextPaymentDate(start, end, "BI_WEEKLY");
    expect(result).toEqual("2021-12-19");
  });

  test("test end == start with bi-weekly interval", () => {
    const start = new Date("2021-12-05");
    const end = new Date("2021-12-05");
    const result = calculateNextPaymentDate(start, end, "BI_WEEKLY");
    expect(result).toEqual("2021-12-19");
  });
});
