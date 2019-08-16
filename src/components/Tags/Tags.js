import React, { useState } from 'react';
import { navigate } from 'gatsby';
import kebabCase from 'lodash/kebabCase';
import styles from './Tags.module.scss';

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

export default function Tags({ tags }) {
  const [currentSelection, changeCurrentSelection] = useState(null);
  function viewEmClicked() {
    if (currentSelection) {
      navigate(`/concept/${kebabCase(currentSelection)}/`);
    }
  }
  shuffle(tags);

  return (
    <div className={styles['tags']}>
      <select
        className={styles['tags__select']}
        onChange={ev => changeCurrentSelection(ev.target.value)}
      >
        <option value="" className={styles['tags__select-option']}>
          --Please choose an option--
        </option>
        {tags.map(tag => (
          // <span key={tag.fieldValue} className={styles['tags__text']}>
          <option
            key={tag.fieldValue}
            value={tag.fieldValue}
            className={styles['tags__select-option']}
          >
            {/* <Link
              to={`/concept/${kebabCase(tag.fieldValue)}/`}
              className={styles['tags__text-link']}
            > */}
            {tag.fieldValue} ({tag.totalCount}){/* </Link> */}
          </option>
          // </span>
        ))}
      </select>
      <button
        className={styles['tags__button']}
        type="button"
        name="button"
        onClick={viewEmClicked}
      >
        View 'em
      </button>
    </div>
  );
}
