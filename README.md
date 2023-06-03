# ITSS-BananaTeam

## Cách cài đặt project
#### Cài MongoDB
Project này sử dụng mongoDB để lưu dữ liệu phía backend. Truy cập vào đường link [install mongoDB](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-windows/) để xem cách cài đặt chi tiết (nếu dùng linux thì click vào nút "install on Linux" cũng có hướng dẫn chi tiết
#### Cài đặt server
Chuyển đường dẫn về server, sau đó chạy lệnh instal như dưới đây:
```shell
cd server
npm install
npm i nodemon
```
#### Cài đặt client
Chuyển đường dẫn về client, chạy lệnh install như dưới đây (khi chạy lệnh install mất thời gian khá lâu, khoảng 5p)
```shell
cd client
npm install
```

## Cách chạy project
Bước cài đặt ở phía trên chỉ cần thực hiện 1 lần, sau đó mỗi lần chạy project chỉ cần thực hiện cách lệnh sau đây
#### Khởi động server
```shell
cd server
npm run dev
```
Bước này sẽ khởi động server ở port 8000. Nếu port 8000 đã có app khác sử dụng, hệ thống sẽ báo lỗi
#### Khởi động client
```shell
cd client
npm start
```

## Cách thêm mới module
Chi tiết về cấu trúc project, cách thêm mới 1 module đã được nêu trong file project_description.docx
