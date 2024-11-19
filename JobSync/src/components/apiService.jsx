import apiClient from './apiClient';

export const postToEndpoint = (endpoint, data, headers = {}) => {
  return apiClient.post(endpoint, data, { headers });
};

export const getFromEndpoint = (endpoint, params = {}, headers = {}) => {
  return apiClient.get(endpoint, { params, headers });
};
