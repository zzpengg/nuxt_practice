import axios from 'axios'
import Promise from 'bluebird'
import { map } from 'lodash'
import moment from 'moment'
const parseString = require('xml2js').parseString;

const defaultState = {
  info: {},
  list: []
}

export default {
  namespaced: true,
  state: defaultState,
  mutations: {
    __init (state, initState = defaultState) {
      state = Object.assign(state, initState)
    },
    setWeathers (state, weathers = defaultState.list) {
      state.list = weathers
    },
    setWeatherInfo (state, weather = defaultState.info) {
      state.info = weather
    }
  },
  actions: {
    getWeathers: async function ({ commit, state }) {
      const params = {
        dataid: 'F-D0047-091',
        authorizationkey: `${process.env.authorizationkey}`
      }
  
      // 依照 query 條件找出 driver list 資料
      let weathers = await axios({
        url: `${process.env.api}`,
        params,
        method: 'get'
      })
        .then((res) => {
          return Promise.resolve(res.data)
        })
        .catch((err) => {
          console.log(err)
        })
      weathers = await new Promise((resolve, reject) => {
        try {
          parseString(weathers, function(err, result) {
            let jsonResult = JSON.parse(JSON.stringify(result))
            resolve(jsonResult)
          })
        } catch (e) {
          reject(e)
        }
      })
      weathers = weathers.cwbopendata.dataset
      let weather = weathers[0].datasetInfo[0];
      let weatherInfo = {
        title: weather.datasetDescription[0],
        lang: weather.datasetLanguage[0],
        updatedAt: weather.update[0]
      }
      weathers = weathers[0].locations[0].location;
      let formatedWeathers = [];
      formatedWeathers = map(weathers, function (weather) {
        let weatherElements = [];
        for (let ele of weather.weatherElement) {
          if (ele.elementName[0] != 'T') continue
          let time = [];
          for (let t of ele.time) {
            time.push({
              startTime: t.startTime[0],
              endTime: t.endTime[0],
              value: t.elementValue[0].value[0]
            })
          }
          weatherElements.push({
            elementName: ele.elementName[0],
            description: ele.description[0],
            time
          })
        }
        return {
          locationName: weather.locationName[0],
          weatherElements
        }
      })
  
      // 把資料 commit 到 store
      commit('setWeatherInfo', weatherInfo)
      commit('setWeathers', formatedWeathers)
    }
  }
}
