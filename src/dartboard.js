const dartValuesMulti = [6, 10, 15, 2, 17, 3, 19, 7, 16, 8, 11, 14, 9, 12, 5, 20, 1, 18, 4, 13]
const dartValuesSingle = [3, 19, 7, 16, 8, 11, 14, 9, 12, 5, 20, 1, 18, 4, 13, 6, 10, 15, 2, 17]

export class Dartboard {
  constructor (canvasElement) {
    if (!canvasElement.length) {
      return
    }
    console.log('Initialize Dartboard')
    
    this.width = (canvasElement.clientWidth)
    this.height = (canvasElement.clientWidth)
    this.radiusBoard = 0.9 * (this.width / 2)
    this.widthTriangle = this.radiusBoard * (170 / 200) * 2 * Math.tan(9 * Math.PI / 180)
    this.heightTriangle = this.radiusBoard * (162 / 200) / Math.cos(9 * Math.PI / 180)
  
    this.canvas = new fabric.Canvas('canvas', {
      backgroundColor: 'lightgrey',
      width: this.width,
      height: this.height,
      selection: false,
      perPixelTargetFind: true,
    })
    
    this.bindEvents()
    this.calculateShapes()
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
  
  calculateShapes () {
    this.doubleRing = []
    this.trippleRing = []
    this.singleNumbers = []
    this.textNumbers = []
    
    for (let x = 0; x < 20; x++) {
      this.singleNumbers[x] = new fabric.Triangle({
        originX: 'center',
        originY: 'top',
        width: this.widthTriangle,
        height: this.heightTriangle,
        fill: (x % 2 === 0) ? 'black' : 'white',
        angle: x * 18,
        left: this.width / 2,
        top: this.height / 2,
        selectable: false,
        dartValue: dartValuesSingle[x],
      })
    }
    for (let x = 0; x < 20; x++) {
      this.doubleRing[x] = new fabric.Circle({
        originX: 'center',
        originY: 'center',
        radius: this.radiusBoard * (166 / 200),
        angle: -9 + x * 18,
        endAngle: 18 * Math.PI / 180,
        left: this.width / 2,
        top: this.height / 2,
        fill: 'transparent',
        stroke: (x % 2 === 0) ? 'green' : 'red',
        strokeWidth: this.radiusBoard * (8 / 200),
        selectable: false,
        dartValue: dartValuesMulti[x] * 2,
      })
    }
    for (let x = 0; x < 20; x++) {
      this.trippleRing[x] = new fabric.Circle({
        originX: 'center',
        originY: 'center',
        radius: this.radiusBoard * (103 / 200),
        angle: -9 + x * 18,
        endAngle: 18 * Math.PI / 180,
        left: this.width / 2,
        top: this.height / 2,
        fill: 'transparent',
        stroke: (x % 2 === 0) ? 'green' : 'red',
        strokeWidth: this.radiusBoard * (8 / 200),
        selectable: false,
        dartValue: dartValuesMulti[x] * 3,
      })
    }
  }
}

export default Dartboard

const bullsEye = new fabric.Circle({
  originX: 'center',
  originY: 'center',
  radius: radiusBoard * (12.7 / 200),
  fill: 'red',
  left: width / 2,
  top: height / 2,
  dartValue: 50,
  selectable: false,
})
const singleBull = new fabric.Circle({
  originX: 'center',
  originY: 'center',
  radius: radiusBoard * (26.8 / 200),
  fill: 'green',
  left: width / 2,
  top: height / 2,
  dartValue: 25,
  selectable: false,
})
const noScore = new fabric.Circle({
  originX: 'center',
  originY: 'center',
  radius: radiusBoard * (185 / 200),
  left: width / 2,
  top: height / 2,
  fill: 'transparent',
  stroke: 'black',
  strokeWidth: radiusBoard * (30 / 200),
  selectable: false,
  dartValue: 0,
})
for (let x = 0; x < 20; x++) {
  textNumbers[x] = new fabric.Text(dartValuesMulti[x] + '', {
    originX: 'center',
    originY: 'center',
    left: width / 2 + radiusBoard * (185 / 200) * Math.cos((2 * Math.PI * x) / 20),
    top: height / 2 + radiusBoard * (185 / 200) * Math.sin((2 * Math.PI * x) / 20),
    fontSize: radiusBoard * (30 / 200),
    fill: 'white',
    angle: 90 + (360 / 20 * x),
    selectable: false,
    dartValue: 0,
  })
}

for (let x = 0; x < 20; x++) {
  canvas.add(singleNumbers[x])
}

for (let x = 0; x < 20; x++) {
  canvas.add(trippleRing[x], doubleRing[x], singleBull, bullsEye, noScore)
}

for (let x = 0; x < 20; x++) {
  canvas.add(textNumbers[x])
}

canvas.renderAll()
