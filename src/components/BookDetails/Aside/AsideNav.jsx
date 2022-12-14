import React, { useEffect, useState } from 'react';
import css from './AsideNav.module.scss';
import { StarFill, Star, Bookshelf, Share } from 'react-bootstrap-icons';
import { useParams } from 'react-router-dom';
import { SERVER_URL } from '../../../config';

function AsideNav() {
  const params = useParams();
  const [bookData, setBookData] = useState([]);
  const [likeCheck, setLikeCheck] = useState(false);

  const copyUrl = () => {
    let url = '';
    let textarea = document.createElement('textarea');
    document.body.appendChild(textarea);
    url = window.document.location.href;
    textarea.value = url;
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    alert('복사가 완료되었습니다.');
  };

  //현재 페이지 데이터
  useEffect(() => {
    fetch(`${SERVER_URL}/book-detail/${params.id}`, {
      headers: {
        'Content-Type': 'application/json',
        authorization: localStorage.getItem('token'),
      },
    })
      .then(res => res.json())
      .then(data => {
        setBookData(data.bookResult);
      });
  }, []);

  //찜 데이터 보내기
  const onFavorite = () => {
    fetch(`${SERVER_URL}/add-list/favorite`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: localStorage.getItem('token'),
      },
      body: JSON.stringify({
        books_id: bookData[0].id,
      }),
    })
      .then(res => res.json())
      .then(res => {
        fetch(`${SERVER_URL}/book-detail/${params.id}/check-list`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            authorization: localStorage.getItem('token'),
          },
        })
          .then(res => res.json())
          .then(data => {
            setLikeCheck(data);
          });
      });
  };

  //찜 데이터 삭제
  const delFavorite = () => {
    fetch(`${SERVER_URL}/add-list/favorite`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        authorization: localStorage.getItem('token'),
      },
      body: JSON.stringify({
        books_id: bookData[0].id,
      }),
    })
      .then(res => res.json())
      .then(res => {
        fetch(`${SERVER_URL}/book-detail/${params.id}/check-list`, {
          headers: {
            'Content-Type': 'application/json',
            authorization: localStorage.getItem('token'),
          },
        })
          .then(res => res.json())
          .then(data => {
            setLikeCheck(data);
          });
      });
  };

  //찜 체크 데이터 가져오기
  useEffect(() => {
    fetch(`${SERVER_URL}/book-detail/${params.id}/check-list`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: localStorage.getItem('token'),
      },
    })
      .then(res => res.json())
      .then(data => {
        setLikeCheck(data);
      });
  }, []);

  const onLike = e => {
    if (likeCheck.check_favorite === true) {
      window.confirm('찜을 취소했습니다.');
      delFavorite();
    } else {
      window.confirm('My Favorite 책장에 담았습니다.');
      onFavorite();
    }
  };

  //내 서재에 데이터 보내기
  const onMyShelf = () => {
    fetch(`${SERVER_URL}/add-list/bookshelf`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: localStorage.getItem('token'),
      },
      body: JSON.stringify({
        books_id: bookData[0].id,
      }),
    });
  };

  return (
    <div className={css.asideContainer}>
      <div className={css.asideContent}>
        <button
          onClick={() => {
            if (window.confirm('내서재에 담았습니다.')) {
              onMyShelf();
            }
          }}
        >
          <a>
            <Bookshelf />
          </a>
          내서재에 담기
        </button>
        <button onClick={onLike}>
          {likeCheck.check_favorite === true ? (
            <a className={css.star}>
              <StarFill />
            </a>
          ) : (
            <a className={css.star}>
              <Star />
            </a>
          )}
          My Favorite
        </button>
        <button
          onClick={() => {
            copyUrl();
          }}
        >
          <a>
            <Share />
          </a>
          링크 복사
        </button>
        <button className={css.immediatelyBtn}>바로 읽기</button>
      </div>
    </div>
  );
}

export default AsideNav;
