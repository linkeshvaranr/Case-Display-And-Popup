({
	
    deleteCase : function(component, event, helper) {
        let cmpEvent = component.getEvent("pc"); 
        let idx = event.currentTarget.dataset.record;
        console.log(idx)

        cmpEvent.setParams({"indexValues" : idx}); 
        cmpEvent.fire(); 

    }
})