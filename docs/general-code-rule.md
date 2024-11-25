# 1. Khai báo API

Dựa theo Module: **Sinh viên** hoặc **Giảng viên**

Form cấu trúc:

**ApiSinhVien(ApiGiangVien)/Ten_Module/fileApi_ChucNang.js**

Hoặc

**ApiSinhVien(ApiGiangVien)/Ten_Module_Cha/Ten_Module_Con/fileApi_ChucNang.js**

Hoặc có thể rút ngắn nếu module hoặc chức năng không phân nhiều luồng

## Ví dụ:

```
📦Apis
 ┣ 📂ApiGiangVien
 ┃ ┣ 📂ThuTucHanhChinhGiangVien
 ┃ ┃ ┣ 📜apiLePhi.js
 ┃ ┃ ┣ 📜apiMucDo.js
 ┃ ┃ ┣ 📜apiPhanQuyen.js
 ┃ ┃ ┣ 📜apiThanhPhanHoSo.js
 ┃ ┃ ┣ 📜apiThongKeTTHCGV.js
 ┃ ┃ ┣ 📜apiThuTucHanhChinhGiangVien.js
 ┃ ┃ ┣ 📜apiTrangThai.js
 ┃ ┃ ┗ 📜apiTrinhTuThucHien.js
 ┣ 📂MotCua
 ┃ ┣ 📂CTSV
 ┃ ┃ ┣ 📜apiNghiHocTamThoi.js
 ┃ ┃ ┣ 📜apiQuaTrinhHoc.js
 ┃ ┃ ┣ 📜apiXacNhan.js
 ┃ ┃ ┗ 📜apiXinChuyen.js
 ┃ ┣ 📂KhaoThi
 ┃ ┃ ┣ 📜apiDangKyThiLai.js
 ┃ ┃ ┣ 📜apiHoanThi.js
 ┃ ┃ ┣ 📜apiHuyDangKyThiLai.js
 ┃ ┃ ┣ 📜apiKetQuaHocTap.js
 ┃ ┃ ┣ 📜apiLichThi.js
 ┃ ┃ ┗ 📜apiPhucKhao.js

```

# 2. Khai báo queryKey đối với việc lấy dữ liệu

- dùng với việc query theo React-query (**useQuery**)

- [**Folder lưu trữ**](/src/Services/QueryStores/QueryKeyStores/)

## Ví dụ:

Path: **src\Services\QueryStores\QueryKeyStores\CongTacGiangVien.querykey.js**

# 3. Cấu trúc WebPage

Còn cấu trúc 1 WebPage có thể khai báo như sau:

1. components ( cái này là sẽ khai báo components dành riêng cho page đó - không có tính tái sử dụng nhiều)

2. index.jsx (root page)

3. PageView

4. constants.js (constants dành riêng cho page đó - không có tính tái sử dụng nhiều)

5. các file khác nếu cần

## Ví dụ:

```
📦XuLyDangKyThietBi
 ┣ 📂DanhSachDangKyThietBi (components: có thể tạo folder components hoặc folder tên component cụ thể)
 ┃ ┣ 📜index.jsx
 ┃ ┣ 📜TableBodyDSDKTB.jsx
 ┃ ┣ 📜TableHeadDSDKTB.jsx
 ┃ ┗ 📜TablePaginationDSDKTB.jsx
 ┣ 📜constants.js
 ┣ 📜validations.js
 ┣ 📜index.jsx
 ┗ 📜XuLyDangKyThietBiView.jsx (PageView)
```
