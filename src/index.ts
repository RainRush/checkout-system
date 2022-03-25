import {
  BulkDiscountRuleModule,
  Checkout,
  Item,
  PricingRules,
  XForYRuleModule,
} from './classes';

const checkoutSystem = (): void => {
  const ipd = new Item('ipd', 'Super iPad', 549.99);
  const mbp = new Item('mbp', 'MacBook Pro', 1399.99);
  const atv = new Item('atv', 'Apple TV', 109.5);
  const vga = new Item('vga', 'VGA adapter', 30.0);

  const appleTv3For2Rule = new XForYRuleModule(atv, 3, 2);
  const iPadBulkDiscountRule = new BulkDiscountRuleModule(ipd, 4, 499.99);

  const openingDayPricingRules = new PricingRules();
  openingDayPricingRules.addRule(appleTv3For2Rule);
  openingDayPricingRules.addRule(iPadBulkDiscountRule);
  // OR const openingDayPricingRules = new PricingRules([appleTv3For2Rule, iPadBulkDiscountRule]);
  // AND openingDayPricingRules.addRule(customisedRule) for more customisedRules on VIP etc
  openingDayPricingRules.printRules();

  const co = new Checkout(openingDayPricingRules);

  // co.scan(atv);
  // co.scan(atv);
  // co.scan(atv);
  // co.scan(vga);

  co.scan(atv);
  co.scan(ipd);
  co.scan(ipd);
  co.scan(atv);
  co.scan(ipd);
  co.scan(ipd);
  co.scan(ipd);

  co.printItemsInCart();
  co.printTotal();
};

checkoutSystem();
