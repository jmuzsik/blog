// @flow
import React from 'react';

import Navbar from '../components/Navbar';
import Layout from '../components/Layout';
import Page from '../components/Page';
import { useSiteMetadata } from '../hooks';

const NotFoundTemplate = () => {
  const { title, subtitle } = useSiteMetadata();
  return (
    <Layout title={`Not Found - ${title}`} description={subtitle}>
      <Navbar />
      <Page title="WHAT YOU DOING HERE?">
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <img
            src="/media/404-cat-error.gif"
            alt="404 cat error cat on skateboarding doing it's thing"
          />
        </div>
      </Page>
    </Layout>
  );
};

export default NotFoundTemplate;
