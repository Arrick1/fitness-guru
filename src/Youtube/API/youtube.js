import axios from 'axios'
const KEY = 'AIzaSyC7FQ8BFxEGMfsoEJX-qM4zvtuIYRGZBH0'

export default axios.create({
  baseURL: 'https://www.googleapis.com/youtube/v3',
  params: {
    part: 'snippet',
    maxResults: 3,
    key: KEY
  }
})