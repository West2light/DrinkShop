import Image from "next/image"

export default function ProductCompare() {
    return (
        <div className="mb-6 lg:mb-8 hidden lg:block">
            <h3 className="text-lg font-bold mb-4 border-b pb-2">
                SO SÁNH SẢN PHẨM
                <Image
                    src="/Image_Rudu/titleleft-dark.png"
                    alt="arrow-trang-tri"
                    width={16}
                    height={16}
                />
            </h3>
            <p className="text-sm text-gray-600">Bạn chưa có sản phẩm nào để so sánh</p>
        </div>
    )
}
