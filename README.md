# Checkout System

### To Execute

1. `yarn` to install
2. `yarn start` to start the cli interactions

### Plan Ahead

1. Have the interactions to let the merchant decide to use either a predefined pricing rule set or a customised pricing rule set -> interact on `new PricingRules()` and `.addRule()`
2. Able to let the merchant create rules and apply on top of the pricing rules -> create more `RuleModules` and interact on `new XXXRuleModules()`
3. Able to create more items into the items list -> interact on `new Item()`
4. Able to let the merchant check the status of the rule settings and cart status -> `pricingRules.printRules()` and `checkout.printItemsInCart()`
