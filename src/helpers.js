import queryString from 'query-string';
import {
  oneLowerLetter,
  oneUpperLetter,
  oneNumbOrSpecial,
  minLength,
} from './store/constants';
import history from './store/history';
import { createNotification } from './store/actions/notifications_action';


export const validatePassword = value => oneLowerLetter.test(value || '')
  && oneUpperLetter.test(value || '')
  && oneNumbOrSpecial.test(value || '')
  && minLength.test(value || '');


export const getDaysEgo = days => (
  new Date(new Date().setDate(new Date().getDate() - days))
);

export const getDateStr = date => (
  `${date.getMonth() + 1}.${date.getDate()}.${date.getFullYear()}`
);


export const sortToUpper = (list, property) => list.sort((a, b) => a[property] - b[property]);

export const isLogin = () => {
  if (localStorage.getItem('fullName')) return true;
  else return false;
};

export const arrayToObj = (arr, key = 'id') => {
  if (!arr.length) return {};

  return arr.reduce((accumulator, currentValue, index, array) => {
    let id = currentValue[key];

    // ////////////////////////////////////////////////////////////
    // REMOVE THIS WITH REAL CONTRIBUTORS DATA
    // ////////////////////////////////////////////////////////////
    let a = 0;
    while (checkOnUniqueProperty(accumulator, id)) {
      a++;
      if (a > 100) return;

      id += Math.ceil(Math.random() * 10);
    }
    // ////////////////////////////////////////////////////////////

    accumulator[id] = currentValue;

    return accumulator;
  }, {});
};

export const checkOnUniqueProperty = (obj, propertyName) => (
  obj.hasOwnProperty(propertyName)
);

export const selectFirsts = (arr, iterations) => {
  const res = [];
  for (let i = 0; i < iterations && i < arr.length; i++) {
    res.push(arr[i]);
  }
  return res;
};



export const countArtifactsOfContributors = (contributors) => {
  let res = 0;
  const contributorKeys = Object.keys(contributors);
  for(let i = 0; i < contributorKeys.length; i++ ) {
    res += Object.keys(contributors[contributorKeys[i]].artifacts).length;
  }
  return res;
};


export const countChoosenArtifacts = (contributors, allArtifacts) => {
  for (let key in contributors) {
    for (let artifactKey in  contributors[key].artifacts) {
      if (contributors[key].artifacts[artifactKey].notActive) {
        --allArtifacts;
      }
    }
  }
  return allArtifacts;
};


export const countContributorArtifact = (contributor) => {
  const allArtifacts = Object.keys(contributor.artifacts).length;
  let choosenlength = allArtifacts;

  for (let artifactKey in contributor.artifacts) {
    if (contributor.artifacts[artifactKey].notActive) {
      --choosenlength;
    }
  }

  return {
    allArtifacts,
    choosenlength
  };
};


export const bubbleRadius = (value, beggestVal, maxSize = 80) => {
  return (value * maxSize) / beggestVal;
};


export const accessErrorHandler = (err) => {
  if (err && err.response && [401, 403].includes(err.response.status)) {
    localStorage.clear();
    window.location.replace('/login');
  } else {
    createNotification('error', 'Something was wrong');
  }
};

export const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'];

export const dataURItoBlob = (dataURI) => {
  // convert base64/URLEncoded data component to raw binary data held in a string
  let byteString;
  if (dataURI.split(',')[0].indexOf('base64') >= 0) {
    byteString = atob(dataURI.split(',')[1]);
  } else {
    byteString = unescape(dataURI.split(',')[1]);
  }
  // separate out the mime component
  const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
  // write the bytes of the string to a typed array
  const ia = new Uint8Array(byteString.length);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ia], { type: mimeString });
};

export const validImageTypes = ['image/jpg', 'image/jpeg', 'image/png', 'image/gif'];

export const getItemsList = (list = [], length) => {
  return [].concat(list)
    .splice(0, length);
};

export const redirectUrlHandler = (pathname) => {
  if (window.location.pathname === pathname && window.location.search) {
    const parsed = queryString.parse(window.location.search);
    if (parsed && parsed.redirect_url) {
      return parsed.redirect_url;
    }
  }
};

export const changeLocationPath = (url) => {
  history.push({
    pathname: '/artifacts/my-works/',
    search: url,
  });
};

export const initialSortHandler = (pathname) => {
  if (window.location.pathname === pathname && window.location.search) {
    return queryString.parse(window.location.search);
  }
};
