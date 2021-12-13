// TODO: create a model class and move common methods
// TODO: then extend this model
class Payment {
  constructor(data) {
    this.data = data;
    this.dataMap = new Map();
    this.init();
  }

  /*
   * Normalize the data based on Payment ID
   * then create key/value pair for easier access
   */
  init() {
    const data = this.data;
    const dataMap = this.dataMap;
    for (let i = 0; i < data.length; i++) {
      dataMap.set(i, data[i]);
    }
  }

  get(id) {
    return this.dataMap.get(id);
  }

  set(id, data) {
    this.dataMap.set(id, data);
  }

  getAllPaymentIDs() {
    return [...this.dataMap.keys()];
  }

  getAllPayments() {
    return [...this.dataMap.values()];
  }
}

export default Payment;
