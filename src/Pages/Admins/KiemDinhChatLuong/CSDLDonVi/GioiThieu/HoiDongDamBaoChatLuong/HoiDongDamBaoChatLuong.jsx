export default function HoiDongDamBaoChatLuong() {
  return (
    <>
      <div className="w-full bg-white p-4 rounded-xl">
        <h3 className="text-uneti-primary font-semibold text-xl pb-2">
          I. HỘI ĐỒNG ĐẢM BẢO CHẤT LƯỢNG
        </h3>
        <div className="pt-2 flex justify-center items-center">
          {/* scan here */}
          <div className="w-full max-w-[80%] aspect-[1/1.41] bg-white">
            <iframe
              className="w-full h-full"
              src="/doc/HoiDongDamBaoChatLuong.pdf"
            />
          </div>
        </div>
      </div>
    </>
  )
}
