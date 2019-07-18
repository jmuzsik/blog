// @flow
import React from 'react';
import Layout from '../components/Layout';
import Sidebar from '../components/Sidebar';
import Page from '../components/Page';
import Waves from '../components/Waves/Waves';
import Tags from '../components/Tags/Tags';
import { useSiteMetadata, useTagsList } from '../hooks';

const TagsListTemplate = () => {
  const { title, subtitle } = useSiteMetadata();
  const tags = useTagsList();

  return (
    <React.Fragment className="tags">
      <Layout title={`Tags - ${title}`} description={subtitle}>
        <Sidebar />
        <Page title="Tags">
          <Tags tags={tags} />
        </Page>
      </Layout>
      <Waves />
    </React.Fragment>
  );
};

export default TagsListTemplate;
