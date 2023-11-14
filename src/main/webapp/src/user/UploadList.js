import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import image from '../image/whatshold.gif';
import axios from 'axios';

const UploadList = () => {
    const [list, setList] = useState([])

    // useEffect(() => {
    //     axios.get('/user/uploadList')
    //          .then(res => {
    //             setList(res.data)
    //             console.log(res.data)
    //          })
    //          .catch(e => console.log(e))
    // },[]) // >> 얘 작동 안 돼서 window.onload 넣었다. 근데 새로고침 한 번 해 줘야 넘어온다. 

    // SECOND COMMIT용 주석 추가
    window.onload = () => {
        axios.get('/user/UploadList')
             .then(res => {
                setList(res.data)
                console.log(res.data)
             })
             .catch(e => console.log(e))
    }

    const showInfo = (e) => {
        console.log(e)
        setInfo(e)
    }

    const setInfo = (e) => {
        var str = '../storage/'
        str += e
        console.log(str)
        return str;
    }

    return (
        <div>
            <h3>
                <Link to = '/'><img src = {image}  alt = '이미지가 없당' width = '150' /></Link>
            </h3>
            <table border = '1'>
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>이미지</th>
                        <th>상품명</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        list.map(item => <tr key = {item.seq}>
                            <td>{item.seq}</td>
                        
                            <td><img src = {`https://kr.object.ncloudstorage.com/bitcamp-edu-bucket-107/storage/${encodeURIComponent(item.imageFileName)}` 
                               
                            }
                                alt = {item.imageName} style = {{width: 100}} onClick = {() => showInfo(item.imageOriginalName)}/></td>
                            <td>{item.imageName}</td>
                        </tr>)
                    }
                </tbody>
            </table>

        </div>
    );
};

export default UploadList;