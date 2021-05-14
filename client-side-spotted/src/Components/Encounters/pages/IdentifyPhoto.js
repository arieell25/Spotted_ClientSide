import React, {useState, useEffect} from 'react';
import qs from 'qs';
import {SystemResultsService} from '../../../Service/SystemResultsService';
import {identificationService} from '../../../Service/IdentificationService/photoIdentService';
import {EncounterService} from '../../../Service/EncounterService';
import GradientCircularProgress from '../components/CircularProgress'
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, Typography, Grid } from '@material-ui/core';
import ImagePicker from 'react-image-picker'
import 'react-image-picker/dist/index.css'
import { PhotoService } from '../../../Service/PhotoService';
import ResultsCard from '../components/ResultsCard';

// import { Link, useLocation, BrowserRouter } from "react-router-dom";
import StatusDialog from '../components/StatusDialog';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        padding: 50,
        width: 800,
        margin: `0 auto`
      },
    cardtitle :{
        fontSize:30,
        paddingBottom:10
      },
    //   results:{
    //       width: '80%'
    //   }
  }));

    function IdentifyPhoto(props){
        const classes = useStyles();
        const [photos, setPhotos] = useState([]);
        const [loading, setLoading] = useState([]);
        const [resultsReady, setResultsReady] = useState(false);
        const [fileNames, setfileNames] = useState([]);
        const [status, setStatus] = useState('');
        const [error, setError] = useState(false);
        const [openRespons, setOpenRespons] = useState(false);
        const [newId, setId] = useState(null);
        const [image, setimage] = useState(null);
        const [idntId, setidntId] = useState(null);
        const [photosResults, setPhotosResults] = useState();
        const [idntResults, setidntResults] = useState();
        var id = qs.parse(props.location.search, { ignoreQueryPrefix: true }).id;
        
    useEffect(() => {
        const fetchData = async () => {
        //   const boundingBoxData = await PhotoService.getEncounterPhotosBBox(fileNames);
          const photosData = await PhotoService.getEncounterPhotos(id);
           var new_arr = photosData.map(image=> {
               let arr_str = (image.src).split("/");
               console.log(arr_str);
               image.fileName = arr_str[5];
               return (image)
           }
             )
             console.log(new_arr);
           
          setPhotos(new_arr);
        };
        fetchData();  
        setLoading(false);
      
      }, []);

        const onClick = () => {
            setLoading(true);
            console.log(image.image)
            console.log(fileNames);
            PhotoService.getEncounterPhotosBBox(fileNames)
            .then(res => {
                console.log(res);
                identificationService.identifyPhotos(image.image, res )
                .then(res => {
                    console.log(res);
                    SystemResultsService.addSecondSystemResults(res)
                    .then(res => {console.log(res)})
                    .catch(err => {console.log(err)})
                    
                    setidntResults(res);
                    setResultsReady(true);
                    setLoading(false);
                    console.log(idntResults)
                })
                .catch(err =>{ setStatus(err); setOpenRespons(true); setError(true);});
            })
            .catch(err => {setStatus(err); setOpenRespons(true);} );
  
            // setfileNames(prevState=>[picture, ...prevState]);
            // const newState = [picture];
            // setPictures(newState);
        }
        const onPick = (image) => {
            setimage({image});
            setfileNames(image.map((item)=>item.value));
            // setfileNames(prevState=>[image, ...prevState]);
            console.log(fileNames);
        }

        const handleCloseRespons = () => {
            setOpenRespons(false);
          };

        // const uploadHandler= async () =>{
        //     console.log(fileNames);
        //     // var id = query.get("id");
        //     setId(id);
        //     console.log(id);
        //     const fd = new FormData();
        //     // fd.append('image', pictures[0][0], pictures[0][0].name);
        //     try{
        //         await speciesDetectionService
        //         .detectSpecies(fd)
        //         .then( res => {
        //             //Check if confidence > 70%
        //             console.log(res);
        //             var bBox = res.data;
        //             var url, photoId;
        //             var count = res.counts;
        //             var confidence = (res.data[0][0].confidences).toString().substring(0,4);
        //             if(res.counts > 0 && confidence > 0.61){
        //              EncounterService
        //             .uploadPhoto(fd, id)
        //             .then(data => {
        //                 console.log('Added photo: ' + data.url);
        //                 url = data.url;
        //                 EncounterService.addPhoto(id, url, count)
        //                 .then(res=>{
        //                     photoId = res.data.newPhoto.PhotoID;
        //                     EncounterService.addBoundingBox(bBox, photoId)
        //                     .then(res=> console.log('added bounding box status: '+ JSON.stringify(res) ))
        //                 } )
        //                 .catch(err=> console.log(err));
        //                 setStatus(`Detected ${count} BlueSpotted with ${confidence} and saved photo!`);
        //                 setOpenRespons(true);
        //             })
        //             .catch(err => {
        //                 console.log(err);
        //                 setStatus('Photo upload faild');
        //                 setOpenRespons(true);
        //             });

                   
        //             }else if(res.counts == 0){
        //                 setStatus('Sorry we did not detect any BlueSpotted.... try with a diffrent photo.');
        //                 setOpenRespons(true)
        //             }
        //         })
        //         // .catch(err=>{
        //         //         console.log(err);
        //         //         setStatus('Oops...Something went wrong....');
        //         //         setOpenRespons(true)
        //         // }); 
               
        //     }catch(err){
        //         console.log(err)
        //     }
        // }

        const renderEachResult = (item, i) => {
            if(item.individuals_ID){
              return (
                <ResultsCard index={i} 
                src={item.src} 
                key={i} 
                ids={item.individuals_ID} 
                encounterid={id}
                setOpen={setOpenRespons}
                setstatus={setStatus}
                setIdntId={setidntId}
                />
              );
            }
          };

        if (!photos || loading ) return <GradientCircularProgress />
        else if(error){
            return
            (<StatusDialog
                open={openRespons}
                status={status}
                onClose={handleCloseRespons}
            /> )
        }
        else if(resultsReady){
            return(
            //    <div>
            <div className="animated slideInUpTiny animation-duration-3">
            <div className="m-5">
              <div className="d-flex justify-content-center title">
                <h2>Individual Identification Results</h2>               
             <div className={classes.results}>
                    {idntResults
                      .map(renderEachResult)
                    }
                  </div>
              </div>
              <StatusDialog
                open={openRespons}
                status={status}
                onClose={handleCloseRespons}
                idntId={idntId}
            /> 
         </div>
         </div>               

            )

        }
        else{
            return (
                // {{ resultsReady} && 
                //     <Grid container className="Encounters">
                //     {encounters
                //       .map(renderEachEncounter)
                //       .reverse()
                //       .slice(0, limit)
                //     }
                //   </Grid>
                // }
                <div className="animated slideInUpTiny animation-duration-3">
                <div className="m-5">

                  <div className="d-flex justify-content-center title">
                      <div>
                        <h2>Individual Identification</h2>
                    </div>
                    <Card className={classes.root}>
                    <div>
                    <CardContent>
                        <Typography gutterBottom className={classes.cardtitle} component="h2">
                        Select photos for identification
                        </Typography>
                    <ImagePicker 
                            images={photos.map((image, i) => ({src: image.src, value: image.fileName}))}
                            onPick={onPick}
                            multiple
                            />
                            <button className='btn' onClick={onClick}>Start</button>
                        </CardContent>

                        </div>

                </Card>
                <StatusDialog
                    open={openRespons}
                    status={status}
                    id={newId}
                    onClose={handleCloseRespons}
                /> 
                </div>  
                </div>           
                </div>           
         
                );
            }
        }
    
export default IdentifyPhoto;
