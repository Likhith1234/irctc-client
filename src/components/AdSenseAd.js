import { useEffect } from "react";

const AdSenseAd = () => {
  useEffect(() => {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={{ display: "block" }}
      data-ad-client="ca-pub-5300672564521736" 
      data-ad-slot="1055240995"
      data-ad-format="auto"
    ></ins>
  );
};

export default AdSenseAd;
