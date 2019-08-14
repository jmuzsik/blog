// @flow
import React from 'react';
import { Link } from 'gatsby';
import Author from '../Author';
import Contacts from '../Contacts';
import Copyright from '../Copyright';
import styles from './Menu.module.scss';

type Props = {
  menu: {
    label: string,
    path: string
  }[]
};

const Menu = ({ menu, author, isIndex }: Props) => (
  <nav className={styles['menu']}>
    <ul className={styles['menu__list']}>
      <Author author={author} isIndex={isIndex} />
      <ul className={styles['menu__list-container']}>
        {menu.map((item, i) => (
          <li
            className={`${styles['menu__list-container-item']} ${
              styles[`menu__list-container-${i}`]
            }`}
            key={item.path}
          >
            <Link
              to={item.path}
              className={styles['menu__list-container-item-link']}
              activeClassName={styles['menu__list-container-item-link--active']}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
      <Contacts contacts={author.contacts} />
      {/* <Copyright copyright={copyright} /> */}
    </ul>
  </nav>
);

export default Menu;
