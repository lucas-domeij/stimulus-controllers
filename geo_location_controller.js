import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["output", "longitude", "latitude"]

  static values = { longitude: String, latitude: String, position: Object }

  connect() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.positionValue = position;
        this.latitudeValue = position.coords.latitude;
        this.longitudeValue = position.coords.longitude;

        if(this.hasOutputTarget) {
          this.outputTarget.innerHTML = "Latitude: " + position.coords.latitude +
          "<br>Longitude: " + position.coords.longitude;
          }
        });
    } else {
      if (this.hasOutputTarget) {
        this.outputTarget.innerHTML = "Geolocation is not supported by this browser.";
      }
    }
  }

  setInputField() {
    if (this.hasLatitudeTarget) {
      this.latitudeTarget.value = this.latitudeValue
      this.longitudeTarget.value = this.longitudeValue
    }
  }
}
