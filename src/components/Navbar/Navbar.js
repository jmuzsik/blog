// @flow
import React from 'react';
import Menu from './Menu';
import styles from './Navbar.module.scss';
import { useSiteMetadata } from '../../hooks';

type Props = {
  isIndex?: boolean
};

const Navbar = ({ isIndex }: Props) => {
  const { author, copyright, menu } = useSiteMetadata();
  console.log(menu);
  return (
    <div className={styles['navbar']}>
      <div className={styles['navbar__inner']}>
        <Menu
          menu={menu}
          author={author}
          isIndex={isIndex}
          copyright={copyright}
        />
      </div>
    </div>
  );
};

export default Navbar;
