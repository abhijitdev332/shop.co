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
            <div className="flex flex-col items-center md:items-start gap-8 p-5 lg:p-20 z-[5]">
              <h2 className={cl(style.hero__title)}>
                find Clothes that matches your style
              </h2>
              <p className={cl(style.hero__para)}>
                Browse through our diverse range of meticulously crafted
                garments, designed to bring out your individuality and cater to
                your sense of style.
              </p>
              <button
                className="btn btn-active w-40  rounded-badge text-lg"
                onClick={() => {
                  navigate("/product/category");
                }}
              >
                Shop Now
              </button>
              <div className="flex gap-2 flex-wrap">
                <HeroStats title="International Brands" number="200" />
                <div className="divider divider-horizontal"></div>
                <HeroStats title="High-Quality Products" number="2,000" />
                <div className="divider divider-horizontal"></div>
                <HeroStats title="Happy Coustomers" number="30,000" />
              </div>
            </div>
            <img
              src={heroImg}
              className={cl("relative md:absolute", style.hero__img)}
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
      <div className="flex justify-between flex-wrap gap-3">
        {bannerData.map((ele) => {
          return (
            <img src={ele} alt="brand img" className={style.hero__brand__img} />
          );
        })}
      </div>
    </div>
  );
}
function HeroStats({ title = "", number = "" }) {
  return (
    <div className="flex flex-col">
      <div className="font-semibold text-3xl">
        <span>{number}+</span>
      </div>
      <div className="title  text-sm text-gray-700 leading-4">
        <span>{title}</span>
      </div>
    </div>
  );
}

export default Hero;
