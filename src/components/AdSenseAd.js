import { useEffect } from "react";

const AdSenseAd = () => {
  useEffect(() => {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={{ display: "block" }}
      data-ad-client="ca-pub-XXXXXXXXXX" 
      data-ad-slot="XXXXXXXXXX"
      data-ad-format="auto"
    ></ins>
  );
};

export default AdSenseAd;
