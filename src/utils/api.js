export const apiConfig = {
  baseUrl: `http://80.87.107.15/api/v1`,
  events: `/events`,
  // defaultHeaders: {
  //   'Content-Type': 'application/json'
  // }
};

class Api {
  constructor({
    baseUrl,
    events,
    // , defaultHeaders
  }) {
    this._baseUrl = baseUrl;
    this._eventsEndpoint = events;
    // this._defaultHeaders = defaultHeaders;
  }

  _makeUrl(endpoint) {
    return `${this._baseUrl}${endpoint}`;
  }

  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getEvents() {
    const options = {
      method: 'GET',
      // headers: this._defaultHeaders
    };
    return fetch(this._makeUrl(this._eventsEndpoint), options).then(
      this._handleResponse
    );
  }
}

export const apiEvents = new Api(apiConfig);
