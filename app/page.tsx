import Banner from "./component/Banner";
import BannerList from "./component/BannerList"



export const revalidate = 30;
export default function Home() {


  return (
    <main>
      <BannerList/>

    </main>
  );
}
