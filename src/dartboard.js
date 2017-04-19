const dartValuesMulti = [6, 10, 15, 2, 17, 3, 19, 7, 16, 8, 11, 14, 9, 12, 5, 20, 1, 18, 4, 13]
const dartValuesSingle = [3, 19, 7, 16, 8, 11, 14, 9, 12, 5, 20, 1, 18, 4, 13, 6, 10, 15, 2, 17]

const defaultOptions = {
  backgroundColor: 'transparent',
}

export class Dartboard {
  constructor (canvasId, options = {}) {
    this.canvasElement = window.document.getElementById(canvasId)
    this.wrapper = this.canvasElement.parentNode

    if (!this.canvasElement) {
      return
    }
    
    options = Object.assign(defaultOptions, options);
    
    this.calculateDimensions()
  
    this.canvas = new fabric.Canvas(canvasId, {
      backgroundColor: options.backgroundColor,
      width: this.width,
      height: this.height,
      selection: false,
      perPixelTargetFind: true,
    })
    
    this.bindEvents()
    this.calculateShapes()
    this.render()
  }
  
  getCanvasObjects () {
    return this.canvas.getObjects()
  }
  
  bindEvents () {
    this.canvas.on('mouse:down', (options) => {
      const target = options.target
      console.debug('Text', target.dartValue)
    })
  
    window.addEventListener('resize', () => {
      this.canvas.clear()
      
      this.calculateDimensions()
      this.calculateShapes()
      this.render()
    })
  }
  
  render () {
    // Background
    this.canvas.add(this.noScore)
    
    // Shapes
    for (let x = 0; x < 20; x++) {
      this.canvas.add(this.singleNumbers[x])
    }

    for (let x = 0; x < 20; x++) {
      this.canvas.add(this.trippleRing[x], this.doubleRing[x])
    }

    for (const label of this.textNumbers) {
      this.canvas.add(label)
    }
    
    // Bullseye
    this.canvas.add(this.singleBull, this.bullsEye)
    
    // .. and render
    this.canvas.renderAll()
  }
  
  calculateDimensions () {
    this.width = (this.wrapper.clientWidth)
    this.height = (this.wrapper.clientWidth)

    this.radiusBoard = 0.9 * (this.width / 2)

    this.widthTriangle = this.radiusBoard * (170 / 200) * 2 * Math.tan(9 * Math.PI / 180)
    this.heightTriangle = this.radiusBoard * (162 / 200) / Math.cos(9 * Math.PI / 180)
  }
  
  calculateShapes () {
    this.doubleRing = []
    this.trippleRing = []
    this.singleNumbers = []
    this.textNumbers = []
    
    const center = this.width / 2
    
    // Triangle Shapes
    for (let x = 0; x < 20; x++) {
      this.singleNumbers[x] = new fabric.Triangle({
        originX: 'center',
        originY: 'top',
        width: this.widthTriangle,
        height: this.heightTriangle,
        fill: (x % 2 === 0) ? 'black' : 'white',
        angle: x * 18,
        left: center,
        top: center,
        selectable: false,
        dartValue: dartValuesSingle[x],
      })
    }
    
    // Inner Arcs
    for (let x = 0; x < 20; x++) {
      this.doubleRing[x] = new fabric.Circle({
        originX: 'center',
        originY: 'center',
        radius: this.radiusBoard * (166 / 200),
        angle: -9 + x * 18,
        endAngle: 18 * Math.PI / 180,
        left: center,
        top: center,
        fill: 'transparent',
        stroke: (x % 2 === 0) ? 'green' : 'red',
        strokeWidth: this.radiusBoard * (8 / 200),
        selectable: false,
        dartValue: dartValuesMulti[x] * 2,
      })
    }
    
    // Outer Arcs
    for (let x = 0; x < 20; x++) {
      this.trippleRing[x] = new fabric.Circle({
        originX: 'center',
        originY: 'center',
        radius: this.radiusBoard * (103 / 200),
        angle: -9 + x * 18,
        endAngle: 18 * Math.PI / 180,
        left: center,
        top: center,
        fill: 'transparent',
        stroke: (x % 2 === 0) ? 'green' : 'red',
        strokeWidth: this.radiusBoard * (8 / 200),
        selectable: false,
        dartValue: dartValuesMulti[x] * 3,
      })
    }
    
    // Text labels
    for (let x = 0; x < 20; x++) {
      this.textNumbers[x] = new fabric.Text(dartValuesMulti[x] + '', {
        originX: 'center',
        originY: 'center',
        left: center + this.radiusBoard * (185 / 200) * Math.cos((2 * Math.PI * x) / 20),
        top: center + this.radiusBoard * (185 / 200) * Math.sin((2 * Math.PI * x) / 20),
        fontSize: this.radiusBoard * (30 / 200),
        fill: 'white',
        angle: 90 + (360 / 20 * x),
        selectable: false,
        dartValue: 0,
      })
    }
  
    this.bullsEye = new fabric.Circle({
      originX: 'center',
      originY: 'center',
      radius: this.radiusBoard * (12.7 / 200),
      fill: 'red',
      left: center,
      top: center,
      dartValue: 50,
      selectable: false,
    })
    
    this.singleBull = new fabric.Circle({
      originX: 'center',
      originY: 'center',
      radius: this.radiusBoard * (26.8 / 200),
      fill: 'green',
      left: center,
      top: center,
      dartValue: 25,
      selectable: false,
    })
    
    this.noScore = new fabric.Circle({
      originX: 'center',
      originY: 'center',
      radius: this.radiusBoard * (185 / 200),
      left: center,
      top: center,
      fill: 'transparent',
      stroke: 'black',
      strokeWidth: this.radiusBoard * (30 / 200),
      selectable: false,
      dartValue: 0,
    })
  }
}

export default Dartboard
