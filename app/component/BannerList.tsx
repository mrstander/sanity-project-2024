import Image from 'next/image';
import { client } from '@/sanity/lib/client';
import imageUrlBuilder from '@sanity/image-url';
import Link from 'next/link';

// Create a URL builder instance
const builder = imageUrlBuilder(client);

// Helper function to get the image URL
function urlFor(source: any) {
  return builder.image(source);
}

async function GetPosts() {
  const query = `
    *[_type == "banner"] | order(position asc) {
      header,
      slug {
        current
      },
      poster {
        asset -> {
          _id,
          url
        }
      },
      mobilePoster {
        asset -> {
          _id,
          url
        }
      },
      copy,
      textAlign,
      ctaText,
      ctaLink,
      ctaBgColor,
      mobileCtaText,
      posterUrl,
      position
    }`;
  const data = await client.fetch(query);
  return data;
}

export const revalidate = 60;

const textAlignClass = (align: any) => {
  switch (align) {
    case 'left':
      return 'text-left';
    case 'center':
      return 'text-center';
    case 'right':
      return 'text-right';
    default:
      return 'text-left'; // Default to left if no alignment specified
  }
};

export default async function Home() {
  const posts = await GetPosts();
  const topBanner = posts.find((post: { position: number; }) => post.position === 0);
  const remainingBanners = posts.filter((post: { position: number; }) => post.position > 0 && post.position <= 3);

  return (
    <main className="w-full">
      <div>
        {topBanner && topBanner.posterUrl && (
          <div key={topBanner.slug.current} className="post-item w-full mb-8 relative">
            <Link href={topBanner.posterUrl}>
            <div className="relative w-full h-[500px] hidden md:block">
              {/* Top Banner view */}
            
              {topBanner.poster?.asset?.url(  
                
                <Image
                  src={urlFor(topBanner.poster).width(2000).url()}
                  alt={topBanner.header}
                  layout="fill"
                  objectFit="cover"
                />
              
              )}
              <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-4 md:p-8 z-10">
                <div className={`w-full ${textAlignClass(topBanner.textAlign)}`}>
                  <h2 className={`font-bold text-4xl mb-4 md:text-5xl ${textAlignClass(topBanner.textAlign)}`}>{topBanner.header}</h2>
                  {topBanner.copy && (
                    <div className={`w-full ${textAlignClass(topBanner.textAlign)}`}>
                      {topBanner.copy.map((block: any, index: any) => (
                        <p className='text-xl' key={index}>{block.children[0].text}</p>
                      ))}
                    </div>
                  )}
                  {topBanner.ctaText && topBanner.ctaLink && (
                    <Link
                      href={topBanner.ctaLink}
                      className="mt-4 inline-block text-black py-2 px-4"
                      style={{ backgroundColor: topBanner.ctaBgColor || '#0000FF' }}
                    >
                      {topBanner.ctaText}
                    </Link>
                  )}
                </div>
              </div>
            </div>
            </Link>
          </div>
        )}
        {remainingBanners.map((post: any) => (
          <div key={post.slug.current} className="post-item w-full mb-8 relative">
            <div className="relative w-full h-[500px] hidden md:block">
              {/* Desktop view */}
              {post.poster?.asset?.url && (  
                <Image
                  src={urlFor(post.poster).width(2000).url()}
                  alt={post.header}
                  layout="fill"
                  objectFit="cover"
                />
              )}
              <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-4 md:p-8 z-10">
                <div className={`w-full ${textAlignClass(post.textAlign)}`}>
                  <h2 className={`font-bold text-4xl mb-4 md:text-5xl ${textAlignClass(post.textAlign)}`}>{post.header}</h2>
                  {post.copy && (
                    <div className={`w-full ${textAlignClass(post.textAlign)}`}>
                      {post.copy.map((block: any, index: any) => (
                        <p className='text-xl' key={index}>{block.children[0].text}</p>
                      ))}
                    </div>
                  )}
                  {post.ctaText && post.ctaLink && (
                    <Link
                      href={post.ctaLink}
                      className="mt-4 inline-block text-black py-2 px-4"
                      style={{ backgroundColor: post.ctaBgColor || '#0000FF' }}
                    >
                      {post.ctaText}
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
                  ))}
                  </div>
                </main>
              );
            }
            
