import { client } from '@/sanity/lib/client';
import imageUrlBuilder from '@sanity/image-url';

// Create a URL builder instance
const builder = imageUrlBuilder(client);

// Helper function to get the image URL
function urlFor(source: any) {
  return builder.image(source);
}

async function GetBanners() {
  const query = `
    *[_type == "page"] {
      title,
      banners[] {
        _ref,
        title,
        "image": image.asset->url,
        "alt": image.alt
      }
    }`;
  const data = await client.fetch(query);
  return data;
}

export const revalidate = 60;

export default async function Banner() {
  const pages = await GetBanners();

  return (
    <main>
      <div>
        {pages.map((page: any) => (
          <div key={page.title}>
            <h1 className='font-bold'>{page.title}</h1>
            <div>
              {page.banners.map((banner: any) => (
                <div key={banner._ref}>
                  <h2>{banner.title}</h2>
                  {banner.image ? (
                    <img src={urlFor(banner.image).url()} alt={banner.alt} />
                  ) : (
                    <p>No image available</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
