const contactAddEndpoint = (client) => {
  const endpoint = 'contact_add'

  return {
    name: endpoint,
    post: data =>
      client.dispatch.post(`${endpoint}`, data)
        .then(res => res.data),
  }
}

module.exports = contactAddEndpoint
