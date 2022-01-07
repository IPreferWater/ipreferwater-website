import React, { Component } from 'react'; 
import {Input} from './Input';
import {BtnWowStyle} from './BtnWowStyle';

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
      <div className="w-96 h-screen relative bg-[url('/blog/list-wow-style/bg.png')]" >

  <div className='absolute inset-0 w-full h-full bg-black bg-opacity-70'></div>
          <div className="flex flex-col">

              <BtnWowStyle title='Projects'/>
         
         <Input nameCharacter="project's name A" level='quick description for the project A' server='2 / 12 / 2022'/>
         <Input nameCharacter="project's name B" level='quick description for the project B' server='22 / 02 / 2021'/>
         <Input nameCharacter="project's name C" level='quick description for the project C' server='11 / 11 / 2020'/>


         </div>
         <div className='relative -bottom-[120px]'>
<BtnWowStyle title='Choose a Project'/>
</div>
      </div>
    )}
  
}

export default ListWowStyle