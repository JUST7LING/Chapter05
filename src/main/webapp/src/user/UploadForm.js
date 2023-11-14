
import React, { useState, useRef } from 'react';
import styles from '../css/uploadForm.module.css';
import axios from 'axios';
import image from '../image/whatshold.gif';
import camera from '../image/camera.png';
import { Link, useNavigate } from 'react-router-dom';

const UploadForm = () => {
    const [imageList, setImageList] = useState([])

    const [userUploadDTO, setUserUploadDTO] = useState({
        imageName: '',
        imageContent: '',
        imageFileName: '',
        imageOriginalName: ''
    })

    const {imageName, imageContent, imageFileName, imageOriginalName} = userUploadDTO

    const [file, setFile] = useState('')
   //  const [showImgSrc, setShowImgSrc] = useState('')

    /*
    const readURL = (i) => { // input인데 i로 씀
        var reader = new FileReader();
        reader.readAsDataURL(i.file[0])

        reader.onload =() =>{
            console.log(i.file[0])
            setShowImgSrc(reader.result)
            setFile(i.file[0])
        }

    }
    */
    
    const onInput = (e) => {
        const {name, value} = e.target
        setUserUploadDTO({
            ...userUploadDTO,
            [name]: value
        })

    }

    const imgRef = useRef()

    const goAttatch = (e) => {
        imgRef.current.click() 
        // 카메라 이미지를 누르면 파일 선택 버튼에 클릭 이벤트가 발생한다.

    }
    
    const onImgInput = (e) => {
        const imageFiles = Array.from(e.target.files)
        var imgArray = [] // 카메라 누를 때마다 초기화됨. readURL은 사용되지 않고 있다

        imageFiles.map( item => {
            const objectURL = URL.createObjectURL(item)
            imgArray.push(objectURL)
        })

        setImageList(imgArray) // 파일 첨부 시 이미지 미리보기 
        setFile(e.target.files) // setFile(imageFiles) 해도 된다. formData에 넣어서 서버로 보내는 용도.
    }
    
    const navigate = useNavigate();
    
    const goUpload = (e) => {
        var formData = new FormData()
    //    formData.append('img[]', imageList)
    //    formData.append('userUploadDTO', userUploadDTO)
        formData.append('userUploadDTO', new Blob([JSON.stringify(userUploadDTO)], {type: 'application/json'})) // >> Byte 단위로 현재 값을 분해해서 넘긴다. 
      /*
        for(var i = 0; i<files.length; i++){
            formData.append('img', files[i])
        }
      */
        Object.values(file).map((item, index) => {
            formData.append('img', item)
        })

        axios.post('/user/upload', formData, {
            headers:{
                'Content-Type': 'multipart/form-data'
            }

        }).then(res=>{alert('이미지 등록이 완료되었어요!'); navigate('/user/uploadList')}).catch(e => console.log(e))

    }

    const goReset = (e) => {
        setUserUploadDTO({
            imageName: '',
            imageContent: '',
            imageFileName: '',
            imageOriginalName: ''
        })
    
        setImageList([])
     //   setShowImgSrc('')
        imgRef.current.value = '' // << ref value 초기화 참고

    }

    return (
        <div>
             <h3>
                <Link to = '/'><img src = {image}  alt = '이미지가 없당' width = '150' /></Link>
            </h3>
            <form>
                <table border={1}>
                    <thead/>
                    <tbody>
                    <tr>
                        <th>상품명</th>
                        <td>
                            <input type="text" name="imageName" value = {imageName} onChange = {onInput} size={35}/>
                        </td>
                    </tr>

                    <tr>
                        <td colSpan={2} align="center">
                            <textarea name="imageContent" rows={10} cols={50} value = {imageContent} onChange = {onInput}></textarea>
                        </td>
                    </tr>

                    <tr>
                        <td colSpan={2}>
                            

                            <img id="camera" src={camera} alt="카메라" onClick = {goAttatch} style={{width:50}} />
                            <span>
                                {
                                    imageList.map((item, index) => <img key = {index} src = {item} style = {{width: '40px', height: '40px'}}/>)
                                }
                            </span>
                            <input id="img" type="file" name="img[]" multiple = 'multiple' style={{visibility: "hidden"}} ref = {imgRef}
                               // onChange = { e => readURL(e.target)} // onChange = {onImgInput}
                               onChange = {onImgInput}
                            />
                           
                        </td>
                    </tr>

                    <tr>
                        <td colSpan={2} align="center">
                            <button onClick = {goUpload} type = 'button'>이미지 업로드</button>
                            <button onClick = {goReset} type = 'button'>취소</button>
                        </td>
                    </tr>
                    </tbody>
                    <tfoot/>
                </table>
            </form>
        </div>
    );
};

export default UploadForm;