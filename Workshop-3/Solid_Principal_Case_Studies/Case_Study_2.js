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

class PayrollFactory {
  processPayRoll(employeeType) {
    let payRollCalculation;
    switch (employeeType) {
      case "general":
       return payRollCalculation = new Employee();
      case "contract":
       return payRollCalculation = new ContractEmployee();
      default:
        throw new Error("Unknown employee type");
    }
  }
}

class PayRollCalculation{
    calculatePayRoll(employType){
        const payRollCalculations = new PayrollFactory().processPayRoll(employType);
        return payRollCalculations
    }   
}


const payRollCalculation = new PayRollCalculation().calculatePayRoll('general');


