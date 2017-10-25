const listsEndpoint = (client) => {
  const endpoint = 'lists'

  return {
    name: endpoint,
    get: () =>
      client.dispatch.get(endpoint)
        .then(res => res.data),
  }
}

module.exports = listsEndpoint
