// productPrice.replace(/'/g, " ");
// lấy giá trị sản phẩm
const btn = document.querySelectorAll("button");
btn.forEach(function (button, index) {
  button.addEventListener("click", function (even) {
    var btnItem = even.target; // lấy sự kiện click cụ thể là button
    var product = btnItem.parentNode; //lấy thằng cha
    var productImg = product.querySelector(".product-item img").src; // lấy ảnh
    var productName = product.querySelector(".product-item-text h1").innerText; // lấy tên
    var productPrice = product.querySelector(
      ".product-item-text span"
    ).innerHTML; // lấy giá
    addCart(productImg, productName, productPrice);
  });
});
//   console.log(cartTable)
// thêm giỏ hàng
function addCart(productImg, productName, productPrice) {
  var addTr = document.createElement("tr");
  var cartItem = document.querySelectorAll("tbody tr"); //xử lý khi người ta thêm 2 sản phẩm giống nhau
  for (var i = 0; i < cartItem.length; i++) {
    var productT = document.querySelectorAll(".title");
    if (productT[i].innerHTML == productName) {
      alert(
        "sản phẩm của bạn đã có trong giỏ hàng, vui lòng vào giỏ hàng để điều chỉnh số lượng"
      );
      return;
    }
  }
  var trcontent = `<td style="display: flex; align-items: center;"><img style="width: 70px;" src="${productImg}" alt="${productName}"><span class= "title">${productName}</span></td><td><span class="price">${productPrice}</span><sup>đ</sup></td><td><input style="width: 40px; outline: none; font-size: 18px;" type="number" value="1" min="1"></td><td style="cursor: pointer; font-size: 20px;"><i class="bi bi-trash3-fill"></i></td>`;
  addTr.innerHTML = trcontent;
  var cartTable = document.querySelector("tbody");
  cartTable.append(addTr);
  cartTotal();
  deleteCart();
  checkCart();
  inputChange();
  myNotification();
}
// tính tổng tiền
function cartTotal() {
  var cartItem = document.querySelectorAll("tbody tr"); // lấy thẻ tr chưa thông tin của 1 sản phẩm ra
  var tottalPriceC = 0;
  for (var i = 0; i < cartItem.length; i++) {
    var inputValue = cartItem[i].querySelector("input").value; // lấy số lượng sản phẩm trong input
    // console.log(inputValue);
    var productValuePriceStr = cartItem[i].querySelector(".price").innerHTML; // lấy tiền trong thẻ span
    var productValuePrice = parseFloat(productValuePriceStr.replace(/\D/g, ""));
    // console.log(productValuePrice);
    var tottalPriceA = inputValue * productValuePrice;
    // var tottalPriceB = tottalPriceA.toLocaleString("de-DE");
    // console.log("giá: " + tottalPriceB);
    tottalPriceC = tottalPriceC + tottalPriceA;
    // console.log("tổng tiền: " + tottalPriceC);
  }
  var cartTotalResult = document.querySelector(".price-total span");
  var cartshow = document.querySelector(".cart-show span");
  cartshow.innerHTML = tottalPriceC.toLocaleString("de-DE");
  cartTotalResult.innerHTML = tottalPriceC.toLocaleString("de-DE");
}
// tính lại tổng khi tăng số lượng
function inputChange() {
  var cartItem = document.querySelectorAll("tbody tr");
  for (var i = 0; i < cartItem.length; i++) {
    var inputValueChg = cartItem[i].querySelector("input");
    inputValueChg.onclick = () => {
      cartTotal();
    };
    // console.log(productN);
  }
}
// xóa cart
function deleteCart() {
  var cartItem = document.querySelectorAll("tbody tr");
  var trashIcons = document.querySelectorAll(".bi-trash3-fill");
  trashIcons.forEach(function (trashIcon, index) {
    trashIcon.addEventListener("click", () => {
      cartItem[index].remove();
      cartTotal();
      checkCart();
    });
  });
}

// kiểm tra xem đã có sản phẩm chưa , nếu có mới hiện tổng tiền:
function checkCart() {
  var cartItem = document.querySelectorAll("tbody tr");
  if (cartItem.length > 0) {
    // cartItem.innerHTML =
    document.querySelector(".form").style.display = "block";
    document.querySelector(".price-total").style.display = "block";
  }
}

// show cart
var showCart = document.querySelector(".cart-show button");
showCart.onclick = () => {
  document.querySelector(".cart").style.display = "block";
  myOverlay();
};
// Đóng cart
var closeCart = document.querySelector(".close-btn");
closeCart.onclick = () => {
  console.log(closeCart);
  document.querySelector(".cart").style.display = "none";
  closeMyOverlay();
};
// troll
var troll = document.querySelector(".finish");
troll.onclick = () => {
  alert("Có Tiền Không Mà Chốt");
};
// thông báo đã thêm sản phẩm vào giỏ hàng
var notifi = document.querySelector(".Notification");
function myNotification() {
  // Hiển thị thông báo
  notifi.style.display = "flex";
  void notifi.offsetWidth;
  notifi.classList.add("fade-out");
  setTimeout(function () {
    notifi.classList.remove("fade-out");
    notifi.style.display = "none";
  }, 5000);
}
// mở lớp overlay
var eventOverlay = document.querySelector(".overlay");
function myOverlay() {
  eventOverlay.style.display = "block";
}
// đóng overlay;
var coloseEventOverlay = document.querySelector(".overlay");
function closeMyOverlay() {
  coloseEventOverlay.style.display = "none";
}
// bấm vào chính nó cũng tắt
eventOverlay.addEventListener("click", function () {
  document.querySelector(".cart").style.display = "none";
  closeMyOverlay();
});
