export const apiConfig = {
  baseUrl: `http://80.87.107.15/api/v1`,
  events: `/events/`,
  edit: `/users-events/`,
  topics: `/topics/`,
  tags: `/tags/`,
  sities: `/sities/`,
  userEvents: `/users-events/`,
  search: `/events/?q=`,
  // defaultHeaders: {
  //   'Content-Type': 'application/json'
  // }
};

class Api {
  constructor({
    baseUrl,
    events,
    edit,
    topics,
    tags,
    sities,
    userEvents,
    headers,
    search,
    // , defaultHeaders
  }) {
    this._baseUrl = baseUrl;
    this._eventsEndpoint = events;
    this._editEventsEndpoint = edit;
    this._topicsEndpoint = topics;
    this._tagsEndpoint = tags;
    this._sitiesEndpoint = sities;
    this._userEvents = userEvents;
    this._headers = headers;
    this._searchEndpoint = search;
    // this._defaultHeaders = defaultHeaders;
  }

  _makeUrl(endpoint) {
    return `${this._baseUrl}${endpoint}`;
  }

  // _handleResponse(res) {
  //   if (res.ok) {
  //     return res.json();
  //   }
  //   return Promise.reject(`Ошибка: ${res.status}`);
  // }
  _handleResponse(res) {
    if (res.ok) {
      return res.json().then((data) => ({ data }));
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

  getSelectedEvent(id) {
    const options = {
      method: 'GET',
    };
    return fetch(this._makeUrl(this._eventsEndpoint) + `${id}/`, options).then(
      this._handleResponse
    );
  }

  getUserEvents() {
    const options = {
      method: 'GET',
      headers: this.getHeaders(),
    };
    return fetch(this._makeUrl(this._userEvents), options).then(
      this._handleResponse
    );
  }

  postNewEvent(data) {
    const options = {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    };
    return fetch(this._makeUrl(this._eventsEndpoint), options).then(
      this._handleResponse
    );
  }

  editEvent(id, data) {
    const options = {
      method: 'PATCH',
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    };
    return fetch(
      this._makeUrl(this._editEventsEndpoint) + `${id}/`,
      options
    ).then(this._handleResponse);
  }

  deleteEvent(data) {
    const options = {
      method: 'DELETE',
      headers: this.getHeaders(),
      body: JSON.stringify(data),
    };
    return fetch(
      this._makeUrl(this._userEvents) + `batch_delete/`,
      options
    ).then(this._handleResponse);
  }

  getTopics() {
    const options = {
      method: 'GET',
    };
    return fetch(this._makeUrl(this._topicsEndpoint), options).then(
      this._handleResponse
    );
  }

  getTags() {
    const options = {
      method: 'GET',
    };
    return fetch(this._makeUrl(this._tagsEndpoint), options).then(
      this._handleResponse
    );
  }

  getSities() {
    const options = {
      method: 'GET',
    };
    return fetch(this._makeUrl(this._sitiesEndpoint), options).then(
      this._handleResponse
    );
  }

  getHeaders() {
    const token = localStorage.getItem('jwt');
    return {
      ...this._headers,
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    };
  }

  searchRequest(request) {
    const options = {
      method: 'GET',
    };
    return fetch(
      this._makeUrl(this._searchEndpoint) + `${request}`,
      options
    ).then(this._handleResponse);
  }
}

export const apiEvents = new Api(apiConfig);
