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
        schema : "",
        valid: true

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
               "schema": "${this.state.schema}"
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

    onChangeSchemaRegistryUrl = (event: React.ChangeEvent<HTMLInputElement>) => {
        const schemaRegistryUrl = event.target.value;
        this.setState({schemaRegistryUrl : schemaRegistryUrl}, () => {
            this.buildCurl();
        });
    }

    onChangeSchemaRegistryName = (event: React.ChangeEvent<HTMLInputElement>) => {
        const schemaRegistryName = event.target.value;
        this.setState({schemaName : schemaRegistryName}, () => {
            this.buildCurl();
        });
    }

     inputHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      
        const str = event.target.value;

        if (str === "") {
            this.setState({valid : true}, () => {
              
            });
            return;
        }
        const json = this.tryParseJSONObject(str)

        
         if (json == false) {
             console.log("set color to red");
             this.setState({valid : false}, () => {
              
            });
           return;
         }
   
       // remove jump-lines & spaces from the json
        const strStringify = JSON.stringify(json);
        const schemaParsed = strStringify.replaceAll('"', '\\"')
        
        this.setState({schema : schemaParsed, valid : true}, () => {
            this.buildCurl();
        });
        
       };

render() {

    return (
        <div className='flex flex-col'>
            {!this.state.valid  &&        
          <div className='text-red-400 font-bold text-center text-4xl'>your json is invalid</div>}

      <div className='flex flex-row'>
          
          <div className='md:w-1/2 py-10 mx-4'>
            <form>
            <input type="url" className="shadow appearance-none border rounded w-4/5 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="schema-registry url"
            onChange={this.onChangeSchemaRegistryUrl} />

            <input className="shadow appearance-none border rounded w-4/5 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="schema-registry name"
            onChange={this.onChangeSchemaRegistryName} />

              <label className="">
                <textarea className='shadow-md resize-none w-4/5 h-screen' onChange={this.inputHandler} />
              </label>
            </form>
            </div>
                
            <div className='md:w-1/2'>
            <div className={`border-4  w-full h-full ${this.state.valid ? "border-green-400" : "border-red-400 text-gray-500"} `}>
            {this.state.curl}
            </div>
            

            </div>



      </div>

      </div>
    )}
  
}

export default AvroConverter