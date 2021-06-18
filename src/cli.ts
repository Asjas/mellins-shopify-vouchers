import { createDiscountCode } from "./discount";

async function main() {
  const VOUCHER_COUNT = 200;
  const opts = {
    PRODUCT_TO_DISCOUNT: "gid://shopify/Product/4477044195400",
    DISCOUNT_PERCENTAGE: 1, // specify value 0 to 1 (decimal)
    START_DATE: "2021-06-01T00:00:00Z",
    END_DATE: null, // `null` means that there is no end date
  };

  for (let x = 1; x <= VOUCHER_COUNT; x++) {
    const VOUCHER_CODE = `ZEISS${String(x).padStart(4, "0")}`;
    await createDiscountCode(opts, VOUCHER_CODE);
  }
}

try {
  void main();
} catch (err) {
  console.error(err);
}
