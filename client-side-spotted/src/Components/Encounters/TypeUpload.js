import { Link } from 'react-router-dom'

const TypeUpload = () => {
   return (
      <div className="d-flex justify-content-center title">
      <div>
        <Link to='/' style={{ 'textDecoration': 'none' }}><h2>TYPE OF UPLOAD?</h2></Link>
      </div>
      <div>
         <Link to='/UploadPhoto'>
            <button className='btn' type="button"> Video</button>
         </Link>
         <Link to='/UploadPhoto'>
            <button className='btn' type="button">single Image</button>
         </Link>
         <Link to='/UploadPhoto'>
            <button className='btn' type="button">bulk of Images</button>
         </Link>
      </div>
      </div>
   )
}

export default TypeUpload