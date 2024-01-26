import React from "react";
import { Footer } from 'flowbite-react';
import {  BsGithub, BsLinkedin } from 'react-icons/bs';


export default function MyFooter() {
    return (
      <Footer bgDark>
      <div className="w-full">        
        <div className="w-full bg-gray-700 px-4 py-6 sm:flex sm:items-center sm:justify-between">
          <Footer.Copyright href="#" by="David Moreno" year={2024} />
          <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
            <Footer.Icon href="https://www.linkedin.com/in/david-moreno-1675a4248/" icon={BsLinkedin} />
            <Footer.Icon href="https://github.com/davidmpenades" icon={BsGithub} />
          </div>
        </div>
      </div>
    </Footer>
      );
}
