"select distinct toint(p.[RuleID]) as RuleID\nfrom [Fact_Purchase_Orders] p\nunion \nselect -1"
