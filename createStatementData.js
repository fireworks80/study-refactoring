class PerformanceCalculator {
  constructor(aPerformance, aPlay) {
    this.performance = aPerformance;
    this.play = aPlay;
  }
  get amount() {
    let result = 0;

    switch (this.play.type) {
      case 'tragedy': // 비극
        result = 40000;
        if (this.performance.audience > 30) {
          result += 1000 * (this.performance.audience - 30);
        }
        break;

      case 'comedy': //희극
        result = 30000;
        if (this.performance.audience > 20) {
          result += 10000 + 500 * (this.performance.audience - 20);
        }
        result += 300 * this.performance.audience;
        break;

      default:
        throw new Error(`알 수 없는 장르: ${this.play.type}`);
    } // switch

    return result;
  }
  get volumeCredit() {
    let result = 0;
    // 포인트를 적립한다.
    result += Math.max(this.performance.audience - 30, 0);

    // 희극 관객 5명마다 추가 포인트를 제공한다.
    if ('comedy' === this.play.type) result += Math.floor(this.performance.audience / 5);

    return result;
  }
}

export default function createStatementData(invoice, plays) {
  function playFor(aPerformance) {
    return plays[aPerformance.playID];
  }

  function totalAmount(data) {
    return data.performances.reduce((acc, aPerformance) => (acc += aPerformance.amount), 0);
  }

  function totalVolumeCredits(data) {
    return data.performances.reduce((acc, aPerformance) => (acc += aPerformance.volumeCredit), 0);
  }

  const enrichPerformance = (aPerformance) => {
    const { play, amount, volumeCredit } = new PerformanceCalculator(aPerformance, playFor(aPerformance));

    return { ...structuredClone(aPerformance), play, amount, volumeCredit };
  };

  const statementData = {};

  statementData.customer = invoice.customer;
  statementData.performances = invoice.performances.map(enrichPerformance);
  statementData.totalAmount = totalAmount(statementData);
  statementData.totalVolumeCredits = totalVolumeCredits(statementData);

  return statementData;
}
