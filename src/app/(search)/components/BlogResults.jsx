import Image from 'next/image';
import Link from 'next/link';
import blogbg from '../../assets/home_images/blog-bg.png';
import emptyImage from '../../assets/empty.jpg';
import { format } from 'date-fns';

const BlogResults = ({ results }) => {
  let reversedBlogs = Array.isArray(results) ? [...results].reverse() : [];
    return (
      <>
      <div className="results-section">

          <h2>Blogs:</h2>
      <div className="latest-blog">
        <div className="blog-container">
          {reversedBlogs=== undefined||reversedBlogs===null ? (
            <EmptyBlogComponent/>
          ) : (
            <>
        
              <div className="blog-main">
                {reversedBlogs.map((ele) => {
                  const formattedDate = format(new Date(ele.createdAt), 'dd MMM yyyy');

                  return (
                    <Link href={`/blog/${ele.slug}`} key={ele._id}>
                    <div >
                      {ele.images?.map((e) => (
                        <Image
                          key={e._id}
                          src={`/uploads/${e.name}`}
                          alt={e.name}
                          width={400}
                          height={250}
                          className="image"
                        />
                      ))}
                      <div className="blog-content">
                        <div className='title_date'>
                          <span className="category">{ele.category?.name || 'Uncategorized'}</span>
                          <span className="date">{formattedDate}</span>
                        </div>
                        <h3>{ele.title}</h3>
                      </div>
                    </div>
                    </Link>
                  );
                 
                })}
              </div>
            </>
          )}
        </div>
      </div>

      </div>
      </>
    );
  };
  
  export default BlogResults;
  