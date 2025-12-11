$(function () {

    var productModal = $("#productModal");

    /* ============================
       LOAD PRODUCT LIST
    ============================ */
    $.get(productListApiUrl, function (response) {

        if (response) {
            let table = "";

            $.each(response, function (index, product) {
                table += `
                    <tr data-id="${product.product_id}">
                        <td style="display:none;">${product.product_id}</td>
                        <td>${product.product_name}</td>
                        <td>${product.uom_name}</td>
                        <td>${product.price_per_unit}</td>
                        <td>
                            <span class="btn btn-xs btn-danger delete-product">Delete</span>
                        </td>
                    </tr>
                `;
            });

            $("table tbody").html(table);
        }
    });


    /* ============================
       SAVE PRODUCT (ADD/UPDATE)
    ============================ */
    $("#saveProduct").on("click", function () {

        var formData = $("#productForm").serializeArray();

        var requestPayload = {
            product_id: $("#id").val() || 0,
            product_name: "",
            uom_id: "",
            price_per_unit: ""
        };

        formData.forEach(e => {
            if (e.name === "name") requestPayload.product_name = e.value;
            if (e.name === "uoms") requestPayload.uom_id = e.value;
            if (e.name === "price") requestPayload.price_per_unit = e.value;
        });

        callApi("POST", productSaveApiUrl, {
            data: JSON.stringify(requestPayload),
            contentType: "application/json"
        });
    });



    /* ============================
       DELETE PRODUCT
    ============================ */
    $(document).on('click', '.delete-product', function () {

        let productId = $(this).closest("tr").data("id");

        if (confirm("Are you sure you want to delete this product?")) {

            callApi("POST", productDeleteApiUrl, {
                data: JSON.stringify({ id: productId }),
                contentType: "application/json"
            });
        }
    });



    /* ============================
       RESET MODAL ON CLOSE
    ============================ */
    productModal.on('hide.bs.modal', function () {
        $("#id").val(0);
        $("#name").val("");
        $("#price").val("");
        $("#uoms").val("");
        productModal.find(".modal-title").text("Add New Product");
    });



    /* ============================
       LOAD UOM DROPDOWN
    ============================ */
    productModal.on("show.bs.modal", function () {

        $.get(uomListApiUrl, function (response) {

            if (response) {
                let options = `<option value="">--Select--</option>`;

                response.forEach(u => {
                    options += `<option value="${u.uom_id}">${u.uom_name}</option>`;
                });

                $("#uoms").html(options);
            }
        });
    });

});
