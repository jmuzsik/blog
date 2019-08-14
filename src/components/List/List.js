import React from 'react';
import kebabCase from 'lodash/kebabCase';
import { Link } from 'gatsby';
import styles from './List.module.scss';

function getImage(category) {
  const { edges } = category;
  let imageToGet;
  let altToGet;
  edges.forEach(({ node: { frontmatter: { image, alt } } }) => {
    if (!imageToGet && !altToGet && image && alt) {
      imageToGet = image;
      altToGet = alt;
    } 
  });
  return [imageToGet, altToGet];
}

const List = ({ categories }) => {
  return (
    <ul className={styles['list']}>
      {categories.map(category => {
        const [image, alt] = getImage(category);
        return (
          <li key={category.fieldValue} className={styles['list__item']}>
            <Link
              to={`/categories/${kebabCase(category.fieldValue)}/`}
              className={styles['list__item-link']}
            >
              {image && alt && (
                <img
                  src={image}
                  alt={alt}
                  className={styles['list__item-link-image']}
                />
              )}
              <span className={styles['list__item-link-text']}>
                {category.fieldValue} ({category.totalCount})
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};
export default List;
