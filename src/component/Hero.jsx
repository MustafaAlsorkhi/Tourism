import React from "react";
import Form from "./Form";
const Hero = () => {
  return (
    <section className=" bg-white dark:bg-gray-900 flex justify-center flex-col">
      <div className="flex flex-col justify-center place-items-center h-[650px] w-full bg-no-repeat bg-cover bg-[url('https://images.squarespace-cdn.com/content/v1/5c4b2a4cb40b9dd2533816f4/1603800689966-2ZG1EADK5WEK73G15TFW/1.+IMG_7333.jpg')] ">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white w-auto">
            Tourism In Jordan E-Blog
          </h1>
          <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
                Tell us about your journey and share some details with us
          </p>

            <Form/>

            
          </div>
    </section>
  );
};

export default Hero;
