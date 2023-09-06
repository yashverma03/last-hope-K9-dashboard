import React from 'react';
import styles from './Footer.module.css';
import footerImage from '../../images/footerImage.jpeg';

const Footer = () => {
  return (
    <img src={footerImage} alt='footerImage' className={styles.footerImage} />
  );
};

export default Footer;
