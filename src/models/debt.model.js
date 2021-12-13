// TODO: create a model class and move common methods
// TODO: then extend this model
class Debt {
  constructor(data) {
    this.data = data;
    this.dataMap = new Map();
    this.init();
  }

  /*
   * Normalize the data based on Debt ID
   * then create key/value pair for easier access
   */
  init() {
    const data = this.data;
    const dataMap = this.dataMap;
    for (const debt of data) {
      dataMap.set(debt.id, debt);
    }
  }

  get(id) {
    return this.dataMap.get(id);
  }

  set(id, data) {
    this.dataMap.set(id, data);
  }

  getAllDebtIDs() {
    return [...this.dataMap.keys()];
  }

  getAllDebts() {
    return [...this.dataMap.values()];
  }
}

export default Debt;
