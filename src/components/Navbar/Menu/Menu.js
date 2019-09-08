// @flow
import React, { useEffect } from 'react';
import { Link } from 'gatsby';
import Author from '../Author';
import Contacts from '../Contacts';
import styles from './Menu.module.scss';

type Props = {
  menu: {
    label: string,
    path: string
  }[]
};

// https://stackoverflow.com/questions/118241/calculate-text-width-with-javascript
function getTextWidth(text) {
  const canvas =
    getTextWidth.canvas ||
    (getTextWidth.canvas = document.createElement('canvas'));
  const context = canvas.getContext('2d');
  context.font =
    '1rem -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif';
  return context.measureText(text).width;
}

const Menu = ({ menu, author, isIndex }: Props) => {

  useEffect(() => {
    const containerElements = document.getElementsByTagName('ul');
    // Second list is the one I want.
    // This is a hack but it will continue to work as long as I do not add another ul.
    const list = containerElements[1];
    // Using native document fetches as podcasts tell me they are faster.
    const listItems = Array.from(list.getElementsByTagName('li'));
    const listItemBorders = Array.from(list.getElementsByTagName('div'));
    const listItemsText = listItems.map(item => item.textContent);
    listItemsText.forEach((text, i) => {
      const border = listItemBorders[i];
      border.style.width = `${getTextWidth(text)}px`;
    });
  }, []);
  
  return (
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
                activeClassName={
                  styles['menu__list-container-item-link--active']
                }
              >
                {item.label}
              </Link>
              <span className={styles['menu__list-container-item-container']}>
                <div
                  className={
                    styles['menu__list-container-item-container-border']
                  }
                />
              </span>
            </li>
          ))}
        </ul>
        <Contacts contacts={author.contacts} />
        {/* <Copyright copyright={copyright} /> */}
      </ul>
    </nav>
  );
};

export default Menu;
