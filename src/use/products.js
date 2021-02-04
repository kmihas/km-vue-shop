import axios from 'axios'

export async function getProducts() {
  const url = process.env.VUE_APP_BASE_URL_PRODUCTS

  try {
    const res = await axios.get(url)
    return res.data
  } catch (e) {

  }


}