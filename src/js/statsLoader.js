import baseSVG from '../img/base.svg'

const arcStartAngle = -Math.PI / 2 - (Math.PI * 1.2) / 8
const arcEndAngle = -arcStartAngle
const transitionDuration = 750

class StatsLoader {
  constructor () {
    if (typeof d3 === 'undefined') {
      throw 'd3js library must be globbally available'
    }
    this.currentValue = 0
  }

  id (containerId) {
    this.containerId = containerId
    return this
  }

  init () {
    this.arcScale = d3
      .scaleLinear()
      .domain([0, 100])
      .range([arcStartAngle, arcEndAngle])
      .clamp(true)
    this.container = d3
      .select('#' + this.containerId)
      .append('div')
      .attr('class', 'stats-loader--container')
      .html(baseSVG)
    this.arc = d3
      .arc()
      .innerRadius(50)
      .outerRadius(68.5)
      .startAngle(arcStartAngle)
      .endAngle(this.arcScale(this.currentValue))
      .cornerRadius(1000)
    const tranformation = 70
    d3.select('.percent-loader path')
      .attr('transform', `translate(${tranformation}, ${tranformation})`)
      .datum({ endAngle: this.arcScale(this.currentValue) })
    d3.select('.percent-loader path').attr('d', this.arc())
    this.container.select('.Usage-num').text(`${this.currentValue}%`)
    this.isInit = true
    return this
  }

  setValue (value) {
    this.currentValue = parseFloat(value)
    this.isInit && this._update()
    return this
  }

  _update () {
    const v = this.currentValue
    const arcTween = newAngle => {
      return d => {
        var interpolate = d3.interpolate(d.endAngle, newAngle)
        return t => {
          d.endAngle = interpolate(t)
          return this.arc.endAngle(d.endAngle)()
        }
      }
    }
    this.container
      .select('.percent-loader path')
      .transition()
      .duration(transitionDuration)
      .attrTween('d', arcTween(this.arcScale(this.currentValue)))

    const lastValue = parseInt(this.container.select('.Usage-num').text())
    this.container
      .select('.Usage-num')
      .transition()
      .duration(transitionDuration)
      .tween('text', function (d) {
        var i = d3.interpolate(lastValue, v)
        return function (t) {
          const val = parseInt(i(t))

          d3.select(this).text(`${val < 10 ? '0' + val : val}%`)
        }
      })
  }
}

export default StatsLoader
