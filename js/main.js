
let customers = [];
const key = "customers-data";

class Customer {
    constructor (name, email, phone, address) {
        this.customerName = name,
        this.customerMail = email,
        this.customerPhone = phone,
        this.customerAddress = address;
    }
}

function init() {
    if (window.localStorage.getItem(key) == null) {
        let customer_1 = new Customer("Nguyen Van Phuoc", "nphuoc0402@gmail.com", "084112536741", "299 Dien Bien Phu");
        let customer_2 = new Customer("Le Luong Hong Son", "son.le@gmail.com", "083235718456", "199 Nguyen Hue");
        let customer_3 = new Customer("Cao Thanh Binh", "binh.cao@gmail.com", "083235718456", "400 Dien Bien Phu");

        customers = [customer_1, customer_2, customer_3];
        setLocalStorage(key, customers);
    } else {
        getLocalStorage();
    }
}

let tempCustomers = [...customers];
id = tempCustomers.length == 0 ? 1 : tempCustomers.sort((cus1, cus2) => {
                                        return cus2.customerId - cus1.customerId;
                                    })[0].customerId;

function showCustomer(data) {
    let addCustomer = document.getElementById("add-customer");
    addCustomer.innerHTML = "";
    data.forEach((customer, index) =>{
        addCustomer.innerHTML += `
                                <tr id="tr_${index}">
                                    <td>${index + 1}</td>
                                    <td>${customer.customerName}</td>
                                    <td>${customer.customerMail}</td>
                                    <td>${customer.customerPhone}</td>
                                    <td>${customer.customerAddress}</td>
                                    <td>
                                        <a href="javascript:;" class="btn-self btn-edit-self" data-toggle="modal" data-target="#exampleModal"><i class="fa fa-edit"></i>&nbsp;edit</a>
                                        <a href="javascript:;" class="btn-self btn-delete-self") onclick="remove(${index})"><i class="fa fa-trash"></i>&nbsp;Delete</a>
                                    </td>
                                </tr>
    
                                `
    });
}


function AddCustomer() {
    let customerName = document.getElementById("fullName").value;
    let customerMail = document.getElementById("email").value;
    let customerPhone = document.getElementById("phone").value;
    let customerAddress = document.getElementById("address").value;
    customerName = clearUnnecessaryWhiteSpace(customerName);
    if(isNullOrEmpty(customerName)) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No customer name!',
            // footer: '<a href="">Why do I have this issue?</a>'
          })
        clear();
    } else if (isExistCustom(customerName, customers) != -1) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Customer name already exists',
            // footer: '<a href="">Why do I have this issue?</a>'
          })
    } else {
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Your work has been saved',
            showConfirmButton: false,
            timer: 1500
          })
        let customer = new Customer(customerName, customerMail, customerPhone, customerAddress);
        customers.push(customer);
        setLocalStorage(key,customers);
        clear();
        showCustomer(customers);
    }
}

function clear() {
    document.getElementById("fullName").value = "";
    document.getElementById("email").value = "";
    document.getElementById("password").value = "";
    document.getElementById("rePassword").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("address").value = "";
}

function getLocalStorage() {
    customers = JSON.parse(window.localStorage.getItem(key));
}

function setLocalStorage(key, data) {
    data.sort();
    window.localStorage.setItem(key, JSON.stringify(data));
} 

function clearUnnecessaryWhiteSpace(str) {
    return str.trim().replace(/  +/g, ' ');
}

function isNullOrEmpty(str) {
    return str == null || str.trim() === "";
}

function isExistCustom(customerName, data) {
    customerName = clearUnnecessaryWhiteSpace(customerName);
    return data.findIndex((customer, index) => {
        return customer.customerName.toLowerCase() === customerName.toLowerCase();
    });
}

function capitalize(str) {
    str = clearUnnecessaryWhiteSpace(str);
    str = str.toLowerCase();
    let i = str.indexOf(' ');
    while (i < str.length) {
        if (str[i] === ' ') {
            str = str.substring(0, i + 1) + str[i + 1].toUpperCase() + str.substring(i + 2, str.length);
        }
        i++;
    }
    str = str[0].toUpperCase() + str.substring(1, str.length);
    return str;
}

function remove(i) {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
          customers.splice(i, 1); 
          setLocalStorage(key, customers);
          showCustomer(customers);
        }
      })
       
}

function update(i) {
    let tr = document.createElement(`tr_${i}`);
    let tds = tr.children;
    let newCustomerName = document.getElementById("fullName-update").value;
    let newCustomerMail = document.getElementById("email-update").value;
    let newCustomerPhone = document.getElementById("phone-update").value;
    let newCustomerAddress = document.getElementById("address-update").value;
    newCustomerName = clearUnnecessaryWhiteSpace(newCustomerName);
    if(isNullOrEmpty(customerName)) {
        alert("No customer name");
    } else {
        let position = isExistCustom(newCustomerName, customers);
        if (position !== -1 && position !== index) {
            alert("Customer name already exists")
        } else {
            let customer = findById(i);
            customer.customerName = newCustomerName;
            customer.customerMail = newCustomerMail;
            customer.customerPhone = newCustomerPhone;
            customer.customerAddress = newCustomerAddress;

            setLocalStorage(key, customers);
            showCustomer(customers);
        }
    }
}


$('#myModal').on('shown.bs.modal', function () {
    $('#myInput').trigger('focus')
  })

function documentReady() {
    init();
    showCustomer(customers);
    
}

documentReady();