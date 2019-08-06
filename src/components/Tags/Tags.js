import React from 'react';
import { Link } from 'gatsby';
import kebabCase from 'lodash/kebabCase';
import styles from './Tags.module.scss';

export default function Tags({ tags }) {
  return (
    <ul className={styles['tags']}>
      {tags.map(tag => (
        <li key={tag.fieldValue}>
          <Link to={`/concept/${kebabCase(tag.fieldValue)}/`}>
            {tag.fieldValue} ({tag.totalCount})
          </Link>
        </li>
      ))}
    </ul>
  );
}
