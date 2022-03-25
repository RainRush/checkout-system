import inquirer from 'inquirer';
import checkoutSystem from './checkoutSystem';
import { ATV, IPD, MBP, VGA } from './constants';

const itemsList: string[] = [];

const YES_ENUM = 'Yes';
const NO_ENUM = 'No';

const runItemListInquirer = () => {
  inquirer
    .prompt([
      {
        name: 'item',
        type: 'list',
        message: 'Scan an item:',
        choices: [IPD, MBP, ATV, VGA, 'No More'],
      },
      {
        name: 'nextItem',
        type: 'list',
        message: 'Do you have another item to scan?',
        choices: [YES_ENUM, NO_ENUM],
      },
    ])
    .then((answer) => {
      itemsList.push(answer.item);

      if (answer.nextItem === YES_ENUM) {
        runItemListInquirer();
        return;
      }
      checkoutSystem(itemsList);
    });
};

runItemListInquirer();
