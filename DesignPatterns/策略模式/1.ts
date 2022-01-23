// 这里以绩效策略为例，根据不同的绩效计算不同的奖金

abstract class AbsPerformanceStrategy {
  abstract calculate(salary: number): number
}

class PerfomanceA extends AbsPerformanceStrategy {
  calculate(salary: number): number {
    return salary * 4
  }
}

class PerfomanceB extends AbsPerformanceStrategy {
  calculate(salary: number): number {
    return salary * 3
  }
}

class Bouns {
  salary: number
  strategy: AbsPerformanceStrategy

  setSalary(salary: number) {
    this.salary = salary
  }

  setStrategy(strategy: AbsPerformanceStrategy) {
    this.strategy = strategy
  }

  getBouns() {
    return this.strategy.calculate(this.salary)
  }
}

class Clinet {
  
}
