import { Product } from "@/types/Product";
import Image from "next/image";
import { FC } from "react"

type Props ={
  productsData: Product[]
}

const ImageGrid: FC<Props> = ({ productsData }) => {
  const productsImages = productsData.map((product: Product) => product.imgUrl);
  const first = [productsImages[0], productsImages[1]];
  const second = [productsImages[2], productsImages[3], productsImages[4]];
  const third = [productsImages[5], productsImages[6]];

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none lg:absolute lg:inset-y-0 lg:mx-auto lg:w-full lg:max-w-7xl"
    >
      <div className="absolute transform sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8">
        <div className="flex items-center space-x-6 lg:space-x-8">
          <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
            {first.map(productImg => (
              <div key={productImg} className="h-64 w-44 overflow-hidden rounded-lg sm:opacity-0 lg:opacity-100">
                <Image
                  src={productImg}
                  alt="grid-product-image"
                  className="h-full w-full object-cover object-center"
                  width={200}
                  height={200}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
          <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
            {second.map(productImg => (
              <div key={productImg} className="h-64 w-44 overflow-hidden rounded-lg">
                <Image
                  src={productImg}
                  alt="grid-product-image"
                  className="h-full w-full object-cover object-center"
                  width={200}
                  height={200}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
          <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
            {third.map(productImg => (
              <div key={productImg} className="h-64 w-44 overflow-hidden rounded-lg">
                <Image
                  src={productImg}
                  alt="grid-product-image"
                  className="h-full w-full object-cover object-center"
                  width={200}
                  height={200}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}


export default ImageGrid