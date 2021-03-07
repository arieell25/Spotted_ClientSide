import { Link } from 'react-router-dom'

const TypeUpload = () => {
   return (
      <div>
         <Link to='/'>
            <button className='btn' type="button"> Video</button>
         </Link>
         <Link to='/'>
            <button className='btn' type="button">single Image</button>
         </Link>
         <Link to='/'>
            <button className='btn' type="button">bulk of Images</button>
         </Link>
      </div>
   )
}

export default TypeUpload