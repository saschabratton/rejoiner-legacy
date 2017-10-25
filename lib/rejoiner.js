const axios = require('axios')
const crypto = require('crypto')
const fs = require('graceful-fs')
const path = require('path')
const { merge } = require('lodash')

const {
  VERSION,
  REJOINER_API_KEY,
  REJOINER_API_SECRET,
  REJOINER_SITE_ID,
} = require('./config')

function Rejoiner(options) {
  const opts = merge({}, options)

  this.siteId = opts.siteId || REJOINER_SITE_ID
  this.apiKey = opts.apiKey || REJOINER_API_KEY
  this.apiSecret = opts.apiSecret || REJOINER_API_SECRET

  this.sign = ({ httpVerb, requestPath, requestBody }) => {
    const req = [httpVerb, requestPath, requestBody].join('\n')
    return crypto.createHmac('sha1', this.apiSecret).update(req).digest('base64')
  }

  this.dispatch = axios.create({
    baseURL: `https://app.rejoiner.com/api/1.0/site/${this.siteId}`,
    headers: {
      'User-Agent': `rejoiner-node/v${VERSION}`,
    },
  })

  this.dispatch.interceptors.request.use((conf) => {
    const signedReq = this.sign({
      httpVerb: conf.method.toUpperCase(),
      requestPath: conf.url.replace('https://app.rejoiner.com', ''),
      requestBody: JSON.stringify(conf.data),
    })

    const withSignedReqHeader = merge({}, conf, {
      headers: {
        Authorization: `Rejoiner ${this.apiKey}:${signedReq}`,
      },
    })

    return withSignedReqHeader
  })

  fs.readdirSync(path.join(__dirname, 'endpoints'))
    .filter(file => file.indexOf('.') !== 0)
    .forEach((file) => {
      // eslint-disable-next-line global-require, import/no-dynamic-require
      const endpoint = require(path.join(__dirname, 'endpoints', file))(this)
      this[endpoint.name] = endpoint
    })
}

module.exports = Rejoiner
