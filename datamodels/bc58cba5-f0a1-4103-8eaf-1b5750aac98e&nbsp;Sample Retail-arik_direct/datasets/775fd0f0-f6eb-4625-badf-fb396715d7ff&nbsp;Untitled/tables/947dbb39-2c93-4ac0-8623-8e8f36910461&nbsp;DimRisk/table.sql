"select distinct toint(s.[RiskID]) as RiskID, toint(s.[RiskID]) as RiskFilter\nfrom [Fact_Sale_orders] s\nunion \nselect -1, -1"
