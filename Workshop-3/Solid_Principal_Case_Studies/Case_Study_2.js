// Base employee class
class Employee {
  calculateSalary(hours, wage) {
    return hours * wage;
  }
}

// Contract employee
class ContractEmployee extends Employee {
  calculateSalary(fixedSalary) {
    return fixedSalary;
  }
}

// PayRoll calculation
class PayrollCalculation {
  constructor(employee, contractEmployee) {
    this.employee = employee;
    this.contractEmployee = contractEmployee;
  }

  calculateGeneralEmployeeSalary(hours, wage) {
    const salary = this.employee.calculateSalary(hours, wage);
    return salary;
  }
  calculateContractEmployeeSalary(fixedSalary) {
    const salary = this.contractEmployee.calculateSalary(fixedSalary);
    return salary;
  }
}

function payRoll() {
  const employee = new Employee();
  const contractEmployee = new ContractEmployee();
  return new PayrollCalculation(employee, contractEmployee);
}

const payRollCalculation = payRoll();

