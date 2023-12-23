import  { useState, useRef } from 'react';
import ReactCrop, { convertToPixelCrop, makeAspectCrop } from 'react-image-crop';
import './ProfilePic.css';
import {setCanvasPreview} from './SetCanvasPreview'
const aspectRatio=1;
const minDimesion= 200;
import Modal from 'react-bootstrap/Modal';
import {UPDATE_USER} from '../../../utils/mutations';
import { useMutation } from '@apollo/client';
import {SINGLE_USER} from '../../../utils/queries'

const PictureModal = (props) => {
    const [updateUser, { error }] = useMutation(UPDATE_USER,{refetchQueries:[
        SINGLE_USER
      ]});
  const imageRef = useRef(null)
  const previewCanvas = useRef(null)
  const [currentImageUrl, setcurrentImageUrl] = useState(null);
  const [file, setFile] = useState({myFile:''});
  const [crop, setCrop]=useState();
  const [imgSrc, setImgSrc] = useState("");


  const onSelectFile= (e)=>{
    const file = e.target.files[0];
    console.log(file)
    const reader = new FileReader
    reader.onload= function(){
      const imageUrl = reader.result?.toString() || ""
      setImgSrc(imageUrl)
    }
    reader.readAsDataURL(file)
  }

  const onImageLoad = (e)=>{
    const {width, height} = e.currentTarget
    const crop = makeAspectCrop({
      unit:"%",
      width: 25,
    }, 
    aspectRatio,
    width,
    height);
    setCrop(crop)
  }

  const updateProfilePic= async()=>{
    console.log("update profile", file.myFile)
    console.log(3)
    try{
        console.log(5)
      await updateUser({
        variables: { 
          criteria:{
            userPictureLink: file.myFile, 
          },
        }
      })
    } catch (err){
      console.error(err)
    }
  }

  const cropImage = async()=>{
    setCanvasPreview(
        imageRef.current, 
        previewCanvas.current, 
        convertToPixelCrop(crop,
          imageRef.current.width,
          imageRef.current.height
        )
      )
      const dataURL = previewCanvas.current.toDataURL()

      try{
        console.log(5)
      await updateUser({
        variables: { 
          criteria:{
            userPictureLink: dataURL, 
          },
        }
      })
    } catch (err){
      console.error(err)
    }
  }

  return (
    <Modal
    {...props}
    size="lg"
    aria-labelledby="contained-modal-title-vcenter"
    centered
  >
    <Modal.Header closeButton>
      <Modal.Title id="contained-modal-title-vcenter">
        Choose a new Profile Picture 
      </Modal.Title>
    </Modal.Header>
    <div className='text-center'>
    <input 
        type="file" 
        // label="Image"
        // name="myFile"
        // id="file-upload"
        accept=".jpeg,.png,.jpg"
        onChange={onSelectFile}>
        </input>
    </div>
    <Modal.Body rows={12}>  
    {imgSrc && (
    <div className='flex flex-col items-center'>
    <ReactCrop
    onChange={
      (pixelCrop, percentCrop)=>setCrop(percentCrop)
    }
    crop={crop}
    circularCrop
    keepSelection
    aspect={aspectRatio}
    minWidth={minDimesion}>
        <img ref={imageRef} src={imgSrc} style={{maxHeight:"70vh"}} onLoad={onImageLoad}/>
    </ReactCrop>
    <button style={{borderRadius: "10px", padding: '5px', background: "white"}} onClick={cropImage}>
      Save Profile Picture
    </button>
    </div>
    )}
    {crop && 
    <canvas ref={previewCanvas} style={{objectFit:"contain", width:200, height:200, display:"none"}}>
    </canvas>}
    </Modal.Body>
  </Modal>
  );
};

export default PictureModal;


