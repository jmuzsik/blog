// @flow
import React from 'react';
import Navbar from '../components/Navbar';
import Layout from '../components/Layout';
import Page from '../components/Page';
import List from '../components/List';
import Waves from '../components/Waves/Waves';
import { useSiteMetadata, useCategoriesList } from '../hooks';

/**
 * Randomly shuffle an array
 * https://stackoverflow.com/a/2450976/1293256
 * @param  {Array} array The array to shuffle
 * @return {String}      The first item in the shuffled array
 */
function shuffle(array) {
  let currentIndex = array.length;
  let temporaryValue;
  let randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

const CategoriesListTemplate = () => {
  const { title, subtitle } = useSiteMetadata();
  const categories = useCategoriesList();
  shuffle(categories);

  return (
    <React.Fragment>
      <Layout title={`Categories - ${title}`} description={subtitle}>
        <Navbar />
        <Page title="Categories">
          <List categories={categories} />
        </Page>
      </Layout>
      <Waves />
    </React.Fragment>
  );
};

export default CategoriesListTemplate;
