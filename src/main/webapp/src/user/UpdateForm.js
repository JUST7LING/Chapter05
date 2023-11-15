import React, { useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import image from '../image/whatshold.gif';

const UpdateForm = () => {
    const {ID} = useParams()
    console.log(ID)

    const [userDTO, setUserDTO] = useState({
        name: '',
        id: ID,
        password: ''
    });

    const [nameDiv, setNameDiv] = useState('')
    const [passwordDiv, setPasswordDiv] = useState('')

    const navigate = useNavigate()

    const {name, id, password} = userDTO;

    const onInput = (e) => {
        // setUserDTO({...userDTO, [e.target.name] : [e.target.value]})
        const {name, value} = e.target
 
        setUserDTO({
         ...userDTO,
         [name]: value
        })
     }

     const clkCancel = (e) => {
        e.preventDefault() // submit이 안 되게 막는다. 
        // 혹은 위 행 대신 button type = 'button'으로 잡아도 될 것 같다. 
        // 현재 button tag의 type은 지정되지 않은 상태(submit)다.
        setUserDTO({
            name: '',
            id: ID,
            password: ''

        }) // 입력값

        // set ~~ Div : validation 후 알림 메시지 출력하는 부분
        setPasswordDiv('')
        setNameDiv('') // 초기화
    }

    const nameRef = useRef()
    const passwordRef = useRef()

    const clkSubmit = (e) => {
        e.preventDefault()
        setNameDiv('')
        setPasswordDiv('')
        let sw = 1

        if(!name){
            setNameDiv('이름을 입력하세요')
            nameRef.current.focus()
            sw = 0
        }
        if(!password){
            setPasswordDiv('비밀번호를 입력하세요')
            passwordRef.current.focus()
            sw =  0
        }
        if(sw === 1){
            console.log('간다!') // proxy modified
            axios.put('/user/update', null, { // 두 번째 인자가 뭐지? 
               params: {
                    name: name,
                    id: id,
                    pwd: password
                } 
            }).then(
                alert(`${name}님의 회원정보 수정이 완료되었습니다.`),
                navigate('/user/list')

            ).catch( error => console.log(error))
           
        }
    }
    const clkDel = (e) => {
        
        if(window.confirm('정말 회원정보를 삭제하시겠어요?')){
            axios.delete(`/user/delete?id=${id}`, null, { // proxy modified
            
            }).then(alert('회원님의 정보가 안전하게 삭제되었어요.'),
                 navigate('/user/list')).catch(error => console.log(error))
        }
    }

    return (
        <div id = 'disp'>
            <Link to = '/user/list'><img id = 'imageZone' src = {image} alt = '이미지 없당' /></Link>
            <form>
                <table border = '1' id = 'writeForm'>
                    <thead>
                    </thead>
                    <tbody>
                        <tr>
                            <th>이름</th>
                            <td>
                                <input type = 'text' name = 'name' onChange= {onInput} ref = {nameRef} value = {name}></input>
                                <br/><div id = 'nameDiv'>{nameDiv}</div>
                            </td>
                        </tr>
                        <tr>
                            <th>아이디</th>
                            <td><input type = 'text' name = 'id' value = {ID} readOnly/></td>
                        </tr>
                        <tr>
                            <th>비밀번호</th>
                            <td><input type = 'password' name = 'password' value = {password}  onChange= {onInput} ref = {passwordRef}/>
                            <br/><div id = 'pwdDiv'>{passwordDiv}</div></td>
                        </tr>
                        <tr>
                            <td colSpan = '2' align = 'center'>
                                <button  id = 'send' onClick={clkSubmit}>수정</button>&emsp;
                                <input type = 'button' value = '삭제' id = 'deleteBtn' onClick={clkDel}/>&emsp;
                                <input type = 'button' value = '취소' id = 'resetBtn'onClick = {clkCancel}/>
                            </td>
                        </tr>
                    </tbody>
                    <tfoot>
                    </tfoot>
                </table>
            </form>
        </div>
    );
};

export default UpdateForm;