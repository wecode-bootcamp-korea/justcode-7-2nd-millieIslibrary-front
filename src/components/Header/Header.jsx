import React, { useContext, useState } from 'react';
import { Button, Nav } from 'react-bootstrap';
import { FaRegBell } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './Header.scss';

import { BsFillSunFill } from 'react-icons/bs';
import { FaRegMoon } from 'react-icons/fa';
import { ThemeContext } from '../../pages/Router.js';

function Header() {
  const [tab, setTab] = useState(0);

  const { theme } = useContext(ThemeContext);
  const { toggleTheme } = useContext(ThemeContext);

  return (
    <Nav>
      <div className="head">
        <div className="head-left">
          <img src="/logo2.png" alt="logo" width={50} />
          <Nav.Item className="head-tab">
            <Link
              to="/home"
              className="head-tab__link"
              onClick={() => setTab(0)}
            >
              {tab == 0 ? (
                <div style={{ fontWeight: 800 }}>투데이</div>
              ) : (
                <div>투데이</div>
              )}
            </Link>
          </Nav.Item>
          <Nav.Item className="head-tab">
            <Link
              to="/search"
              className="head-tab__link"
              onClick={() => setTab(1)}
            >
              {tab == 1 ? (
                <div style={{ fontWeight: 800 }}>검색</div>
              ) : (
                <div>검색</div>
              )}
            </Link>
          </Nav.Item>
          <Nav.Item className="head-tab">
            <Link
              to="/myshelf"
              className="head-tab__link"
              onClick={() => setTab(2)}
            >
              {tab == 2 ? (
                <div style={{ fontWeight: 800 }}>내서재</div>
              ) : (
                <div>내서재</div>
              )}
            </Link>
          </Nav.Item>
          <Nav.Item className="head-tab">
            <Nav.Link className="head-tab__link">
              <div>관리</div>
            </Nav.Link>
          </Nav.Item>
        </div>

        <div className="head-right">
          <div onClick={toggleTheme}>
            {theme === 'light' ? <BsFillSunFill /> : <FaRegMoon />}
          </div>
          <FaRegBell className="head-right__icon" />
          <Link to="/">
            <Button
              onClick={() => window.localStorage.setItem('token', '')}
              variant="dark"
            >
              로그아웃
            </Button>
          </Link>
        </div>
      </div>
    </Nav>
  );
}

export default Header;
