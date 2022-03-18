import React from 'react'; // we need this to make JSX compile

type BtnWowStyleProps = {
  title: string
}

export const BtnWowStyle = ({ title }: BtnWowStyleProps) => 
<div className='relative'>
<div className='w-[180px] m-auto wow-stroke-txt text-center text-[#F6C308] rounded-lg bg-[#6C0202] text-2xl pb-[3px]'>{title}</div>
<div className='w-[180px] absolute border-2 border-black outline outline-2 outline-[#5E6A68] blur-[0.5px] rounded-lg h-full top-0 right-[100px]'></div>
</div>

