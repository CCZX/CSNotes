class Light {
  state: 'offLightState' | 'yellowLightState' | 'whiteLightState'
  button: HTMLElement | null

  constructor() {
    this.state = 'offLightState'

    this.button = null
  }

  init() {
    this.button = document.querySelector('button')

    this.button.addEventListener('click', () => {
      this.pressed()
    })
  }

  pressed() {
    const currentState = this.state
    if (currentState === 'offLightState') {
      this.state = 'yellowLightState'
    } else if (currentState === 'yellowLightState') {
      this.state = 'whiteLightState'
    } else {
      this.state = 'offLightState'
    }
  }
}
