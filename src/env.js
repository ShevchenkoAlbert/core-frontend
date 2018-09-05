const env = process.env.REACT_APP_ENV || 'local';
const local = {
  BASE_URL: 'http://localhost:3000/',
  PROJECT_MANAGMENT_SYSTEM: 'https://sys-dev.artifacts.ai/auth/',
  HEALTH_URL: 'http://localhost:8088/',
  API_URL: 'http://localhost:8088/v1/',
  ORCID_URL: 'https://orcid.org/oauth/authorize?client_id=APP-1YATUVGNC0LMXKY4&response_type=code&scope=/authenticate&redirect_uri=http://localhost:3000/',
};
const dev = {
  BASE_URL: 'https://core-dev.artifacts.ai/',
  PROJECT_MANAGMENT_SYSTEM: 'https://sys-dev.artifacts.ai/auth/',
  HEALTH_URL: 'https://api-core-dev.artifacts.ai/',
  API_URL: 'https://api-core-dev.artifacts.ai/v1/',
  ORCID_URL: 'https://orcid.org/oauth/authorize?client_id=APP-SGWDHXQXZ7CJKF5K&response_type=code&scope=/authenticate&redirect_uri=https://core-dev.artifacts.ai/',
};
const prod = {
  BASE_URL: 'https://core.artifacts.ai/',
  PROJECT_MANAGMENT_SYSTEM: 'https://sys.artifacts.ai/auth/',
  HEALTH_URL: 'https://api-core.artifacts.ai/',
  API_URL: 'https://api-core.artifacts.ai/v1/',
};

const stage = {
  BASE_URL: 'https://core-stage.artifacts.ai/',
  PROJECT_MANAGMENT_SYSTEM: 'https://sys-dev.artifacts.ai/auth/',
  HEALTH_URL: 'https://api-core-stage.artifacts.ai/',
  API_URL: 'https://api-core-stage.artifacts.ai/v1/',
  ORCID_URL: 'https://orcid.org/oauth/authorize?client_id=APP-JAHLSH1IF9DG0C8Y&response_type=code&scope=/authenticate&redirect_uri=https://core-stage.artifacts.ai/',
};

const getConfig = () => {
  if (env === 'local') {
    return local;
  }
  if (env === 'development') {
    return dev;
  }
  if (env === 'production') {
    return prod;
  }
  if (env === 'stage') {
    return stage;
  }
};

export const config = getConfig();
