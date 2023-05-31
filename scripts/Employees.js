import { getEmployees, getOrders } from "./database.js"

const employees = getEmployees()
const orders = getOrders()

export const Employees = () => {
    let html = "<ul>"

    for (const employee of employees) {
        html += `<li id="employee--${employee.id}">${employee.name}</li>`
    }

    html += "</ul>"

    return html
}

// create an event listener which displays a window alert when an employee in the employee list is clicked: "employeename sold x products"
// this will need access to the employees collection AND the orders collection
// will need to access the number of times a given employee ID appears in the orders collection -- see function below

document.addEventListener( // creates event listener
    "click", // listens for click
    (clickEvent) => { // defines a function which takes a parameter, clickEvent
        const clickedItem = clickEvent.target
        if (clickedItem.id.startsWith("employee")) {
            const [, productPK] = clickedItem.id.split("--")
            for (const employee of employees) {
                if (employee.id === parseInt(productPK)) {
                    const numOfOrders = filteredOrders(employee)
                    if (numOfOrders === 1) { // modifies "product/s" to be grammatically correct based on number passed in
                        window.alert(`${employee.name} sold ${numOfOrders} product`)
                    } else if (numOfOrders > 1 || numOfOrders <= 0) {
                        window.alert(`${employee.name} sold ${numOfOrders} products`)
                    }

                }
            }
        }
    }
)

// creates an array of all the orders in which a given employee id appears
// returns a number by accessing array's length property

const filteredOrders = (employee) => {
    let orderArray = []
    for (const order of orders) {
        if (order.employeeId === employee.id) {
            orderArray.push(order)
        }
    }
    const arrayLength = orderArray.length
    return arrayLength
}