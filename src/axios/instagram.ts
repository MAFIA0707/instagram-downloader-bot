import axios from 'axios'
import config from '../config/config';


export async function instaSave(url: string | undefined){
  try {
    const options = {
      method: 'GET',
      url: 'https://instagram-post-and-reels-downloader.p.rapidapi.com/',
      params: {
        url
      },
      headers: {
        'X-RapidAPI-Key': config.XRapidAPIKey,
        'X-RapidAPI-Host': config.XRapidAPIHost
      }
    };

    const response = await axios.request(options);

    return response.data
  } catch (error) {
    console.log(error);
  }
}
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  // export async function instaSave(url: string | undefined) {
  //   try {
  //       const options = {
  //           method: 'GET',
  //           url: 'https://instagram-post-and-reels-downloader.p.rapidapi.com/insta/',
  //           params: {
  //               url,
  //           },
  //           headers: {
  //               'X-RapidAPI-Key': config.XRapidAPIKey,
  //               'X-RapidAPI-Host': config.XRapidAPIHost,
  //           },
  //       }
  
  //       const response = await axios.request(options)
  
  //       return response.data.detail.data.items[0]
  //   } catch (error) {
  //       throw error
  //   }
  // }