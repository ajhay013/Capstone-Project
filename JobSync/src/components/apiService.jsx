import apiClient from './apiClient';

export const postToEndpoint = (endpoint, data, headers = {}) => {
  return apiClient.post(endpoint, data, { headers });
};
