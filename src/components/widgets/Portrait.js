import Image from 'next/image';

const PortraitImageCrop = ({ 
  src, 
  alt, 
  width = 300, 
  height = 400, 
  objectPosition = 'center'
}) => {
  return (
    <div 
      className="relative overflow-hidden" 
      style={{ width, height }}
    >
      <Image 
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover "
        style={{ 
          objectPosition 
        }}
        quality={90}
      />
    </div>
  );
};

export default PortraitImageCrop;