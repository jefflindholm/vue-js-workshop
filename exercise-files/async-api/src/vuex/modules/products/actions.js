import uuid from 'uuid';
import {
  FETCH_PRODUCTS,
  DELETE_PRODUCT,
  CREATE_PRODUCT,
  UPDATE_PRODUCT
} from './mutation-types';

const BASE = 'http://localhost:3000';
export function fetchProducts({ commit }) {
  return fetch(`${BASE}/products`)
    .then(res => res.json())
    .then(json => commit(FETCH_PRODUCTS, json.data));
}
export function createProduct({ commit }, product) {
  return fetch(`${BASE}/products`, {
    body: JSON.stringify(product),
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then(res => res.json())
  .then(json => commit(CREATE_PRODUCT, json.data))
  .catch(err => console.log(err))
}
export function updateProduct({ commit }, product) {
  return fetch(`${BASE}/products/${product.id}`, {
    body: JSON.stringify(product),
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then(res => res.json())
  .then(json => commit(UPDATE_PRODUCT, json.data));
}
export function deleteProduct({ commit }, productId) {
  return fetch(`${BASE}/products/${productId}`, {
    method: 'DELETE',
  })
  .then(() => commit(DELETE_PRODUCT, productId));
}

export function saveProduct({ commit, state }, product) {
  const index = state.all.findIndex((p) => p.id === product.id);

  // update product if it exists or create it if it doesn't
  if (index !== -1) {
    return updateProduct({ commit }, product);
  } else {
    product.id = uuid.v4();
    return createProduct({ commit }, product);
  }
}
