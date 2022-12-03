// This controller is used to update the query params in the URL
// <form data-controller="update-query-params" data-action="submit->update-query-params#submit" data-update-query-params-field-ids-value='["#start_date","#end_date"]'>

import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static values = { fieldIds: Array }

  updateQueryStringParameter(key, value) {
    // get the current URL
    let url = window.location.href;

    // check if the key already exists in the query string
    let regex = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
    let separator = url.indexOf('?') !== -1 ? "&" : "?";

    if (url.match(regex)) {
      // if the key exists, replace it with the new value
      url = url.replace(regex, '$1' + key + "=" + value + '$2');
    } else {
      // if the key does not exist, add it to the query string
      url = url + separator + key + "=" + value;
    }

    // update the URL without reloading the page
    window.history.pushState({}, "", url);
  }

  submit(event) {
    const form = event.target;

    const fields = form.querySelectorAll(this.fieldIdsValue.join(", "));

    fields.forEach((field) => {
      if (field.value) {
        this.updateQueryStringParameter(field.name, field.value);
      }
    });
  }
}
