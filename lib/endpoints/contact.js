const contactAddEndpoint = (client) => {
  const endpoint = 'contact'

  return {
    name: endpoint,
    add: data => client.dispatch.post(`${endpoint}_add`, data)
      .then(res => res.data),
  }
}

module.exports = contactAddEndpoint
