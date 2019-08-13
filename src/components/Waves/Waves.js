import React from 'react';
import styles from './Waves.module.scss';

export default function Waves() {
  return (
    <div className={styles['waves']}>
      <div className={styles['waves__radial']} />
      <img
        className={styles['waves__img']}
        src="/sunset.png"
        alt="sunset for decorative purposes"
      />
      <div className={styles['waves__clouds']}>
        <div className={styles['waves__x1']}>
          <div className={styles['waves__cloud']} />
        </div>
        <div className={styles['waves__x2']}>
          <div className={styles['waves__cloud']} />
        </div>
        <div className={styles['waves__x4']}>
          <div className={styles['waves__cloud']} />
        </div>
        <div className={styles['waves__x5']}>
          <div className={styles['waves__cloud']} />
        </div>
      </div>
      <svg
        className={styles['waves__svg']}
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 24 150 28"
        preserveAspectRatio="none"
      >
        <defs>
          <path
            id="gentle-wave"
            d="M-160 44c30 0 40-10 88-10s 40 10 88 10 40-10 88-10 40 10 88 10 v30h-352z"
          />
        </defs>
        <g className={styles['waves__parallax']}>
          <use xlinkHref="#gentle-wave" x="50" y="0" fill="#007594" />
          <use xlinkHref="#gentle-wave" x="50" y="2" fill="#006994" />
          <use xlinkHref="#gentle-wave" x="50" y="6" fill="#005d94" />
        </g>
      </svg>
    </div>
  );
}
