function showInfo(id, content) {
   document.getElementById(id).innerHTML = content;
}

/*  
    ASSUMING
        - End user nhập họ tên, thu nhập năm, số người phụ thuộc

    INPUT
        - variable fullname nhận giá trị từ input có id fullname
        - variable totalSalary nhận giá trị từ input có id totalSalary
        - variable countUser nhận giá trị từ input có id countUser
    
    HANDLE
    
    OUTPUT
*/
function calcTax() {
   let fullName = document.getElementById("fullName").value;
   let totalSalary = +document.getElementById("totalSalary").value;
   let countUser = +document.getElementById("countUser").value;
   let incomeTaxes = totalSalary - 4e6 - countUser * 16e5;
   let personalIncome = 0;

   console.log(totalSalary);
   console.log(1.6e5);

   if (countUser >= 5) {
      showInfo("showTax", "<p>Số người phụ thuộc phải nhỏ hơn 5</p>");
      return;
   }

   if (incomeTaxes <= 0) {
      showInfo("showTax", "<p>Nhập giá trị sai!</p>");
   } else {
      if (incomeTaxes <= 6e7) {
         personalIncome = incomeTaxes * 0.05;
      } else if (incomeTaxes <= 12e7) {
         personalIncome = 6e7 * 0.05 + (incomeTaxes - 6e7) * 0.1;
      } else if (incomeTaxes <= 21e7) {
         personalIncome = 6e7 * 0.05 + 6e7 * 0.1 + (incomeTaxes - 12e7) * 0.15;
      } else if (incomeTaxes <= 384e6) {
         personalIncome =
            6e7 * 0.05 + 6e7 * 0.1 + 9e7 * 0.15 + (incomeTaxes - 21e7) * 0.2;
      } else if (incomeTaxes <= 624e6) {
         personalIncome =
            6e7 * 0.05 +
            6e7 * 0.1 +
            9e7 * 0.15 +
            174e6 * 0.2 +
            (incomeTaxes - 384e6) * 0.25;
      } else if (incomeTaxes <= 96e7) {
         personalIncome =
            6e7 * 0.05 +
            6e7 * 0.1 +
            9e7 * 0.15 +
            174e6 * 0.2 +
            24e7 * 0.25 +
            (incomeTaxes - 624e6) * 0.3;
      } else {
         personalIncome =
            6e7 * 0.05 +
            6e7 * 0.1 +
            9e7 * 0.15 +
            174e6 * 0.2 +
            24e7 * 0.25 +
            336e6 * 0.3 +
            (incomeTaxes - 96e7) * 0.35;
      }
      showInfo(
         "showTax",
         "<p>Họ tên:" +
            fullName +
            "Tiền thuế thu nhập cá nhân: " +
            personalIncome.toLocaleString() +
            "</p>"
      );
   }
}
