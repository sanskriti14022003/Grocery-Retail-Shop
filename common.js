// ====== API URLs ======
var productListApiUrl = 'http://127.0.0.1:5000/getProducts';
var uomListApiUrl = 'http://127.0.0.1:5000/getUOM';
var productSaveApiUrl = 'http://127.0.0.1:5000/insertProduct';
var productDeleteApiUrl = 'http://127.0.0.1:5000/deleteProduct';
var orderListApiUrl = 'http://127.0.0.1:5000/getAllOrders';
var orderSaveApiUrl = 'http://127.0.0.1:5000/insertOrder';
var productsApiUrl = 'https://fakestoreapi.com/products';


// ====== Generic API caller ======
function callApi(method, url, payload)
 {
    $.ajax({
        method: method,
        url: url,
        data: JSON.stringify(payload),
        contentType: "application/json",
        success: function(msg) {
            window.location.reload();
        },
        error: function(err) {
            console.error("API Error:", err);
        }
    });
}




// ====== Total Price Calculation ======
function calculateValue() {
    var total = 0;
    $(".product-item").each(function () {

        var qty = parseFloat($(this).find('.product-qty').val()) || 0;
        var price = parseFloat($(this).find('#product_price').val()) || 0;

        var itemTotal = qty * price;
        $(this).find('#item_total').val(itemTotal.toFixed(2));

        total += itemTotal;
    });

    $("#product_grand_total").val(total.toFixed(2));
}



// ====== Product Parser ======
function productParser(product) {
    return {
        id: product.product_id,
        name: product.product_name,
        unit: product.uom_name,
        price: product.price_per_unit
    };
}



// ====== Order Parser ======
function orderParser(order) {
    return {
        id: order.order_id,
        date: order.order_date,
        orderNo: order.order_id,
        customerName: order.customer_name,
        cost: order.total
    };
}



// ====== Fake Store Product Parser ======
function productDropParser(product) {
    return {
        id: product.id,
        name: product.title
    };
}
