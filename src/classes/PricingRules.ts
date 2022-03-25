import { IItem } from './Item';
import { IRuleModule } from './RuleModules';

interface IPricingRules {
  addRule(ruleModule: IRuleModule): void;
  printRules(): void;
  applyRules(currentPrice: number, cartItems: IItem[]): number;
  resetRules(): void;
  undoRule(): void;
}

class PricingRules implements IPricingRules {
  ruleModuleList: IRuleModule[] = [];

  baseRules: IRuleModule[];

  constructor(baseRules: IRuleModule[] = []) {
    this.baseRules = baseRules;
    this.ruleModuleList = baseRules;
  }

  addRule(ruleModule: IRuleModule): void {
    this.ruleModuleList.push(ruleModule);
  }

  printRules(): void {
    if (this.ruleModuleList.length === 0) {
      console.log('No rules applied');
    }

    const ruleNameArray = this.ruleModuleList.map((ruleModule: IRuleModule) =>
      ruleModule.getName()
    );
    console.log(`Pricing Rules: ${ruleNameArray.join(', ')}`);
  }

  applyRules(currentPrice: number, cartItems: IItem[]): number {
    const updatedPrice = this.ruleModuleList.reduce(
      (totalPrice, ruleModule) =>
        ruleModule.applyRuleAndGetUpdatedPrice(totalPrice, cartItems),
      currentPrice
    );

    return updatedPrice;
  }

  resetRules(): void {
    this.ruleModuleList = this.baseRules;
  }

  undoRule(): void {
    if (this.ruleModuleList.length < 1) {
      return;
    }

    this.ruleModuleList.pop();
  }
}

export { IPricingRules, PricingRules };
