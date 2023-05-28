exports.getOrderListByUserId = async (req, res) => {
    res.status(201).json([
        {
         "orderId":1,
         "status": "chờ xác nhận",
         "products": [
            {
               "productId": 1,
               "status": "bình thường",
               "name": "giày thể thao nam",
               "quantity": 2,
               "price": 100000,
               "productImageUrl": "https://bizweb.dktcdn.net/100/415/697/products/ahu2keci-1-iirh-hinh-mat-truoc-01.jpg"
             }, 
         ], 
         "created_at": "2022-12-05",
         "update_at": "2022-12-06",
         "ship_price": 18000,
         "total_price": 500000,
         "from_address": "Minh Khai",
         "to_address": "Cầu giấy",
         "payment_method": "shoppe pay",
         "order_time": "2022-15-12",
         "pay_time": "2022-16-12 15:01",
         "shiptime_start_at" : "2022-16-12 15:01",
         "completed_at": "2022-18-12 15:01"
      } 
    ])
}