import createStatementData from './createStatementData.js';

const usd = (aNumber) =>
  new Intl.NumberFormat('es-US', { style: 'currency', currency: 'USD', minimumFractionsDigits: 2 }).format(
    aNumber / 100
  );

function renderPlainText(data) {
  let result = `청구 내역(고객명: ${data.customer})\n`;
  for (let perf of data.performances) {
    // 청구 내역 출력
    result += `${perf.play.type}: ${usd(perf.amount)}(${perf.audience}석)\n`;
  } // for

  result += `총액: ${usd(data.totalAmount)}\n`;
  result += `적립 포인트: ${data.totalVolumeCredits}점\n`;

  return result;
}

function renderHtml(data) {
  let result = `
    <h1>청구 내역 (고객명: ${data.customer})</h1>
    <table>
    <tr>
      <th>연극</th>
      <th>좌석 수</th>
      <th>금액</th>
    </tr>`;

  for (let perf of data.performances) {
    result += `<tr>
      <td>${perf.play.name}</td>
      <td>${perf.audience}석</td>
      <td>${perf.amount}</td>
    </tr>`;
  }
  result += `</table>
  <p>총액: <em>${usd(data.totalAmount)}</em></p>
  <p>적립 포인트: <em>${data.totalVolumeCredits}</em></p>
  `;
  return result;
}

export function htmlStatement(invoice, plays) {
  return renderHtml(createStatementData(invoice, plays));
}

export function plainTextStatement(invoice, plays) {
  return renderPlainText(createStatementData(invoice, plays));
}
