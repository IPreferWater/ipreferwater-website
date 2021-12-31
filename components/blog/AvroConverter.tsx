import React, { Component } from 'react'; 

interface State {
    curl: string
    schemaRegistryUrl: string
}
class AvroConverter extends Component {

    state = {
        curl:"",
        schemaRegistryUrl: "",
        schemaName: "",
        schema : ""

    }

    buildCurl =() => {
        let copyState = this.state
        if (copyState.schemaRegistryUrl == ""){
            copyState.schemaRegistryUrl = "${SCHEMA_REGISTRY_URL}"
        }

        if (copyState.schemaName == ""){
            copyState.schemaName = "${SCHEMA_REGISTRY_NAME}"
        }
        
        const curl = `curl --location --request POST '${this.state.schemaRegistryUrl}/subjects/${this.state.schemaName}/versions' \
        --header 'Content-Type: application/json' \
        --data-raw '{
               ${this.state.schema}
            }'`

            copyState.curl = curl

            

            this.setState(copyState)
            console.log(curl)

    }

     tryParseJSONObject = (jsonString: string) => {
        try {
            var o = JSON.parse(jsonString);
    
            // Handle non-exception-throwing cases:
            // Neither JSON.parse(false) or JSON.parse(1234) throw errors, hence the type-checking,
            // but... JSON.parse(null) returns null, and typeof null === "object", 
            // so we must check for that, too. Thankfully, null is falsey, so this suffices:
            if (o && typeof o === "object") {
                return o;
            }
    
    
        }
        catch (e) { }
    
        return false;
    };

     inputHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      
        const str = event.target.value;
        const json = this.tryParseJSONObject(str)
         if (json == false) {
             console.log("set color to red");
           return;
         }
   
       // remove jump-lines & spaces from the json
        const strStringify = JSON.stringify(json);
        const schemaParsed = strStringify.replaceAll('"', '\\"')
        
        this.setState({schema : schemaParsed}, () => {
            this.buildCurl();
        });
        
       };

render() {

    return (
      <div>
          <div>
            <form>
              <label className="text-pink-300">
                Name:
                <textarea onChange={this.inputHandler} />
              </label>
              <input type="submit" value="Submit" />
            </form>
            </div>
                {this.state.curl}
            <div>
            
               

            </div>



      </div>
    )}
  
}

export default AvroConverter