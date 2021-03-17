import './styles/styles.scss'

class Calculator {
  private displayNumber: string = '0'
  private currentNumber: number | string = ''
  private previousNumber: number | string = ''
  private operation: string = ''
  private awaitingOperator: boolean = true

  public reset = (): void => {
    this.displayNumber = '0'
    this.currentNumber = ''
    this.previousNumber = ''
    this.operation = ''
    this.awaitingOperator = true
  }

  public getDisplayNumber = (): string => this.displayNumber

  public setDisplayNumber = (input: string): void => {
    this.displayNumber = input
  }

  public getCurrentNumber = (): number | string => this.currentNumber

  public setCurrentNumber = (input: number | string) => {
    this.currentNumber = input
  }

  public getPrevious = (): number | string => this.previousNumber

  public setPrevious = (): void => {
    this.previousNumber = this.currentNumber
  }

  public resetPrevious = (): void => {
    this.previousNumber = ''
  }

  public setOperation = (input: string): void => {
    this.operation = input
  }

  public getOperation = (): string => this.operation

  public getAwaitingOperator = (): boolean => this.awaitingOperator

  public setAwaitingOperator = (option: boolean): void => {
    this.awaitingOperator = option
  }

  public divide = (): void => {
    this.currentNumber = +this.previousNumber / +this.currentNumber
  }

  public multiply = (): void => {
    this.currentNumber = +this.previousNumber * +this.currentNumber
  }

  public add = (): void => {
    this.currentNumber = +this.previousNumber + +this.currentNumber
  }

  public subtract = (): void => {
    this.currentNumber = +this.previousNumber - +this.currentNumber
  }
}

const DOM_EVENTS = (() => {
  const digits: NodeListOf<HTMLButtonElement> = document.querySelectorAll('[data-digit]')!
  const operators: NodeListOf<HTMLButtonElement> = document.querySelectorAll('[data-operator]')!
  const equals: HTMLButtonElement = document.querySelector('[data-equals]')!
  const clearBtn: HTMLButtonElement = document.querySelector('[data-clear]')!
  const negOrPos: HTMLButtonElement = document.querySelector('[data-negOrPos]')!
  const percent: HTMLButtonElement = document.querySelector('[data-percent]')!
  const displayEl: HTMLHeadingElement = document.querySelector('#displayText')!

  const displaySize = (): void => {
    if (!displayEl.textContent) return
    if (displayEl.textContent.length > 11) {
      displayEl.style.fontSize = '2rem'
      return
    } else if (displayEl.textContent.length > 8) {
      displayEl.style.fontSize = '3rem'
      return
    } else displayEl.style.fontSize = '4rem'
  }

  const updateDisplay = (): void => {
    displayEl.textContent = getCurrentNumber() ? getCurrentNumber().toString() : '0'
    displaySize()
  }

  const formatDisplay = (input: string): string => {
    let value: string

    if (getAwaitingOperator()) {
      value =
        getDisplayNumber() === '0' ? (input === '.' ? '0.' : input) : getDisplayNumber() + input
    } else {
      value = getCurrentNumber() ? getCurrentNumber() + input : input
    }
    return value.toString()
  }

  const calculate = (): void => {
    switch (getOperation()) {
      case '/':
        divide()
        break
      case '*':
        multiply()
        break
      case '+':
        add()
        break
      case '-':
        subtract()
        break
      default:
        return
    }
    resetPrevious()
    updateDisplay()
  }

  const numberInput = (input: string): void => {
    if (input === '.' && getDisplayNumber().includes('.')) return
    if (getAwaitingOperator()) {
      setCurrentNumber(formatDisplay(input))
      setDisplayNumber(formatDisplay(input))
    } else {
      setCurrentNumber(formatDisplay(input))
      setDisplayNumber(getCurrentNumber().toString())
      setAwaitingOperator(true)
    }
    updateDisplay()
  }

  const operatorInput = (input: string): void => {
    getAwaitingOperator() && calculate()
    setOperation(input)
    setPrevious()
    setCurrentNumber('')
    setAwaitingOperator(false)
  }

  return {
    digits,
    operators,
    equals,
    clearBtn,
    negOrPos,
    percent,
    calculate,
    numberInput,
    operatorInput,
    updateDisplay
  }
})()

const {
  digits,
  operators,
  equals,
  clearBtn,
  negOrPos,
  percent,
  calculate,
  numberInput,
  operatorInput,
  updateDisplay
} = DOM_EVENTS
const calculator = new Calculator()

const {
  reset,
  getDisplayNumber,
  setDisplayNumber,
  getCurrentNumber,
  setCurrentNumber,
  setPrevious,
  resetPrevious,
  setOperation,
  getOperation,
  getAwaitingOperator,
  setAwaitingOperator,
  divide,
  multiply,
  add,
  subtract
} = calculator

digits.forEach((digit: HTMLButtonElement) => {
  digit.addEventListener('click', () => {
    numberInput(digit.value)
  })
})

operators.forEach((operator: HTMLButtonElement) => {
  operator.addEventListener('click', (): void => {
    operatorInput(operator.value)
  })
})

equals.addEventListener('click', (): void => {
  calculate()
})

clearBtn.addEventListener('click', (): void => {
  reset()
  updateDisplay()
})

negOrPos.addEventListener('click', (): void => {
  setCurrentNumber(
    getCurrentNumber() > 0 ? -Math.abs(+getCurrentNumber()) : Math.abs(+getCurrentNumber())
  )
  setDisplayNumber(getCurrentNumber().toString())
  updateDisplay()
})

percent.addEventListener('click', (): void => {
  setCurrentNumber(+getCurrentNumber() / 100)
  setDisplayNumber(getCurrentNumber().toString())
  updateDisplay()
})

document.addEventListener('keydown', (event: KeyboardEvent): void => {
  if (event.key === 'F12') return

  const numberReg: RegExp = /[\d]/g
  const operatorReg: RegExp = /[*\/+\-]/g

  const key: string = event.key.toString()
  const number: RegExpMatchArray | null = key.match(numberReg)
  const operator: RegExpMatchArray | null = key.match(operatorReg)
  const decimal: string | boolean = key === '.' && key

  if (decimal) numberInput(decimal)

  if (number) numberInput(number[0])

  if (operator) operatorInput(operator[0])

  if (key === '=' || key === 'Enter') calculate()

  if (key === 'Backspace') {
    if (!getCurrentNumber()) return
    setCurrentNumber(
      getCurrentNumber().toString().length === 1 ? '0' : getCurrentNumber().toString().slice(0, -1)
    )
    setDisplayNumber(getCurrentNumber().toString())
    updateDisplay()
  }

  if (event.key === '%') {
    setCurrentNumber(+getCurrentNumber() / 100)
    setDisplayNumber(getCurrentNumber().toString())
    updateDisplay()
  }
})

export {}
