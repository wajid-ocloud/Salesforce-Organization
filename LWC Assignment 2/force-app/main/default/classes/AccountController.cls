public with sharing class AccountController {
    
    @AuraEnabled(cacheAble=true)
    public static List<Account> searchAccounts(String searchTerm) {
        // Return all bears when no search term
        searchTerm = searchTerm.trim();
        if (searchTerm == '') {
            return getAllBears();
        }
        
        searchTerm = '%' + searchTerm + '%';
        
        return [
            SELECT Name, AnnualRevenue, Industry
            FROM Account
            WHERE Name LIKE :searchTerm
            WITH SECURITY_ENFORCED
            ORDER BY Name
        ];
    }
}