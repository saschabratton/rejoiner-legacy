const leadEndpoint = (client) => {
  const endpoint = 'lead'

  const postEmail = (path, email) => {
    let data

    if (typeof email === 'string') {
      data = { email }
    } else {
      data = email
    }

    return client.dispatch.post(path, data).then(res => res.data)
  }

  return {
    name: endpoint,
    convert: data => client.dispatch.post(`${endpoint}/convert`, data)
      .then(res => res.data),
    cancel: email => postEmail(`${endpoint}/cancel`, email),
    optIn: email => postEmail(`${endpoint}/opt_in`, email),
    unsubscribe: email => postEmail(`${endpoint}/unsubscribe`, email),
  }
}

module.exports = leadEndpoint
