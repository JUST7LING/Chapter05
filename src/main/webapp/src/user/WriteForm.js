import React, { useState, useRef } from 'react';
import styles from '../css/WriteForm.module.css';
import axios from 'axios';
import image from '../image/whatshold.gif';
import { Link, useNavigate } from 'react-router-dom';

const WriteForm = () => {

    const [userDTO, setUserDTO] = useState({
        name: '',
        id: '',
        password: ''
    });

    const [idDiv, setIdDiv] = useState('')
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

    const onIsExistId = () => {
        console.log('is exist')
        // 아이디 중복체크 함수        // proxy modified
        axios.get(`/user/isExistId?id=${id}`) // 시도
             .then(res => {
                setIdDiv(res.data === 'non_exist' ? '사용 가능' : '사용 불가능')
             }) // 성공 시
             .catch(error => console.log(error)) // 실패 시
    }

    const nameRef = useRef()
    const idRef = useRef()
    const passwordRef = useRef()

    const clkSubmit = (e) => {
        e.preventDefault()
        setNameDiv('')
        setIdDiv(
            idDiv === '사용 가능' ? '사용 가능' : idDiv === '사용 불가능' ? '아이디를 다시 입력해 주세요' : ''
        )
        setPasswordDiv('')
        let sw = 1

        if(!name){
            setNameDiv('이름을 입력하세요')
            nameRef.current.focus()
            sw = 0
        }
        if(!id){
            setIdDiv('아이디를 입력하세요')
            idRef.current.focus()
            sw = 0 
        }
        if(!password){
            setPasswordDiv('비밀번호를 입력하세요')
            passwordRef.current.focus()
            sw =  0
        }
        if(sw === 1 && idDiv === '사용 가능'){
            console.log('간다!')
            
            const params = {name: name, id: id, pwd: password}
                        // proxy modified
            axios.post('/user/write', null, { // 두 번째 인자가 뭐지? 
               params: {
                    name: name,
                    id: id,
                    pwd: password
                } 
            }).then(
                alert(`회원가입이 완료되었습니다. ${name}님의 가입을 환영합니다.`),
                navigate('/user/list') // get으로 갈 경우 파라메터를 여기 같이 넘겨 줘야 한다.

            ).catch( error => console.log(error))
           /*
           // 두 번째 방법
           axios.post('http://localhost:8080/user/write', null, {
                params : {
                    userDTO // 로 보내도 되는데, 지금은 Spring에 pwd로 되어 있고
                    // 여기에서는 password로 되어 있기 때문에 사용하면 안 될 것 같다. 
                }
           }) */
        }
    }
    const clkCancel = (e) => {
        e.preventDefault() // submit이 안 되게 막는다. 
        // 혹은 위 행 대신 button type = 'button'으로 잡아도 될 것 같다. 
        // 현재 button tag의 type은 지정되지 않은 상태(submit)다.
        setUserDTO({
            name: '',
            id: '',
            password: ''

        }) // 입력값

        // set ~~ Div : validation 후 알림 메시지 출력하는 부분
        setIdDiv('')
        setPasswordDiv('')
        setNameDiv('') // 초기화
    }

    return (
        <div>

            <h3>
                <Link to = '/'><img src = {image}  alt = '이미지가 없당' width = '150' /></Link>
            </h3>
            <form>
                <table>
                    <tbody>
                    <tr>
                        <th>
                            이름
                        </th>
                        <td>
                            <input type="text" name="name" value={name} id="name" onChange={onInput} ref = {nameRef}/>
                            <div id="nameDiv">{nameDiv}</div>
                        </td>
                    </tr>
                    <tr>
                        <th>
                            아이디
                        </th>
                        <td>
                            <input type="text" name="id" value={id} id="id" onChange={onInput} onBlur = {onIsExistId} ref = {idRef}/>
                            <div id="idDiv" style = {{color: idDiv === '사용 불가능' ? 'red' : 'green'}}>{idDiv}</div>
                        </td>
                    </tr>
                    <tr>
                        <th>
                            비밀번호
                        </th>
                        <td>
                            <input type="password" name="password" value={password} id="password" onChange={onInput} ref = {passwordRef}/>
                            <div id="passwordDiv">{passwordDiv}</div>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={2} align='center'>
                            <button onClick = {clkSubmit}>등록</button>
                            <button onClick = {clkCancel}>취소</button>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </form>
        </div>
    );
};

export default WriteForm;