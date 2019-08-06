// @flow
import React from 'react';
import moment from 'moment';
import { Link } from 'gatsby';
import type { Edges } from '../../types';
import styles from './Feed.module.scss';

type Props = {
  edges: Edges
};

const Feed = ({ edges }: Props) => (
  <div className={styles['feed']}>
    {edges.map(edge => {
      const {
        node: {
          frontmatter: { description, date, title },
          fields: { slug }
        }
      } = edge;
      let finalDescription = description;
      if (description.length > 100) {
        finalDescription = description.slice(0, 100) + '...';
      }
      return (
        <div className={`${styles['feed__item']} feed`} key={slug}>
          <Link className={styles['feed__item-link']} to={slug}>
            <div className={styles['feed__container']}>
              <div className={styles['feed__item-meta']}>
                <time
                  className={styles['feed__item-meta-time']}
                  dateTime={moment(date).format('MMMM D, YYYY')}
                >
                  {moment(date).format('MMMM Do, YYYY')}
                </time>
                <span className={styles['feed__item-meta-divider']} />
              </div>
              <h2 className={styles['feed__item-title']}>{title}</h2>
              <span className={styles['feed__item-descrition']}>
                {finalDescription}
              </span>
            </div>
          </Link>
        </div>
      );
    })}
  </div>
);

export default Feed;
