public with sharing class AdhocEventsQueueableHandler implements Queueable, Database.AllowsCallouts{
    
    public static Boolean firstRun = true;
	private List<Adhoc_Event__c> adhocEvents;
    private String triggerType;
    private String endpointUrl;
    private String baseUrl = 'callout:GoogleCalendar/calendars/';
    public AdhocEventsQueueableHandler(List<Adhoc_Event__c> adhocEvents, String triggerType){
        System.debug('events'+adhocEvents);
        this.adhocEvents = adhocEvents;
        this.triggerType = triggerType;
    }
    
    
    public void execute(QueueableContext context){
        
        if(RecursiveTrigger.firstTime==false){
            return;
        }
        
        for(Adhoc_Event__c event : adhocEvents){
            String requestMethod;
            HttpRequest request = new HttpRequest();
            
            
            //////////////////////////////////////////////////////////////
            String endDateTime = ''+event.End_Date__c;
            endDateTime = endDateTime.replace(' ', 'T');
            String startDateTime = ''+event.Start_Date__c;
            startDateTime = startDateTime.replace(' ', 'T');
            String userTimeZone = UserInfo.getTimeZone().getID();
            ///////////////////////////////////////////////////////////////
            
            String requestBody = '{"end": {"dateTime": "'+endDateTime+'","timeZone":"'+
            userTimeZone+'"},"start": {"dateTime": "'+startDateTime+'","timeZone":"'+
            userTimeZone+'"}, "summary": "'+event.Subject__c+'"}';
            
            
            if(triggerType == 'INSERT'){
                requestMethod = 'POST';
        		endpointUrl = baseUrl+event.Manager_Email__c+'/events';
                request.setBody(requestBody);
            }
            else if(triggerType == 'UPDATE'){
                requestMethod = 'PUT';
        		endpointUrl = baseUrl + event.Manager_Email__c+'/events/'+event.iCalUID__c;
                request.setBody(requestBody);
                System.debug('iCalUID:'+event.iCalUID__c);
            }
            else if(triggerType == 'DELETE'){
                requestMethod = 'DELETE';
        		endpointUrl = baseUrl + event.Manager_Email__c+'/events/'+event.iCalUID__c;
            }
            
            request.setEndpoint(endpointUrl);
            request.setMethod(requestMethod);
            // Send the HTTP request and get the response
            HttpResponse response = new Http().send(request);
            
            if (response.getStatusCode() == 200 && requestMethod == 'POST' && RecursiveTrigger.firstTime==true) {
                
                Map<String, Object> results = (Map<String, Object>) JSON.deserializeUntyped(response.getBody()); 
                
                Adhoc_Event__c adhoc = [SELECT iCalUID__c FROM Adhoc_Event__c WHERE ID=:event.Id];//new Adhoc_Event__c(ID=eventID, iCalUID__c =(String)results.get('id'));
                
                adhoc.iCalUID__c = (String)results.get('id');
                System.debug('ICALUID'+event.Id);
                    RecursiveTrigger.firstTime=false;
                    
                    update adhoc;
                    System.debug('events test'+event);
            } else {
                // Handle the error
                String errorMessage = 'Error ' + response.getStatusCode() + ': ' + response.getStatus() + response.getBody();
                System.debug(errorMessage);
            }
        }
    }
}