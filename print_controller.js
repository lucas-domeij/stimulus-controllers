import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  connect() {
    this.element.addEventListener('click', () => {
      try {
        // Print for Safari browser
        document.execCommand('print', false, null)
      } catch {
        window.print()
      }
    })
  }
}
