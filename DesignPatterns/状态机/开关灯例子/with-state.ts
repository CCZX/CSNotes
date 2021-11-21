abstract class LightState {
  protected light: Light

  constructor(light: Light) {
    this.light = light
  }

  abstract pressed(): void
}

class OffLightState extends LightState {
  constructor(light: Light) {
    super(light)
  }

  pressed() {
    this.light.setState(this.light.yellowLight)
  }
}

class YellowLightState extends LightState {
  constructor(light: Light) {
    super(light)
  }

  pressed() {

  }
}

class WhiteLightState extends LightState {
  constructor(light: Light) {
    super(light)
  }

  pressed() {

  }
}

class Light {
  public offLight: OffLightState
  public yellowLight: YellowLightState
  public whiteLight: WhiteLightState
  private currState: LightState
  private button: HTMLElement

  constructor() {
    this.offLight = new OffLightState(this)
    this.yellowLight = new YellowLightState(this)
    this.whiteLight = new WhiteLightState(this)

    this.button = null
  }

  init() {
    this.button = document.querySelector('button')

    this.currState = this.offLight

    this.button.addEventListener('click', () => {
      this.currState.pressed()
    })
  }

  setState(newState: LightState) {
    this.currState = newState
  }
}

export {}
