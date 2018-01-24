import axios from 'axios'
import config from '../config'

export default {
  request (method, uri, data = null) {
    if (!method) {
      console.error('API function call requires method argument')
      return
    }

    if (!uri) {
      console.error('API function call requires uri argument')
      return
    }

    var url = config.serverURI + uri
    console.log('url is' + url)
    console.log('data is ' + JSON.stringify(data))
    return axios({method, url, data})
  },

  requestForm (method, uri, data = null) {
    let config1 = {
      headers: {'Content-Type': 'multipart/form-data'}
    }
    if (!method) {
      console.error('API function call requires method argument')
      return
    }

    if (!uri) {
      console.error('API function call requires uri argument')
      return
    }

    var url = config.serverURI + uri
    // var url = 'http://127.0.0.1:81/nanjingyouzi/TingtingBackend/1.0.0/' + uri
    console.log('config.serverURI is' + config.serverURI)
    console.log('url is' + url)
    console.log('data is ' + JSON.stringify(data))
    return axios.post(url, data, config1)
  }

}
