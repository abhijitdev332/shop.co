import React from "react";
import ApplePay from "../../assets/svgs/apple-pay.svg";
import MasterCard from "../../assets/svgs/mastercard.svg";
import Paypal from "../../assets/svgs/paypal.svg";
import Visa from "../../assets/svgs/visa.svg";
import {
  FaTwitter,
  FaFacebook,
  FaInstagram,
  FaSquareGithub,
} from "react-icons/fa6";

const Footer = () => {
  const paymentGatways = [Visa, MasterCard, Paypal, ApplePay];
  return (
    <>
      <div className="lg:container lg:mx-auto">
        <footer className="footer bg-white p-5 sm:p-10">
          <aside>
            <h3 className="w-40 text-ellipsis">
              <span className="font-extrabold text-2xl leading-tight">
                SHOP CO.
              </span>

              <br />
              <span className="text-xs">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Id
                atque dolor.
              </span>
            </h3>
            <div className="flex gap-3">
              <span className="p-2 outline hover:bg-black  outline-1 rounded-full cursor-pointer">
                <FaTwitter className="hover:text-white" />
              </span>
              <span className="p-2 outline outline-1 hover:bg-black rounded-full cursor-pointer">
                <FaFacebook />
              </span>
              <span className="p-2 outline outline-1 hover:bg-black rounded-full cursor-pointer">
                <FaInstagram />
              </span>
              <span className="p-2 outline outline-1 hover:bg-black rounded-full cursor-pointer">
                <FaSquareGithub />
              </span>
            </div>
          </aside>
          <div className="flex flex-wrap">
            <nav className="flex flex-col px-5 py-2">
              <h6 className="footer-title">Services</h6>
              <a className="link link-hover">Branding</a>
              <a className="link link-hover">Design</a>
              <a className="link link-hover">Marketing</a>
              <a className="link link-hover">Advertisement</a>
            </nav>
            <nav className="flex flex-col px-5 py-2">
              <h6 className="footer-title">Company</h6>
              <a className="link link-hover">About us</a>
              <a className="link link-hover">Contact</a>
              <a className="link link-hover">Jobs</a>
              <a className="link link-hover">Press kit</a>
            </nav>
            <nav className="flex flex-col px-5 py-2">
              <h6 className="footer-title">Legal</h6>
              <a className="link link-hover">Terms of use</a>
              <a className="link link-hover">Privacy policy</a>
              <a className="link link-hover">Cookie policy</a>
            </nav>
          </div>
        </footer>
        <div className="divider"></div>
        <div className="wrapper py-6 px-5 sm:px-10">
          <div className="flex justify-between">
            <div className="copy-wrapper">
              <p className="text-xs text-black font-medium">
                Shop.co &copy;2024,All Rights reserved
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              {paymentGatways.map((ele) => (
                <img src={ele} className="w-[2rem] h-[2rem]" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
