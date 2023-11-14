import React from 'react';
import { Link } from 'react-router-dom';

const index = () => {
    return (
        <div>
            <h3>메인화면</h3>
            <p>
                <Link to='/user/writeForm'>입력</Link>
            </p>
            <p>
                <Link to= '/user/list'>출력</Link>
            </p>
            <p>
                <Link to = '/user/UploadForm'>이미지 업로드</Link>
            </p>
            <p>
                <Link to = '/user/UploadList'>이미지 목록</Link>
            </p>
        </div>
    );
};

export default index;