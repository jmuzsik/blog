// @flow
import React from 'react';
import Layout from '../components/Layout';
import Navbar from '../components/Navbar';
import Page from '../components/Page';
import Tags from '../components/Tags/Tags';
import { useSiteMetadata, useTagsList } from '../hooks';

const TagsListTemplate = () => {
  const { title, subtitle } = useSiteMetadata();
  const tags = useTagsList();

  return (
    <React.Fragment>
      <Layout title={`Tags - ${title}`} description={subtitle}>
        <Navbar />
        <Page title="Concepts">
          <Tags tags={tags} />
        </Page>
      </Layout>
    </React.Fragment>
  );
};

export default TagsListTemplate;
