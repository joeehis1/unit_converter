const form = document.querySelector('#measurments')
const display = document.querySelector('#display')

class UnitConverter {
    constructor(measurments, display) {
        this.measurments = measurments
        this.valueInput = this.measurments.querySelector('input[name="measurment-input"]')
        this.errorOutput = this.measurments.querySelector('#error')
        this.display = display;

        this.measurments.addEventListener('submit', this.displayConversion)
    }

    initialiseDisplay() {
        const saved = JSON.parse(localStorage.getItem('measurments'))
        if (!saved) {
            return
        }
        this.display.innerHTML = this.render(saved)

    }

    displayConversion = (e) => {
        e.preventDefault()
        this.errorOutput.textContent = ''
        if (!(this.valueInput.value).trim()) {
            return
        }
        this.value = parseFloat(this.valueInput.value)
        if (isNaN(this.value)) {
            this.valueInput.value = ''
            this.errorOutput.textContent = "Only numeric values allowed"
            return
        }
        this.measurments = [this.length, this.volume, this.mass]
        localStorage.setItem('measurments', JSON.stringify(this.measurments))
        this.display.innerHTML = this.render(this.measurments)
        this.valueInput.value = ''

    }

    get length() {
        const feet = (this.value / 0.3048).toFixed(3)
        const meters = (this.value / 3.28084).toFixed(3)
        const templateString = `
          <h2>
          Length(meter/feet)
          </h2>
          <p>
          <span>${this.value} meters = ${feet} feet</span>
          <span>${this.value} feet = ${meters} meters</span>
          
          </p>
    `
        return {
            feet,
            meters,
            templateString
        }
    }

    get volume() {
        const gallons = (this.value / 0.264).toFixed(3)
        const litres = (this.value / 3.787).toFixed(3)
        const templateString = `
          <h2>
          Volume(Liters/Gallons)
          </h2>
          <p >
          <span>${this.value} liters = ${gallons} gallons</span>
          <span>${this.value} gallons = ${litres} litres</span>
          
          </p>
    `

        return {
            gallons,
            litres,
            templateString
        }
    }

    get mass() {
        const pounds = (this.value / 0.45).toFixed(3)
        const kilos = (this.value / 2.2204).toFixed(3)
        const templateString = `
          <h2>
          Mass(Kilograms/Pounds)
          </h2>
          <p>
          <span>${this.value} kilos = ${pounds} pounds</span>
          <span>${this.value} pounds = ${kilos} litres</span>
          
          </p>
    `
        return {
            pounds,
            kilos,
            templateString
        }

    }

    render(arr) {
        let str = arr.reduce((tempStr, item) => {
            tempStr += `<div class="converted">${item.templateString}</div>`
            return tempStr
        }, '')
        return str
    }

}


const uc = new UnitConverter(form, display)
uc.initialiseDisplay()

