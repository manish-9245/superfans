import Image from "next/image";
/**
 * Renders a grid of images.
 *
 * @returns The ImageGrid component.
 */
const ImageGrid = () => {
  return (
    <div className="container mx-auto pt-5">
      <div className="flex justify-center">
        <div className="flex grid-cols-3 flex-wrap">
          <div className="flex w-1/3 flex-wrap">
            <div className="max-h-60 w-full p-1 md:p-2">
              <Image
                alt="gallery"
                className="block h-full w-full rounded-lg object-cover object-center duration-150 ease-in hover:scale-105"
                width={200}
                height={200}
                src="/images/hero/khaby.jpeg"
              />
            </div>
          </div>
          <div className="flex w-1/3 flex-wrap">
            <div className="max-h-60 w-full p-1 md:p-2">
              <Image
                alt="gallery"
                className="block h-full w-full rounded-lg object-cover object-center duration-150 ease-in hover:scale-105"
                width={200}
                height={200}
                src="/images/hero/gustavo.jpeg"
              />
            </div>
          </div>
          <div className="flex w-1/3 flex-wrap">
            <div className="max-h-60 w-full p-1 md:p-2">
              <Image
                alt="gallery"
                className="block h-full w-full rounded-lg object-cover object-center duration-150 ease-in hover:scale-105"
                width={200}
                height={200}
                src="/images/hero/selena.jpeg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ImageGrid;