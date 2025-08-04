import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { FeaturedProduct as FeaturedProductType } from "@/lib/api"

interface FeaturedProductProps {
  product: FeaturedProductType
}

export default function FeaturedProduct({ product }: FeaturedProductProps) {
  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-lg p-4 lg:p-8 max-w-sm lg:max-w-md mx-auto text-center">
      <Badge className="bg-yellow-500 text-black mb-4 text-xs lg:text-sm">SALE</Badge>
      <Image
        src={product.image || "/placeholder.svg"}
        alt={product.name}
        width={200}
        height={300}
        className="mx-auto mb-4 w-32 lg:w-48 h-auto"
      />
      <h3 className="text-lg lg:text-xl font-bold mb-2 line-clamp-2">{product.name}</h3>
      <div className="flex justify-center items-center gap-2 mb-4">
        <span className="text-xl lg:text-2xl font-bold text-yellow-600">{product.price}</span>
        <span className="text-sm">đ</span>
        {product.originalPrice && <span className="text-sm text-gray-500 line-through">{product.originalPrice}đ</span>}
      </div>
      <Link href={`/products/${product.id}`}>
        <Button className="bg-black text-white hover:bg-gray-800 w-full mb-4 text-sm lg:text-base">ADD TO CART</Button>
      </Link>
      <div className="grid grid-cols-4 gap-1 lg:gap-2 text-center text-xs lg:text-sm">
        <div>
          <div className="font-bold text-yellow-600 text-base lg:text-lg">{product.countdown.days}</div>
          <div className="text-gray-600">DAYS</div>
        </div>
        <div>
          <div className="font-bold text-yellow-600 text-base lg:text-lg">{product.countdown.hours}</div>
          <div className="text-gray-600">HOURS</div>
        </div>
        <div>
          <div className="font-bold text-yellow-600 text-base lg:text-lg">{product.countdown.minutes}</div>
          <div className="text-gray-600">MINS</div>
        </div>
        <div>
          <div className="font-bold text-yellow-600 text-base lg:text-lg">{product.countdown.seconds}</div>
          <div className="text-gray-600">SECS</div>
        </div>
      </div>
    </div>
  )
}
