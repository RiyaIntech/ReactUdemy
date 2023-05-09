import React from 'react'
import CategoryItem from '../components/category-item'
import  '../directory/directory.style.scss'
const Directory = ({category}) => {
   return (
    <div className='directory-container'>
            {category.map((category) => (
              <CategoryItem key={category.id} category={category} />
            ))}
          </div>
  )
}

export default Directory