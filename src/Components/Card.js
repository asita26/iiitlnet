import React from "react";
import "../CSS/card.css";
export default function Card({ fName, lName,desc, content, venue, time }) {
   console.log(desc)
//   console.log(data);
    // console.log(name, content, "card")
    let x= Math.floor(Math.random() * (5 - 0) + 0)
    const randimg=[
      "https://st3.depositphotos.com/1025323/36665/i/600/depositphotos_366651850-stock-photo-enter-virus-series-color-composition.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3kfuB75j5MQMZHS0kBLJ8U451KnJNthuXTZdWsp2e_x_uUp-AV1xMaMaTHEgqEWe2k83yOPJtDHs&usqp=CAU&ec=48600112",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyh0Cth_AWp9u8UfSfBrAXMgDCqE33vJ74_xR9YeTFPFRrlLNxrk51EMqAoQJ4iR7k-4yMo2ubntk&usqp=CAU&ec=48600112",
      "https://st4.depositphotos.com/1025323/39652/i/600/depositphotos_396529742-stock-photo-end-days-bird-silhouette-abstract.jpg",
      "https://st4.depositphotos.com/1025323/37822/i/600/depositphotos_378223550-stock-photo-black-swan-covid-series-silhouette.jpg",
    ]
  return (
    <div className="my-10 rounded-lg  m-auto">
   <div class="relative bg-white py-6 px-6 rounded-3xl w-96  my-4 shadow-xl">

    
    <div class="mt-8">
        <p class="text-3xl font-semibold my-2">{content}</p>

        <p class="text-xl font-semibold my-2">
         {desc} 
        </p>
        <div class="flex space-x-2 text-gray-400 text-sm">
        
            <svg    class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
             <p>{venue}</p> 
        </div>
        <div class="flex space-x-2 text-gray-400 text-sm my-3">
           
            <svg    class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
             <p>{time}</p> 
        </div>
        <div class="border-t-2"></div>

        <div class="flex justify-between">
            <div class="my-2">
                <p class="font-semibold text-base mb-2">Event By</p>
                 {fName} {lName}
            </div>
            
        </div>
    </div>
</div>
      
    </div>
  );
}
