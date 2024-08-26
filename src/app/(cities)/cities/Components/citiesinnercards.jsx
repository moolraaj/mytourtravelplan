import Paginations from '@/app/_common/_paginations/paginations';
import LoadingBar from '@/app/_common/innerLoader/innerLoader';
import Image from 'next/image';
import Link from 'next/link';

const Explorations = ({ reversedCities, setPage, page, totalCities, limit}) => {
  
  if (!reversedCities || reversedCities.length === 0) {
    return  <div className="explorations"><LoadingBar /></div>;
  }

  return (
    <div className="explorations">
      <div className="explorations-grid">
        {reversedCities.map((exploration, index) => (
          <div key={index} className="exploration-item">
            <Link href={`/cities/${exploration.slug}`} passHref>
              {exploration.images && exploration.images.length > 0 ? (
                exploration.images.map((image) => (
                  <Image
                    key={image._id}
                    src={`/uploads/${image.name}`}
                    alt={exploration.title}
                    width={400}
                    height={330}
                    className="exploration-image"
                  />
                ))
              ) : null}
            </Link>
            <div className="exploration-details">
              <div className="explore_l">
                <h3>Explorations {exploration.title}</h3>
                <p>Packages in {exploration.title}: {exploration.packagesCount}</p>
              </div>
              <div className="icon_custom">
                <img src="/images/arrowu.png" alt="Arrow" />
              </div>
            </div>
          </div>
        ))}
      </div>
      <Paginations
          page={page}
          limit={limit}
          totalItems={totalCities}
          setPage={setPage}
        />
    </div>
  );
};

export default Explorations;
