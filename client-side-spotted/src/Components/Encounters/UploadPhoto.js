import { Link } from 'react-router-dom'

const UploadPhoto = () => {
   return (
      <div className="d-flex justify-content-center title">
      <div>
        <Link to='/' style={{ 'textDecoration': 'none' }}><h2>UPLOAD PHOTO</h2></Link>
      </div>
      <div>
      <div className="chooseFile">
      <input className="FilePath" id="FilePath" label="File Path" name="FilePath" placeholder="Type here..."/>
            <button className='btn' type="button">Choose a file</button>
    </div>
    <div className="button">
        <Link to='/'>
                <button className='btn' type="button">UPLOAD</button>
        </Link>
        </div>
        <div className="button">
         <Link to='/'>
                <button className='btn' type="button">NEXT</button>
        </Link>
        </div>
      </div>
      </div>
   )
}

export default UploadPhoto