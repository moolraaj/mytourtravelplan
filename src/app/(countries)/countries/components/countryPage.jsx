import LoadingBar from '@/app/_common/innerLoader/innerLoader';
import Image from 'next/image';
import Link from 'next/link';
 
 


const CountryPage = ({ country }) => {

  return (
    <div className="explorations">
      <div className="explorations-grid">
        {country===null||country===undefined?(<LoadingBar/>):(country?.map((exploration, index) => (
          <div key={index} className="exploration-item">
            <Link href={`/countries/${exploration.slug}`}  >
             
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
                <p>Cities in {exploration.title} {exploration.totalCities}</p>
              </div>
              <div className='icon_custom'>
                <img src='/images/arrowu.png' />
              </div>
            </div>
          </div>
        )))}
      </div>
    </div>
  );
};

export default CountryPage;
