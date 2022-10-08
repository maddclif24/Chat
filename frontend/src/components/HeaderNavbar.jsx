import React from 'react';
import { Button, Navbar as BootstrapNavbar } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useAuth from '../hooks/index.jsx';

const Navbar = () => {
  const { logOut, user } = useAuth();
  const { t } = useTranslation();
  const location = useLocation();
  return (
    <BootstrapNavbar bg="white" expand="lg" className="shadow-sm">
      <div className="container">
        <BootstrapNavbar.Brand as={Link} to="/">Hexlet Chat</BootstrapNavbar.Brand>
        { user && location.pathname === '/' ? <Button onClick={logOut}>{t('chatPage.log_out')}</Button> : null }
      </div>
    </BootstrapNavbar>
  );
};

export default Navbar;
