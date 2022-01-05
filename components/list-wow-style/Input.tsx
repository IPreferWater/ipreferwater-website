import React from 'react'; // we need this to make JSX compile

type InputProps = {
  nameCharacter: string,
  level: string,
  server: string
}

export const Input = ({ nameCharacter, level, server }: InputProps) => 
<div className='flex flex-col py-4'>
  <div className='text-yellow-400'>{nameCharacter}</div>
  <div className='text-white'>{level}</div>
  <div className='text-gray-700'>{server}</div>
</div>

