////////////////////////////////////////////////////////////

/* GELD SHEET VAN <NAME_HERE> */

////////////////////////////////////////////////////////////

const amountPeople = 400;
const price = 5;
const length = 6;

////////////////////////////////////////////////////////////

const cleaning = 100;
const barcrew = 100;
const djset = 200;

const ticketmargin = amountPeople * price;

const theme = 300;

const costs = cleaning * length + barcrew + djset + theme;
const profit = amountPeople * price - costs;

////////////////////////////////////////////////////////////

const outputString = `
Amount people: ${amountPeople}
-----
Price per ticket: ${price}
-----
Amount from tickets: ${ticketmargin}
-----
Costs: ${costs}
-----
Profit: ${profit}
`;

////////////////////////////////////////////////////////////

console.log(outputString);
