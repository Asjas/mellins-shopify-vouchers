import { gql, rawRequest } from "graphql-request";
import wait from "waait";

export const CREATE_DISCOUNT_CODE = gql`
  mutation CREATE_DISCOUNT_CODE($basicCodeDiscount: DiscountCodeBasicInput!) {
    discountCodeBasicCreate(basicCodeDiscount: $basicCodeDiscount) {
      codeDiscountNode {
        id
        codeDiscount {
          __typename
        }
      }
      userErrors {
        code
        field
        message
        extraInfo
      }
    }
  }
`;

export async function createDiscountCode(opts: any, VOUCHER_CODE: any) {
  const rateLimitThreshold = 200;
  let availableRateLimit = 1000;
  const endpoint = "http://127.0.0.1:3000/graphql";
  const { START_DATE, END_DATE, PRODUCT_TO_DISCOUNT, DISCOUNT_PERCENTAGE } = opts;

  console.log(`💄 Creating voucher - ${VOUCHER_CODE}`);

  const MUTATION_VARIABLES = {
    basicCodeDiscount: {
      title: VOUCHER_CODE,
      code: VOUCHER_CODE,
      usageLimit: 1,
      startsAt: START_DATE,
      endsAt: END_DATE,
      customerSelection: {
        all: true,
      },
      customerGets: {
        items: {
          products: {
            productsToAdd: PRODUCT_TO_DISCOUNT,
          },
        },
        value: {
          percentage: DISCOUNT_PERCENTAGE,
        },
      },
    },
  };

  if (availableRateLimit < rateLimitThreshold) {
    console.warn(`🚨 Not enough rate limit points (${availableRateLimit} pts) - waiting 1 second!`);
    await wait(2000);
  }

  try {
    const { data, extensions } = await rawRequest(endpoint, CREATE_DISCOUNT_CODE, MUTATION_VARIABLES);

    availableRateLimit = extensions.cost.throttleStatus.currentlyAvailable;

    if (data.discountCodeBasicCreate.userErrors.length > 0) {
      data.discountCodeBasicCreate.userErrors.map((err: any) => console.error(err));
    }
  } catch (err) {
    console.error(err);
  }
}
