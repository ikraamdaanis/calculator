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

export {}
