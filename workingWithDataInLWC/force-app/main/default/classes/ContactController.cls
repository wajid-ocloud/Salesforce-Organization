public with sharing class ContactController {
    @AuraEnabled(Cacheable = True)
    public static List<Contact> getContacts(){
        // return[
        //     SELECT FirstName, LastName, Email FROM Contact
        //     WITH SECURITY_ENFORCED
        //     ORDER BY FirstName
        // ];
        throw new AuraHandledException('Forced error');
    }
}