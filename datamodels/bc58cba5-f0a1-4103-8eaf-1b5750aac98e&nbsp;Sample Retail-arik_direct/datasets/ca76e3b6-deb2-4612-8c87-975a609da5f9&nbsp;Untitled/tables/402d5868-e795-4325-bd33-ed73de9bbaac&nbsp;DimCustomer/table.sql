"select toint(c.[CustomerID]) as CustomerID, c.[StoreID], c.[TerritoryID]\nfrom [DimCustomers_old] c\nunion \nselect -1, toint(null), toint(null)"
