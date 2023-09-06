import React from 'react';
import styles from './Header.module.css';
import headerImage from '../../images/headerImage.jpeg';

const Header = () => {
  return (
    <img src={headerImage} alt='headerImage' className={styles.headerImage} />
  );
};

export default Header;
