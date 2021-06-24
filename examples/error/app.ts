
import axios, { AxiosError } from '../../src/index'

axios({
  method: 'get',
  url: '/error/get1',
}).then(res => {
  console.log('res :>> ', res);
}).catch(e => {
  console.log('404 :>> ', e);
})


axios({
  method: 'get',
  url: '/error/get',
}).then(res => {
  console.log('res :>> ', res);
}).catch(e => {
  console.log('e :>> ', e);
})

setTimeout(() => {
  axios({
    method: 'get',
    url: '/error/get',
  }).then(res => {
    console.log('res :>> ', res);
  }).catch(e => {
    console.log('e :>> ', e);
  })
}, 5000)



axios({
  method: 'get',
  url: '/error/timeout',
  timeout: 2000
}).then(res => {
  console.log('res :>> ', res);
}).catch(e => {
  console.log('timeout :>> ', e);
})

axios({
  method: 'get',
  url: '/error/timeout',
  timeout: 1000
}).then(res => {
  console.log('res :>> ', res);
}).catch((e: AxiosError) => {
  console.log('e.message :>> ', e.message);
  console.log('e.code :>> ', e.code);
  console.log('e.config :>> ', e.config);
})
