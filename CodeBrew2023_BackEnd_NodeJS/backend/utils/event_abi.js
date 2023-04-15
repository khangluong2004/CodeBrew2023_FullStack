const extract_event_abi = (BridgeAbi, EventName) => {
    for (i = 0; i < BridgeAbi.length; i++){
        let current = BridgeAbi[i]
        if (current.type == "event"){
            if (current.name == EventName){
                let log_input = []
                for (x = 0; x < current.inputs.length; x++){
                    if (current.inputs[x].indexed == false){
                        log_input.push(current.inputs[x])
                    } 
                }
                return(log_input)
            }
        }
    }
}

module.exports = extract_event_abi;