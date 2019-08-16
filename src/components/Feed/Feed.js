// @flow
import React from 'react';
import moment from 'moment';
import { Link } from 'gatsby';
import type { Edges } from '../../types';
import styles from './Feed.module.scss';

type Props = {
  edges: Edges
};

const Feed = ({ edges }: Props) => {
  return (
    <div className={styles['feed']}>
      {edges.map(edge => {
        const {
          node: {
            frontmatter: { description, category, title },
            fields: { slug }
          }
        } = edge;
        let finalDescription = description;
        if (description.length > 70) {
          finalDescription = `${description.slice(0, 70)}...`;
        }
        let finalTitle = title;
        if (title.length > 30) {
          finalTitle = `${title.slice(0, 30)}...`;
        }
        return (
          <Link className={styles['feed__item']} to={slug} key={slug}>
            <div className={styles['feed__item-container']}>
              <h2 className={styles['feed__item-title']}>{finalTitle}</h2>
              <span className={styles['feed__item-description']}>
                {finalDescription}
              </span>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default Feed;
