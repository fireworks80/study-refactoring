import { Producer } from './Producer.js';

export class Province {
  constructor(doc) {
    this._name = doc.name;
    this._producers = [];
    this._totalProduction = 0;
    this._demand = doc.demand; // 30
    this._price = doc.price; // 20
    doc.producers.forEach((d) => this.addProducer(new Producer(this, d)));
  }

  addProducer(arg) {
    this._producers.push(arg);
    this._totalProduction += arg.production;
  }

  get name() {
    return this._name;
  }

  get producers() {
    return this._producers.slice();
  }

  get totalProduction() {
    return this._totalProduction;
  }

  set totalProduction(arg) {
    this._totalProduction = arg;
  }

  get demand() {
    return this._demand;
  }

  set demand(arg) {
    this._demand = parseInt(arg);
  }

  get price() {
    return this._price;
  }

  set price(arg) {
    this._price = parseInt(arg);
  }

  // 생산 부족분
  get shortfall() {
    return this._demand - this.totalProduction;
  }

  // 수익
  get profit() {
    return this.demandValue - this.price;
  }

  get demandValue() {
    // 수요
    return this.satisfiedDemand * this.price;
  }

  // 수요 충족
  get satisfiedDemand() {
    return Math.min(this._demand, this.totalProduction);
  }

  // 비용
  get demandCost() {
    let remainingDemand = this.demand;
    let result = 0;
    this.producers
      .sort((a, b) => a.cost - b.cost)
      .forEach((p) => {
        const contribution = Math.min(remainingDemand, p.production);
        remainingDemand -= contribution;
        result += contribution * p.cost;
      });
    return result;
  }
}
