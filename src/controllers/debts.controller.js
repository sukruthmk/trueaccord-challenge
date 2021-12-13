import jsonlines from "jsonlines";

import debtService from "../services/debt.service";
import paymentPlanService from "../services/paymentPlan.service";
import paymentsService from "../services/payment.service";
import debtModel from "../models/debt.model";
import paymentPlanModel from "../models/paymentPlan.model";
import paymentModel from "../models/payment.model";
import { calculateNextPaymentDate } from "../helpers/date";

const getAllDebts = async (req, res) => {
  const debts = await debtService.getDebtsFromAPI();
  const paymentPlans = await paymentPlanService.getPaymentPlansFromAPI();
  const payments = await paymentsService.getPaymentsFromAPI();

  // TODO: refactor this logic from controller to helpers
  // generate object models by normalizing the data for easier access
  // i.e using key/value pair
  const debtsObject = new debtModel(debts);
  const paymentPlanObject = new paymentPlanModel(paymentPlans);
  const paymentObject = new paymentModel(payments);

  // calculate amount_payed and last_payment_date from payments for a payment plan
  calculatePaymentsMade(paymentPlanObject, paymentObject);
  // using those field now calculate debt remaining (remaining_amount)
  // and next_payment_due_date
  calculateDebts(paymentPlanObject, debtsObject);

  // show the result in jsonlines
  processOutput(debtsObject);

  res.send(debtsObject.getAllDebts());
};

// calculate payments received for a payment plan
const calculatePaymentsMade = (paymentPlanObject, paymentObject) => {
  const paymentIDs = paymentObject.getAllPaymentIDs();
  for (const id of paymentIDs) {
    const payment = paymentObject.get(id);
    const paymentPlanID = payment.payment_plan_id;
    const paymentPlan = paymentPlanObject.get(paymentPlanID);
    const amount_payed = paymentPlan?.amount_payed || 0;
    const last_payment_date = paymentPlan?.last_payment_date || null;
    paymentPlan.amount_payed = amount_payed + payment.amount;
    paymentPlan.last_payment_date = new Date(
      Math.max(last_payment_date, new Date(payment.date))
    );
    paymentPlanObject.set(paymentPlanID, paymentPlan);
  }
};

const calculateDebts = (paymentPlanObject, debtsObject) => {
  const paymentPlanIDs = paymentPlanObject.getAllPaymentPlanIDs();
  for (const id of paymentPlanIDs) {
    const paymentPlan = paymentPlanObject.get(id);
    const debtID = paymentPlan.debt_id;
    const debt = debtsObject.get(debtID);
    const amountPayed = paymentPlan?.amount_payed || 0;
    const lastPaymentDate = paymentPlan?.last_payment_date;
    const paymentPlanAmountPending = paymentPlan.amount_to_pay - amountPayed;
    let amountRemaining = 0;
    // if negative then the user has over payed the payment plan and it can considered to reduce the overall debt
    if (paymentPlanAmountPending < 0) {
      amountRemaining = debt.amount + paymentPlanAmountPending;
    } else {
      // the user has still some money left in payment plan so we need to minus that from the total
      amountRemaining = debt.amount - paymentPlan.amount_to_pay;
    }
    const isInPaymentPlan = paymentPlanAmountPending > 0;

    debt.remaining_amount = amountRemaining;
    debt.is_in_payment_plan = isInPaymentPlan;
    debt.next_payment_due_date = isInPaymentPlan
      ? calculateNextPaymentDate(
          new Date(paymentPlan.start_date),
          lastPaymentDate,
          paymentPlan.installment_frequency
        )
      : null;

    debtsObject.set(debtID, debt);
  }
};

const processOutput = (debtsObject) => {
  const output = jsonlines.stringify();
  output.pipe(process.stdout);

  const debts = debtsObject.getAllDebts();
  for (const debt of debts) {
    // formatting the data if a debt doesn't have payment plan
    const amount =
      debt?.remaining_amount != null ? debt.remaining_amount : debt.amount;
    // handle floating point issue with javascript
    debt.remaining_amount = Number.parseFloat(amount).toFixed(2);
    debt.is_in_payment_plan = debt?.is_in_payment_plan || false;
    debt.next_payment_due_date = debt?.next_payment_due_date || null;

    output.write(debt);
  }

  output.end();
};

export default {
  getAllDebts,
};
