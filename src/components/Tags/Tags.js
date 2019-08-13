import React from 'react';
import { Link } from 'gatsby';
import kebabCase from 'lodash/kebabCase';
import styles from './Tags.module.scss';

export default function Tags({ tags }) {
  return (
    <div className={styles['tags']}>
      {tags.map(tag => (
        <span key={tag.fieldValue} className={styles['tags__text']}>
          <Link to={`/concept/${kebabCase(tag.fieldValue)}/`} className={styles['tags__text-link']}>
            {tag.fieldValue} ({tag.totalCount})
          </Link>
        </span>
      ))}
    </div>
  );
}
