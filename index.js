import { readJSON } from './fileController.js';
import { plainTextStatement, htmlStatement } from './statement.js';

const invoices = readJSON('invoices.json');
const plays = readJSON('plays.json');

invoices.forEach((invoice) => {
  // console.log(plainTextStatement(invoice, plays));
  // console.log(htmlStatement(invoice, plays));
});
