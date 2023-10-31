import { Product } from "@/types/Product";
import generateRandomInd from "@/utils/generateRandomInd";
import Image from "next/image";
import { FC } from "react"

type Props ={
  productsData: Product[]
}

const ImageGrid: FC<Props> = ({ productsData }) => {
  const productsImages = productsData.filter(product => product.category === 'books-comics').map((product: Product) => product.imgUrl);
  const productIndexes = generateRandomInd(productsImages.length);

  const first = productsImages[productIndexes[0]];
  const second = [productsImages[productIndexes[1]], productsImages[productIndexes[2]], productsImages[productIndexes[3]]];
  const third = [productsImages[productIndexes[4]], productsImages[productIndexes[5]], productsImages[productIndexes[6]]];

  return (
    <div className="mt-10">
      <div
        aria-hidden="true"
        className="pointer-events-none lg:absolute lg:inset-y-0 lg:mx-auto lg:w-full lg:max-w-7xl"
      >
        <div className="absolute w-xs overflow-hidden transform sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8">
          <div className="flex items-center space-x-6 lg:space-x-8">
            <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
              <div className="h-64 w-44 overflow-hidden rounded-lg shadow border sm:opacity-0 lg:opacity-100">
                <Image
                  loading="lazy"
                  src={first}
                  alt="grid-product-image"
                  className="h-full w-full object-contain object-center"
                  width={200}
                  height={200}
                  quality={100}
                />
              </div>
              <div className="h-64 w-44 overflow-hidden rounded-lg shadow border bg-slate-100">
                <Image
                  loading="lazy"
                  src={second[0]}
                  alt="grid-product-image"
                  className="h-full w-full object-contain object-center"
                  width={200}
                  height={200}
                  quality={100}
                />
              </div>
            </div>
            <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
              <div className="h-64 w-44 overflow-hidden rounded-lg shadow border bg-slate-100">
                <Image
                  loading="lazy"
                  src={second[1]}
                  alt="grid-product-image"
                  className="h-full w-full object-contain object-center"
                  width={200}
                  height={200}
                  quality={100}
                />
              </div>
              <div className="h-64 w-44 overflow-hidden rounded-lg shadow border bg-slate-100">
                <Image
                  loading="lazy"
                  src={second[2]}
                  alt="grid-product-image"
                  className="h-full w-full object-contain object-center"
                  width={200}
                  height={200}
                  quality={100}
                />
              </div>
              <div className="h-64 w-44 overflow-hidden rounded-lg shadow border bg-slate-100">
                <Image
                  loading="lazy"
                  src={third[0]}
                  alt="grid-product-image"
                  className="h-full w-full object-contain object-center"
                  width={200}
                  height={200}
                  quality={100}
                />
              </div>
            </div>
            <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
              <div className="h-64 w-44 overflow-hidden rounded-lg shadow border bg-slate-100">
                <Image
                  loading="lazy"
                  src={third[1]}
                  alt="grid-product-image"
                  className="h-full w-full object-contain object-center"
                  width={200}
                  height={200}
                  quality={100}
                />
              </div>
              <div className="h-64 w-44 overflow-hidden rounded-lg shadow border bg-slate-100">
                <Image
                  loading="lazy"
                  src={third[2]}
                  alt="grid-product-image"
                  className="h-full w-full object-contain object-center"
                  width={200}
                  height={200}
                  quality={100}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


export default ImageGrid