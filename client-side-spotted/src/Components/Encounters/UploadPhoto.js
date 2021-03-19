import React, {Component, useState} from 'react';
import ImageUploader from 'react-images-upload';
import {EncounterService} from '../../Service/EncounterService';
import { Link, useLocation, BrowserRouter as Router } from "react-router-dom";
import StatusDialog from '../Encounters/StatusDialog';


function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
// class UploadPhoto extends Component {
    function UploadPhoto(){
        const [pictures, setPictures] = useState([]);
        const [status, setStatus] = useState('');
        const [openRespons, setOpenRespons] = useState(false);

        let query = useQuery();
        // const addMessage = (newMessage) => setMessages(state => [...state, newMessage])

        const onDrop = (picture) => {
            console.log(picture);
            //  setPictures(prevState=>[...prevState, picture]);
            const newState = [picture];
            setPictures(newState);
        }

        const handleCloseRespons = () => {
            setOpenRespons(false);
          };

        const uploadHandler= () =>{
            console.log(pictures);
            var id = query.get("id");
            console.log(id);
            const fd = new FormData();
            fd.append('image', pictures[0][0], pictures[0][0].name);
            EncounterService
            .addPhoto(fd, id)
            .then(data => {
                console.log('Added photo: ' + data);
                setStatus('Photo uploaded successfuly!');
                setOpenRespons(true);
            })
            .catch(err => {
                console.log(err);
                setStatus('Photo upload faild');
                setOpenRespons(true);
            });
        }
     
            return (
                <div>
                <ImageUploader
                    withIcon={true}
                    buttonText='Choose images'
                    onChange={onDrop}
                    imgExtension={['.jpg', '.gif', '.png', '.gif']}
                    maxFileSize={5242880}
                />
                <button className='btn' onClick={uploadHandler} >
                  UPLOAD
                </button> 
                <StatusDialog
                    open={openRespons}
                    status={status}
                    onClose={handleCloseRespons}
                />
                </div>           
                );
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