import Image from 'next/image';
import Link from 'next/link';
 
const explorations = [
  { country: 'Switzerland', city: 'Zurich', imgSrc: '/images/switzerland.png' },
  { country: 'Sweden', city: 'Stockholm', imgSrc: '/images/sweden.png' },
  { country: 'Spain', city: 'Barcelona', imgSrc: '/images/spain.png' },
  { country: 'Slovenia', city: 'Ljubljana', imgSrc: '/images/slovenia.png' },
  { country: 'Slovakia', city: 'Bratislava', imgSrc: '/images/slovakia.png' },
  { country: 'Portugal', city: 'Porto', imgSrc: '/images/portugal.png' },
];



const Explorations = ({ reversedCities }) => {

  return (
    <div className="explorations">
      <div className="explorations-grid">
        {reversedCities?.map((exploration, index) => (
          <div key={index} className="exploration-item">
            <Link href={`/cities/${exploration.slug}`}  >
             
              {exploration.images && exploration.images.length > 0 ? (
                exploration.images.map((image) => (
                  <Image
                    key={image._id}
                    src={`/uploads/${image.name}`}
                    alt='cities'
                    width={400}
                    height={330}
                    className="exploration-image"
                  />
                ))
              ) : (
                // <Image
                //   src={emptyImage.src}
                //   alt="No Image Available"
                //   width={400}
                //   height={330}
                //   className="exploration-image"
                // />
                null
              )}
            </Link>
            <div className="exploration-details">
              <div className='explore_l'>
                <h3>Explorations {exploration.title}</h3>
                <p>Packges in {exploration.title} {exploration.packagesCount}</p>
              </div>
              <div className='icon_custom'>
                <img src='/images/arrowu.png' />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Explorations;
