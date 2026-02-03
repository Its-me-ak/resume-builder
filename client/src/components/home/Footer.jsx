import { Facebook, Github, Instagram, Linkedin, Twitter } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
            
                * {
                    font-family: 'Poppins', sans-serif;
                }
            `}</style>

      <footer className="flex flex-col items-center justify-center w-full py-20 bg-black text-white/70">
        <Link to="/">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-50 flex items-end">
            Resumify
            <span className="relative inline-block w-3 h-3 bg-green-500 rounded-full ml-0.5 -translate-y-1"></span>
          </h1>
        </Link>
        <p className="mt-4 text-center">
          Copyright © {new Date().getFullYear()} Resumify. All rights reserved.
        </p>
        <div className="flex items-center gap-4 mt-5">
          <Link className="hover:-translate-y-0.5 transition-all duration-300">
            <Instagram className="size-6 stroke-gray-300" />
          </Link>
          <Link className="hover:-translate-y-0.5 transition-all duration-300">
            <Linkedin className="size-6 stroke-gray-300" />
          </Link>
          <Link className="hover:-translate-y-0.5 transition-all duration-300">
            <Twitter className="size-6 stroke-gray-300" />
          </Link>
          <Link className="hover:-translate-y-0.5 transition-all duration-300">
            <Github className="size-6 stroke-gray-300" />
          </Link>
        </div>
      </footer>
    </>
  );
};

export default Footer;
