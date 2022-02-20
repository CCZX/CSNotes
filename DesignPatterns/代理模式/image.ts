class AddImage {
  image: HTMLImageElement = document.createElement('img')

  constructor() {
    document.appendChild(this.image)
  }

  setSrc(src) {
    this.image.src = src
  }
}

class ProxyImage {
  target = new AddImage()

  tempImage = new Image()

  constructor() {
    this.tempImage.onload = () => {
      this.target.setSrc(this.tempImage.src)
    }
  }

  setSrc(src) {
    this.target.setSrc('local/image')
    this.tempImage.src = src
  }
}
