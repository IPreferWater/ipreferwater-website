import React from 'react';

type CategoriesFlairsProps = {
    categories: string
  }

  function getCategoryColor(c: string): string {
    if (c=="code"){
      return "bg-blue-700"
    }
    return "bg-green-400"
  }

  function getFirstCategory(c: string): string {
    const index = c.indexOf(" ");
    // there is no separator, only one category
    if (index<0) {
        return c
    }
    return c.substring(0, index)
  }
  
//I stored the categories on a single line separated by whitespace
export const CategoriesFlairs = ( {categories} : CategoriesFlairsProps) => {
const firstCategory = getFirstCategory(categories)
const color = getCategoryColor(firstCategory)

return <div className='flex flex-row space-x-2'>    
{categories.split(" ").map((category) =>(
        <div className={`${color} rounded-xl p-1 text-white`}>{category}</div>
    ))}
</div>
}


