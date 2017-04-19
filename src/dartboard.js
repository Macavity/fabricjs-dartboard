const dartValuesMulti = [6, 10, 15, 2, 17, 3, 19, 7, 16, 8, 11, 14, 9, 12, 5, 20, 1, 18, 4, 13]
const dartValuesSingle = [3, 19, 7, 16, 8, 11, 14, 9, 12, 5, 20, 1, 18, 4, 13, 6, 10, 15, 2, 17]

export class Dartboard {
  constructor (canvasId) {
    const canvasElement = window.document.getElementById(canvasId)

    if (!canvasElement) {
      return
    }
    console.log('Initialize Dartboard')
    
    this.width = (canvasElement.parentElement.clientWidth)
    this.height = (canvasElement.parentElement.clientWidth)
    this.radiusBoard = 0.9 * (this.width / 2)
    this.widthTriangle = this.radiusBoard * (170 / 200) * 2 * Math.tan(9 * Math.PI / 180)
    this.heightTriangle = this.radiusBoard * (162 / 200) / Math.cos(9 * Math.PI / 180)
  
    this.canvas = new fabric.Canvas(canvasId, {
      backgroundColor: 'lightgrey',
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
  
    window.addEventListener('resize', function () {
      // TODO Redraw on window resize
    })
  }
  
  render () {
    console.log('text labels')
    console.table(this.textNumbers)
    
    for (let x = 0; x < 20; x++) {
      this.canvas.add(this.singleNumbers[x])
    }
  
    for (let x = 0; x < 20; x++) {
      this.canvas.add(this.trippleRing[x], this.doubleRing[x])
    }
  
    for (let x = 0; x < 20; x++) {
      this.canvas.add(this.textNumbers[x])
    }
    
    this.canvas.add(this.singleBull, this.bullsEye, this.noScore)
  
    this.canvas.renderAll()
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
