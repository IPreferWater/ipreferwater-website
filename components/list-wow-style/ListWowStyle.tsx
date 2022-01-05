import React, { Component } from 'react'; 
import {Input} from './Input';

interface State {
    curl: string
    schemaRegistryUrl: string
}
class ListWowStyle extends Component {

    state = {
        curl:"",
        schemaRegistryUrl: "",
        schemaName: "",
        schema : ""

    }

render() {

    return (
      <div className="w-96 h-full bg-gray-600">
          <div className="flex flex-col">
         <div className='bg-red-700 text-center w-1/3 m-auto'>Projects</div>
         <Input nameCharacter="project's name" level='quick description for the project' server='3 / 12 / 2022'/>
         <Input nameCharacter="project's name" level='quick description for the project' server='3 / 12 / 2022'/>
         <Input nameCharacter="project's name" level='quick description for the project' server='3 / 12 / 2022'/>
         </div>
      </div>
    )}
  
}

export default ListWowStyle