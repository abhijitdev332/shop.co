import React from "react";
import heroImg from "../../assets/images/hero/hero.png";
import chanel from "../../assets/svgs/brands/chanel.svg";
import versace from "../../assets/svgs/brands/versace.svg";
import gucci from "../../assets/svgs/brands/gucci.svg";
import prada from "../../assets/svgs/brands/prada.svg";
import zara from "../../assets/svgs/brands/zara.svg";
import cl from "classnames";
import style from "./hero.module.scss";
import { useNavigate } from "react-router-dom";
const Hero = () => {
  const navigate = useNavigate();
  return (
    <main className="overflow-hidden">
      <div className="">
        <div className="relative h-fit">
          <div className="flex flex-col bg-[#F2F0F1] sm:bg-transparent">
            <div className="flex flex-col items-center md:items-start gap-8 p-5 lg:p-20 z-[1]">
              <h2
                className={cl(
                  "text-center text-2xl font-extrabold capitalize md:text-start md:text-5xl md:w-2/4"
                )}
              >
                find Clothes that matches your style
              </h2>
              <p
                className={cl(
                  "text-center text-sm capitalize md:text-start  md:w-1/3"
                )}
              >
                Browse through our diverse range of meticulously crafted
                garments, designed to bring out your individuality and cater to
                your sense of style.
              </p>
              <button
                className="btn  w-40  text-white rounded-badge text-lg"
                onClick={() => {
                  navigate("/product/category");
                }}
              >
                Shop Now
              </button>
              <div className="flex  gap-3 flex-wrap">
                <HeroStats title="International Brands" number="200" />
                <HeroStats title="High-Quality Products" number="2,000" />
                <HeroStats title="Happy Coustomers" number="30,000" />
              </div>
            </div>
            <img
              src={heroImg}
              className={cl("relative md:absolute z-0", style.hero__img)}
              alt=""
            />
          </div>
        </div>
      </div>
      <HeroBanner />
    </main>
  );
};

function HeroBanner() {
  const bannerData = [versace, zara, gucci, prada, chanel];

  return (
    <div className="py-4 px-10 bg-base border-b-2">
      <div className="flex justify-center gap-4  flex-wrap md:justify-between">
        {bannerData.map((ele) => {
          return (
            <img
              src={ele}
              alt="brand img"
              className={cl(style.hero__brand__img, " size-full max-w-[8rem]")}
            />
          );
        })}
      </div>
    </div>
  );
}
function HeroStats({ title = "", number = "" }) {
  return (
    <>
      <div className="divider divider-horizontal"></div>
      <div className="flex flex-col">
        <div className="font-semibold  md:text-3xl">
          <span>{number}+</span>
        </div>
        <div className=" text-xs md:text-sm text-gray-700 leading-4">
          <span>{title}</span>
        </div>
      </div>
    </>
  );
}

export default Hero;
