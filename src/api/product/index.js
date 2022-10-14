import axios from "axios";

export const getProductGredients = ({productId, memberId}) => {
  return axios.get('api/v2/productingredientgood', {
    params: {
      product_id: productId,
      member_id: memberId,
    },
    transformRequest: [(data, headers) => {
      delete headers.common.Authorization;
      return data 
   }],
  })
};