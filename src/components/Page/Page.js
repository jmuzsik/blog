import React, { useRef, useEffect, useState } from 'react';
import styles from './Page.module.scss';

type Props = {
  title?: string,
  children: React.Node
};

function createFancyText(title, init) {
  if (init) return <h1 className={styles['page__title']}>Welcome!</h1>;
  const welcomes = title.map(welcome => (
    <span key={welcome} className={styles['page__title']}>
      {welcome}
    </span>
  ));
  return (
    <div className={styles['page__fancyText']}>
      <div className={styles['page__fancyText-sentence']}>
        <div className={styles['page__fancyText-sentence-words']}>
          {welcomes}
        </div>
      </div>
    </div>
  );
}

const Page = ({ title, children }: Props) => {
  const pageRef = useRef();
  const [fancyText, setFancyText] = useState(createFancyText(title, true));

  useEffect(() => {
    setTimeout(() => {
      if (title && Array.isArray(title)) {
        setFancyText(createFancyText(title, false));
      }
    }, 8000);
  }, []);
  return (
    <div ref={pageRef} className={styles['page']}>
      <div className={styles['page__inner']}>
        {title && Array.isArray(title) ? (
          fancyText
        ) : (
          <h1 className={styles['page__title']}>{title}</h1>
        )}
        <div className={styles['page__body']}>{children}</div>
      </div>
    </div>
  );
};

export default Page;
