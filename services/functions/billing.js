const paystack = require("paystack")(process.env.PAYSTACK_SECRET_KEY);
import handler from "../util/handler";
import { calculateCost } from "../util/cost";

export const main = handler(async (event) => {
  try {
    const { storage, source } = await JSON.parse(event.body);
    const amount = calculateCost(storage);
    const description = "Scratch charge";

    // Load our secret key from the  environment variables

    return await paystack.transaction.initialize({
      amount: amount,
      email: source.email,
      reference: "scratch",

      metadata: {
        storage: storage,
        source: source.id,
        description: description,
      },
      currency: "ZAR",
    });
  } catch (e) {
    return { status: false, message: e.message };
  }
});
