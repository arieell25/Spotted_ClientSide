import React from 'react';
import ImageUploader from 'react-images-upload';



class UploadPhoto extends React.Component {
 
        constructor(props) {
            super(props);
             this.state = { pictures: [] };
             this.onDrop = this.onDrop.bind(this);
        }
     
        onDrop(picture) {
            this.setState({
                pictures: this.state.pictures.concat(picture),
            });
        }
     
        render() {
            return (
                <ImageUploader
                    withIcon={true}
                    buttonText='Choose images'
                    onChange={this.onDrop}
                    imgExtension={['.jpg', '.gif', '.png', '.gif']}
                    maxFileSize={5242880}
                />
            );
        }
    }

// const UploadPhoto = () => {
//    return (
//       <div className="d-flex justify-content-center title">
//       <div>
//         <Link to='/' style={{ 'textDecoration': 'none' }}><h2>UPLOAD PHOTO</h2></Link>
//       </div>
//       <div>
//       <div className="chooseFile">
//       <input className="FilePath" id="FilePath" label="File Path" name="FilePath" placeholder="Type here..."/>
//             <button className='btn' type="button">Choose a file</button>
//     </div>
//     <div className="button">
//         <Link to='/'>
//                 <button className='btn' type="button">UPLOAD</button>
//         </Link>
//         </div>
//         <div className="button">
//          <Link to='/'>
//                 <button className='btn' type="button">NEXT</button>
//         </Link>
//         </div>
//       </div>
//       </div>
//    )
// }

export default UploadPhoto