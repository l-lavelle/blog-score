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
import "./PictureModal.css"

const PictureModal = (props) => {
    const [updateUser, { error }] = useMutation(UPDATE_USER,{refetchQueries:[
        SINGLE_USER
      ]});
  const imageRef = useRef(null);
  const previewCanvas = useRef(null);
  const [crop, setCrop]=useState();
  const [imgSrc, setImgSrc] = useState("");


  const onSelectFile= (e)=>{
    setCrop()
    setImgSrc("")
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
      width: 50,
    }, 
    aspectRatio,
    width,
    height);
    setCrop(crop)
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
      <Modal.Title className="text-center" id="contained-modal-title-vcenter">
        Choose a new Profile Picture 
      </Modal.Title>
    </Modal.Header>
    <div className='text-center'>
    <input 
        type="file" 
        accept=".jpeg,.png,.jpg"
        onChange={onSelectFile}>
        </input>
    </div>
    <Modal.Body>  
    {imgSrc && (
    <div className='d-flex flex-column align-items-center'>
    <div className='d-flex flex-col items-center'>
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
    </div>
    <button className="mt-3 btn profile-pic-btn" onClick={cropImage}>
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


