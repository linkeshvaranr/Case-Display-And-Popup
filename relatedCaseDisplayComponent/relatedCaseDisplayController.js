({
    init : function(component, event, helper) {
        console.log('init method')
        helper.getAndSetAllRelatedCase(component, event, helper);
    },
    openPopup : function(component, event, helper) {
        component.set("v.isModalOpen", true)
    },
    parentComponentEvent : function(component, event, helper) {
        console.log("Fired by event")
        let index = parseInt(event.getParams("indexValues").indexValues);
        component.set("v.returnIndex", index);
        let caseRecDel = component.get("v.closedCaseList")[index];
        
        let caseId = caseRecDel.Id;
        
        console.log("caseId -->"+caseId)
        let action = component.get("c.deleteCaseRecord");
        action.setParams({
            caseRec : caseRecDel
        })
        action.setCallback(this, function(response){
            console.log('Entering setCallback')
            
            let state = response.getState();
            if(state === 'SUCCESS') {
                
                console.log('case deleted success')
                let toastParams = {
                    message: "Case "+ caseRecDel.CaseNumber + " deleted successfully", // Error message
                    type: "error"
                };
                let toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams(toastParams);
                toastEvent.fire();
                let i=0;
                
                let updatedCaseRecList = component.get("v.allCaseList");
                let updatedCloseCaseRecList =  component.get("v.closedCaseList");
                
                console.log("Closed Case List --> "+updatedCloseCaseRecList)
                updatedCloseCaseRecList.splice(index,1);
                for(let allCaseRec of updatedCaseRecList){
                    if(allCaseRec.Id == caseId){
                        console.log(allCaseRec.Id);
                        updatedCaseRecList.splice(i,1);
                    }
                    i++;
                    
                }
                console.log("Closed Case List --> "+updatedCloseCaseRecList)
                component.set("v.closedCaseList", updatedCloseCaseRecList);
                component.set("v.allCaseList", updatedCaseRecList);
                
                $A. get('e. force:refreshView'). fire();
                
                
            } 
        });
        $A.enqueueAction(action);
        
    }
})