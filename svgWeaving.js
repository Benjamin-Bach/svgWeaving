class svgWeaving{
  constructor(target){
    this.svgNS = "http://www.w3.org/2000/svg";
    this.svg = document.createElementNS(this.svgNS, 'svg')
    this.svg.setAttributeNS(null, 'viewBox', '0 0 ' + window.innerWidth + ' ' + window.innerHeight)
    this.svg.addEventListener('click', (e) => {
      this.createNewPoint(e)
    })
    target.append(this.svg)
  }
  createNewPoint(e){
    let rect = e.target.getBoundingClientRect();
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;
    let newPoint = document.createElementNS(this.svgNS, 'circle')
    newPoint.setAttributeNS(null,'r',3)
    newPoint.setAttributeNS(null,'cx',x)
    newPoint.setAttributeNS(null,'cy',y)
    this.svg.append(newPoint)
    this.createNewSegment(x,y)
  }
  createNewSegment(x,y){
    let points = this.getNearestPoints(x,y)
    if (points.length){
      points.forEach((point, i) => {
        console.log(point)
        let segment = document.createElementNS(this.svgNS, 'line')
        segment.setAttributeNS(null,'x1',point[0])
        segment.setAttributeNS(null,'y1',point[1])
        segment.setAttributeNS(null,'x2',x)
        segment.setAttributeNS(null,'y2',y)
        console.log(segment.getTotalLength())
        let segmentLength = Math.ceil(segment.getTotalLength())
        segment.style.strokeDasharray = segmentLength
        segment.style.strokeDashoffset = 0 - segmentLength
        this.svg.append(segment)
        setTimeout(() => {segment.classList.add('draw')},50)

      });

    }
  }
  getNearestPoints(x,y){
    let points = []
    this.svg.querySelectorAll('circle:not(:last-of-type)').forEach((circle, i) => {
      points[i] = [
        parseInt(circle.getAttribute('cx')),
        parseInt(circle.getAttribute('cy'))
      ]
    })
    return points
  }

}

