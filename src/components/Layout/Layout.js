// @flow
import React from 'react';
import Helmet from 'react-helmet';
import Waves from '../Waves/Waves';
import type { Node as ReactNode } from 'react';
import styles from './Layout.module.scss';

type Props = {
  children: ReactNode,
  title: string,
  description?: string
};

const Layout = ({ children, title, description, type }: Props) => {
  const typeOfPost = type === 'post';
  console.log(typeOfPost)
  return (
    <div className={`${styles.layout} ${typeOfPost ? styles.post : ''}`}>
      <Helmet>
        <html lang="en" />
        <title lang="en">{title}</title>
        <meta name="description" content={description} />
        <meta property="og:site_name" content={title} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={title} />
      </Helmet>
      {!typeOfPost ? (
        <React.Fragment>
          <div className={styles['layout__radial']} />
          <img
            className={styles['layout__img']}
            src="/sunset.png"
            alt="sunset for decorative purposes"
          />
          <div className={styles['layout__container']}>
            <div
              className={`${styles['layout__container-cloud']} ${
                styles['layout__container-cloud-back']
              }`}
            />
            <svg width="0" height="0">
              <filter id="filter-back">
                <feTurbulence
                  type="fractalNoise"
                  baseFrequency="0.012"
                  numOctaves="4"
                  seed="0"
                />
                <feDisplacementMap in="SourceGraphic" scale="170" />
              </filter>
            </svg>
          </div>
          {children}
          <Waves />
        </React.Fragment>
      ) : (
        <React.Fragment>{children}</React.Fragment>
      )}
    </div>
  );
};

export default Layout;
