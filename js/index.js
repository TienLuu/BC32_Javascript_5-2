function showInfo(id, content) {
   document.getElementById(id).innerHTML = content;
}

/*  
    ASSUMING
         - End user nhập họ tên, thu nhập năm, số người phụ thuộc
         - Số người phụ thuộc sẽ giới hạn

    INPUT
         - Tạo biến fullname nhận giá trị từ input có id fullname
         - Tạo biến annualIncome nhận giá trị từ input có id annualIncome
         - Tạo biến whoDependOnTaxpayers nhận giá trị từ input có id whoDependOnTaxpayers
         - Tạo biến taxableIncomes nhận giá trị thu nhập chịu thuế
         - Tạo biến pit để nhận giá trị số tiền chịu thuế
         
    HANDLE
         - Kiểm tra biến whoDependOnTaxpayers >= 0 || < 0 thì cho nhập lại (giới hạn số người phụ thuộc)
         - Formula:
               Thu nhập chịu thuế = tổng thu nhập năm - 4tr - số người phụ thuộc * 1tr6
         - Số tiền chịu thuế phụ thuộc vào thu nhập chịu thuế
            + <= 6e7: pit = taxableIncomes * 5%
            + <= 12e7: pit = taxableIncomes * 10%
            + <= 21e7: pit = taxableIncomes * 15%
            + <= 384e7: pit = taxableIncomes * 20%
            + <= 624e7: pit = taxableIncomes * 25%
            + <= 96e7: pit = taxableIncomes * 30%
            + > 96e7: pit = taxableIncomes * 35%

    OUTPUT
         - Hiển thị kết quả pit ra div có id showTax
*/
function calcTax() {
   let fullName = document.getElementById("fullName").value;
   let annualIncome = +document.getElementById("annualIncome").value;
   let whoDependOnTaxpayers = +document.getElementById("whoDependOnTaxpayers")
      .value;

   if (whoDependOnTaxpayers >= 5 || whoDependOnTaxpayers < 0) {
      showInfo(
         "showTax",
         "<p>Số người phụ thuộc phải nhỏ hơn 5 & lớn hơn hoặc bằng 0</p>"
      );
      return;
   }

   let taxalbeIncomes = annualIncome - 4e6 - whoDependOnTaxpayers * 16e5;
   let pit = 0;

   if (taxalbeIncomes <= 6e7) {
      pit = taxalbeIncomes * (5 / 100);
   } else if (taxalbeIncomes <= 12e7) {
      pit = taxalbeIncomes * (10 / 100);
   } else if (taxalbeIncomes <= 21e7) {
      pit = taxalbeIncomes * (15 / 100);
   } else if (taxalbeIncomes <= 384e6) {
      pit = taxalbeIncomes * (20 / 100);
   } else if (taxalbeIncomes <= 624e6) {
      pit = taxalbeIncomes * (25 / 100);
   } else if (taxalbeIncomes <= 96e7) {
      pit = taxalbeIncomes * (30 / 100);
   } else {
      pit = taxalbeIncomes * (35 / 100);
   }

   showInfo(
      "showTax",
      "<p>Họ tên:" +
         fullName +
         " <br> Tiền thuế thu nhập cá nhân: " +
         pit.toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
         }) +
         "</p>"
   );
}

/*  
    ASSUMING
         - End user nhập mã KH, loại KH, số kênh cao cấp, sô kết nối với loại KH DN
        
    INPUT
         - Tạo biến usernumber nhận giá trị từ input có id usernumber
         - Tạo biến userType nhận giá trị từ input có id userType
         - Tạo biến premiumChannel nhận giá trị từ input có id premiumChannel
         - Tạo biến countConection nhận giá trị từ input có id countConection
         - Tạo biến totalPrice để nhận giá trị là tổng số tiền KH cần thanh toán
         - Tạo biến invProCost nhận giá trị phí xử lý hoá đơn
         - Tạo biến servCharge nhận giá trị phí dịch vụ
         - Tạo biến preChannelPrice nhận giá trị phí cho mỗi kênh
         - Tạo biến showResult để gán giá trị string là các thẻ HTML
         
    HANDLE
         - Tạo function showInputConection để kiểm tra loại KH để hiện thị input có id countConection
            + Nhà Dân: Disable: true input có id countConection
            + Doanh Nghiệp: Disable: false input có id countConection
         - Kiểm tra loại KH:
            + Nhà Dân: 
               Formula:
                  totalPrice = invProcost + servCharge + premiumChannel * preChannelPrice
            + Doanh Nghiệp
               Formula:
               Nếu countConection <= 10 && > 0
                  totalPrice = invProcost + servCharge + premiumChannel * prechannelPrice + countConection * 7.5
               Ngược lại
                  totalPrice = invProcost + servCharge + premiumChannel * prechannelPrice + (countConection - 10) * 5 + 75

    OUTPUT
         - Hiển thị giá trị biến showResult ra div có id showTotalPrice
*/

function showInputConection() {
   let userType = document.getElementById("userType").value;

   if (userType === "A") {
      document.getElementById("countConection").disabled = true;
   } else if (userType === "B") {
      document.getElementById("countConection").disabled = false;
   }
}

function calcPrice(invProCost, servCharge, premiumChannel, preChannelPrice) {
   return invProCost + servCharge + premiumChannel * preChannelPrice;
}

function calcTotalPrice() {
   let usernumber = document.getElementById("usernumber").value;
   let userType = document.getElementById("userType").value;
   let premiumChannel = +document.getElementById("premiumChannel").value;
   let countConection = +document.getElementById("countConection").value;

   if (
      premiumChannel * countConection < 0 ||
      premiumChannel < 0 ||
      countConection < 0
   ) {
      showInfo(
         "showTotalPrice",
         "<p>Số kênh cao cấp và số kết nối không là số nguyên dương!</p>"
      );
      return;
   }

   let totalPrice = 0;

   if (userType === "A") {
      totalPrice = calcPrice(4.5, 20.5, premiumChannel, 7.5);
   } else if (userType === "B") {
      if (countConection <= 10) {
         totalPrice = calcPrice(15, 75, premiumChannel, 50);
      } else {
         totalPrice =
            calcPrice(15, 7.5, premiumChannel, 50) +
            9 * 7.5 +
            (countConection - 10) * 5;
      }
   }

   let showResult = "<div>";
   showResult += "<p>Mã KH: " + usernumber + "</p>";
   showResult += "<p>Loại KH: " + userType + "</p>";
   showResult += "<p>Số kết nối: " + countConection + "</p>";
   showResult += "<p>Số kênh cao cấp: " + premiumChannel + "</p>";
   showResult += "<p>Số tiền cần thanh toán: " + totalPrice + "</p>";

   showInfo("showTotalPrice", showResult);
}
