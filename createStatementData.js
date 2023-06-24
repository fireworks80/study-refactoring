function createPerformanceCalculator(aPerformance, aPlay) {
  switch (aPlay.type) {
    case 'tragedy':
      return new TragedyCalculator(aPerformance, aPlay);
    case 'comedy':
      return new ComedyCalculator(aPerformance, aPlay);
    default:
      throw new Error(`알 수 없는 장르: ${aPlay.type}`);
  }
}

class PerformanceCalculator {
  constructor(aPerformance, aPlay) {
    this.performance = aPerformance;
    this.play = aPlay;
  }
  get amount() {
    throw new Error('서브클래스에서 처리하도록 설계되었습니다.');
  }
  get volumeCredits() {
    return Math.max(this.performance.audience - 30, 0);
  }
}
// 비극 클래스
class TragedyCalculator extends PerformanceCalculator {
  get amount() {
    let result = 40000;
    if (this.performance.audience > 30) {
      result += 1000 * (this.performance.audience - 30);
    }
    return result;
  }
}

// 희극 클래스
class ComedyCalculator extends PerformanceCalculator {
  get amount() {
    let result = 30000;

    if (this.performance.audience > 20) {
      result += 10000 + 500 * (this.performance.audience - 20);
    }

    result += 300 * this.performance.audience;

    return result;
  } // get
  get volumeCredits() {
    return super.volumeCredits + Math.floor(this.performance.audience / 5);
  }
} // class

export default function createStatementData(invoice, plays) {
  function playFor(aPerformance) {
    return plays[aPerformance.playID];
  }

  function totalAmount(data) {
    return data.performances.reduce((acc, aPerformance) => (acc += aPerformance.amount), 0);
  }

  function totalVolumeCredits(data) {
    return data.performances.reduce((acc, aPerformance) => (acc += aPerformance.volumeCredits), 0);
  }

  const enrichPerformance = (aPerformance) => {
    const { play, amount, volumeCredits } = createPerformanceCalculator(aPerformance, playFor(aPerformance));

    return { ...structuredClone(aPerformance), play, amount, volumeCredits };
  };

  const statementData = {};

  statementData.customer = invoice.customer;
  statementData.performances = invoice.performances.map(enrichPerformance);
  statementData.totalAmount = totalAmount(statementData);
  statementData.totalVolumeCredits = totalVolumeCredits(statementData);

  return statementData;
}
