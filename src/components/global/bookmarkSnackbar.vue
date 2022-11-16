<template>
    <div
      style="
        display: flex;
        position: absolute;
        bottom: 5px;
        width: 100%;
        place-content: center;
      "
    >
      <div
        :class = "{ 'errorClass':!success,'successClass':success}"
        style="
  
          direction: rtl;
          height: 40px;
          width: 95%;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 4px;
        "
      >
        <span style="font-family: almoni-medium; font-size: 18px; color: white">{{
          text
        }}</span>
      </div>
    </div>
  </template>
  
  
  <script>
  export default {
    props: ["text","success"],
  };
  </script>
  
  <style>
    .errorClass{
      background-color: #0F2558;
  ;
    }
    .successClass{
      background-color: #0F2558;
    }
  </style>