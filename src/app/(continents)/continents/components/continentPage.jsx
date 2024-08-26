import Paginations from '@/app/_common/_paginations/paginations';
import LoadingBar from '@/app/_common/innerLoader/innerLoader';
import Image from 'next/image';
import Link from 'next/link';

const ContinentPage = ({ reversedContinents,setPage, page, totalContinents, limit }) => {

  if (!reversedContinents || reversedContinents.length === 0) {
    return <div className="explorations"><LoadingBar /></div>;
  }

  return (
    <div className="explorations">
      <div className="explorations-grid">
        {reversedContinents.map((exploration, index) => (
          <div key={index} className="exploration-item">
            <Link href={`/continents/${exploration.slug}`} >
              {exploration.images && exploration.images.length > 0 ? (
                exploration.images.map((image) => (
                  <Image
                    key={image._id}
                    src={`/uploads/${image.name}`}
                    alt="cities"
                    width={400}
                    height={330}
                    className="exploration-image"
                  />
                ))
              ) : (
                null
              )}
            </Link>
            <div className="exploration-details">
              <div className="explore_l">
                <h3>Explorations {exploration.title}</h3>
                <p>Countries in {exploration.title}: {exploration.total_countries}</p>
              </div>
              <div className="icon_custom">
                <img src="/images/arrowu.png" alt="arrow" />
              </div>
            </div>
          </div>
        ))}
      </div>
      <Paginations
          page={page}
          limit={limit}
          totalItems={totalContinents}
          setPage={setPage}
        />
    </div>
  );
};

export default ContinentPage;
