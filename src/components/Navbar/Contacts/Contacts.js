// @flow
import React from 'react';
import { getContactHref, getIcon } from '../../../utils';
import Icon from '../../Icon';
import styles from './Contacts.module.scss';

type Props = {
  contacts: {
    [string]: string
  }
};

const Contacts = ({ contacts }: Props) => (
  <li className={styles['contacts']}>
    <ul className={styles['contacts__list']}>
      {Object.keys(contacts).map(name => (
        <li className={styles['contacts__list-item']} key={name}>
          <a
            className={styles['contacts__list-item-link']}
            href={getContactHref(name, contacts[name])}
            rel="noopener noreferrer"
            target="_blank"
          >
            <Icon icon={getIcon(name)} />
          </a>
        </li>
      ))}
      <li className={styles['contacts__list-item']}>
        <a
          className={`${styles['contacts__list-item-link']} ${
            styles['contacts__list-item-cv']
          }`}
          href="https://youthful-shirley-b0ee96.netlify.com/"
          rel="noopener noreferrer"
          target="_blank"
        >
          CV
        </a>
      </li>
    </ul>
  </li>
);

export default Contacts;
