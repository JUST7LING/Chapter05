import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom';

const List = () => {
    const [list, setList] = useState([])
    const [pgArr, setPgArr] = useState([])
    const [currentPg, setCurrentPg] = useState([])
    const [want, setWant] = useState(0)
    const [words, setWords] = useState('')
    const [type, setType] = useState('name')
    const [didSearch, setDidSearch] = useState(false) // 검색을 실행한 상태인지 확인한다.

    useEffect(() => {

        didSearch === false ? 
                axios.post(`/user/getUserList`, null, {  // true
                    params: {
                        page: want
                    } 
                }) // 강사님은 get으로 쓰심. `/user/getUserList?pg=${pg}`
                .then(res => {
                    setList(res.data.content)
                    console.log(res.data.content)
                    console.log(res)
                    setPgArr(Array.from({length: res.data.totalPages}, (_, index) => index + 1))
                                                                    // item 대신 _를 써줌 
                    console.log(pgArr)
                    setCurrentPg(res.data.pageable.pageNumber+1)
                    console.log("current pg is " +currentPg)
                })
                .catch(e => console.log(e)) // ================= true
        :
                axios.post(`/user/searchList`, null, {   // false
                    params: {
                        select : type,
                        words: words,
                        page : want
                    } 
                }) // 강사님은 get으로 쓰심. `/user/getUserList?pg=${pg}`
                .then(res => {
                    setList(res.data.content)
                    console.log(res.data.content)
                    console.log(res)
                    setPgArr(Array.from({length: res.data.totalPages}, (_, index) => index + 1))
                                                                    // item 대신 _를 써줌 
                    console.log(pgArr)
                    setCurrentPg(res.data.pageable.pageNumber+1)
                    console.log("current pg is " +currentPg)
                })
                .catch(e => console.log(e)) // ============== false
    }, [want, didSearch, currentPg, pgArr, type, words])

    const settingWant = (e) => {
        var nextPg = e.target.text
        console.log('e.target.text = '+nextPg) // 테스트
        console.log(parseInt(nextPg)) // 테스트

        setWant(nextPg-1) // useState(0) 으로 잡았기 때문에 type은 기본 int일 것으로 추정.
        // parseInt를 하지 않고 -1해서 담아도 잘 들어간다.
        // 왜 -1을 해 주냐면, java에서는 0부터 시작하도록 되어 있기 때문임
        // (원래 그런 건 아니고, 바꿀 수 있지만 일단 지금 0으로 되어 있다)
        console.log('want value is '+want)
    }

    const inputType = (e) => {
        const {value} = e.target
        setType(value)
        console.log('function inputType'  + value)
    } 
    const inputWord = (e) => {
        const {value} = e.target
        setWords(value)
        value === '' ? setDidSearch(false) : setWords(value)
    }
    const doSearch = (e) => {
        console.log(type)
        console.log(words)
       setDidSearch(!didSearch) // didSearch(false) -> didSearch(true) --> useEffect 때문에 

    }


    return (
        <div>
          <table>
            <tbody>
			<tr >
				<th className= 'ths'>이름</th><th className = 'ths'>아이디</th><th className = 'ths'>비밀번호</th>
			</tr>
            {
                // list.content.product.map((content, index) => <tr key = {index}>
                //     <td>{content.name}</td>
                //     <td>{content.id}</td>
                //     <td>{content.pwd}</td>
                // </tr>)
                list.map(item => {
                    return(
                        <tr key = {item.id} className = 'trs'>
                            <td>{item.name}</td>
                            <td>
                                <Link className = 'why' to = {`/user/UpdateForm/${item.id}`}> {item.id} </Link>
                                                {/* 링크 걸어주고 나서는 반드시 App.js로 가서 Route를 걸자. */}
                                                    {/* localhost:3000으로 해버리면 파라메터를 받아올 수가 없어서 Controller에서 mapping 태우려고 8080 넣었다. */}
                            </td>
                            <td>{item.pwd}</td>
                        </tr>
                    )
                })

            }
            </tbody>
		    </table>

            <p style = {{width: '650px', textAlign: 'center'}}>
                {
                    pgArr.map(item => <span key = {item} onClick = {settingWant}>
                        <Link className = {item===currentPg ? 'currentPaging' : 'why'} >{item}</Link>
                        {/* 원래 to={`/user/list/${want}`} 가 있었는데 뺐더니까 잘 작동
                            getMapping으로 list를 주려면 파라메터 페이지 값을 꼭 줘야 하는데,
                            나는 useEffect에서 want(페이지 링크)값이 바뀔 때마다 post로 값을 받아오도록 함.
                            따라서 주소창 값이 바뀌지 않아도 getUserList로 지가 알아서 업데이트된 리스트를 뿌리게 된다.
                    
                        */}
                    </span>)
                }
            </p>
            <div style = {{width: 650, textAlign: 'center'}} id = 'searchZone'>
                <form>
                    <select name = 'select' id = 'select' onChange = {inputType}>
                        <option value = 'name'>이름</option>
                        <option value = 'id'>아이디</option>
                    </select>
                    <input type = 'text' id = 'words' name = 'words' placeholder = '여기에 검색어 입력' value = {words}  onChange = {inputWord}></input>
                    <button type = 'button' id = 'search' onClick = {doSearch}>검색하기</button>
                </form>
            </div>
        </div>
    );
};

export default List;