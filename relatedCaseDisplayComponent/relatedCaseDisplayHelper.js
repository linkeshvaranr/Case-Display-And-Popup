({
    getAndSetAllRelatedCase : function(component, event, helper) {
        console.log('getAndSetAllRelatedCase method in helper')
        let action = component.get("c.returnRelatedCaseRecords");
        action.setParams({
            accId: component.get("v.recordId")
        })
        action.setCallback(this, function(response){
            console.log('Entering setCallback')
            
            let state = response.getState();
            if(state == 'SUCCESS') {
                
                console.log('Success')
                console.log(response.getReturnValue())
                
                let items = response.getReturnValue();
                let closeCaseRecs = [];
                let allCaseRecs = [];
                for(let caseRec of items){
                    console.log(caseRec.Status)
                    allCaseRecs.push(caseRec);
                    if(caseRec.Status == 'Closed'){
                        closeCaseRecs.push(caseRec);
                    }
                    
                }
                  console.log("All case Records --> "+ allCaseRecs)
                console.log("Closed case Records --> "+ closeCaseRecs)
                component.set("v.allCaseList", allCaseRecs);
                component.set("v.closedCaseList", closeCaseRecs);
            } 
        });
        $A.enqueueAction(action);
        
    }
})