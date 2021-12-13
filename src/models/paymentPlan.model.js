// TODO: create a model class and move common methods
// TODO: then extend this model
class PaymentPlan {
  constructor(data) {
    this.data = data;
    this.dataMap = new Map();
    this.init();
  }

  /*
   * Normalize the data based on Payment Plan ID
   * then create key/value pair for easier access
   */
  init() {
    const data = this.data;
    const dataMap = this.dataMap;
    for (const paymentPlan of data) {
      dataMap.set(paymentPlan.id, paymentPlan);
    }
  }

  get(id) {
    return this.dataMap.get(id);
  }

  set(id, data) {
    this.dataMap.set(id, data);
  }

  getAllPaymentPlanIDs() {
    return [...this.dataMap.keys()];
  }

  getAllPaymentPlans() {
    return [...this.dataMap.values()];
  }
}

export default PaymentPlan;
