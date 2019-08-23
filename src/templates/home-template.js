// @flow
import React from 'react';

import Navbar from '../components/Navbar';
import Layout from '../components/Layout';
import Page from '../components/Page';

import styles from './home-template.module.scss';

const Home = () => {
  return (
    <Layout title="Welcome to Mr. Muzsik's website">
      <Navbar />
      <Page
        title={[
          '欢迎!',
          '¡Bienvenido!',
          'Willkommen!',
          'Добро пожаловать!',
          'Bienvenue!',
          'Benvenuto!',
          'Bem-vindo!',
          'Välkommen!',
          'Hoş geldin!',
          'ようこそ!',
          'Witaj!',
          'Welcome!'
        ]}
      >
        <svg
          className={styles['heart-loader']}
          xmlnsrdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
          xmlnssvg="http://www.w3.org/2000/svg"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 90 90"
          version="1.1"
        >
          <g className={styles['heart-loader__group']}>
            <path
              className={styles['heart-loader__square']}
              strokeWidth="1"
              fill="none"
              d="M0,30 0,90 60,90 60,30z"
            />
            <path
              className={`${styles['heart-loader__circle']} ${
                styles['heart-loader__m--left']
              }`}
              strokeWidth="1"
              fill="none"
              d="M60,60 a30,30 0 0,1 -60,0 a30,30 0 0,1 60,0"
            />
            <path
              className={`${styles['heart-loader__circle']} ${
                styles['heart-loader__m--right']
              }`}
              strokeWidth="1"
              fill="none"
              d="M60,60 a30,30 0 0,1 -60,0 a30,30 0 0,1 60,0"
            />
            <path
              className={styles['heart-loader__heartPath']}
              strokeWidth="2"
              d="M60,30 a30,30 0 0,1 0,60 L0,90 0,30 a30,30 0 0,1 60,0"
            />
          </g>
        </svg>
      </Page>
    </Layout>
  );
};

export default Home;
