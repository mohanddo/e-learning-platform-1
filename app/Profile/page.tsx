"use client"

import { useState } from "react";

const Profile = () => {

    const [currentComp, setCurrentComp] = useState<String>("data");

    return (
        <section className="bg-amber-300 flex justify-center h-[80vh] pt-[13vh]">
            <section className="bg-green-200 w-[90%] p-5 flex flex-col rounded-lg">
                <div className="mb-20">
                    <span className="px-5 py-2 rounded-xl bg-blue-300 text-blue-500 border border-blue-500">Student</span>
                    <p className="text-3xl font-bold mt-5">My Profile</p>
                </div>

                <div className="flex flex-row gap-2">
                    <div className="flex flex-col flex-[1.5] shadow-lg rounded-lg">
                        <div className="flex flex-row border-b border-gray-300 gap-10 px-3 py-3 items-center ">
                            <button className={`font-semibold  ${currentComp === "data"? "text-black border-b" : "text-gray-400" } hover:text-black`}>
                                Personal data
                            </button>
                            <button className={`font-semibold  ${currentComp === "pursh"? "text-black border-b" : "text-gray-400" } hover:text-black`}>
                                purchases
                            </button>
                            <button className={`font-semibold  ${currentComp === "fav"? "text-black border-b" : "text-gray-400" } hover:text-black`}>
                                Favorit
                            </button>
                        </div>
                        youcef
                    </div>

                    <div className="flex-1 bg-red">
            youcef
                    </div>
                </div>
            </section>
        </section>
    )
}

export default Profile;

// important code
// 'use client';

// import { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';

// const tabs = [
//   { id: 'tab1', label: 'Tab One', content: 'This is the first tab content.' },
//   { id: 'tab2', label: 'Tab Two', content: 'Here goes the second tab stuff.' },
//   { id: 'tab3', label: 'Tab Three', content: 'And this is the third section.' },
// ];

// export default function TabComponent() {
//   const [activeTab, setActiveTab] = useState('tab1');
//   const [prevTab, setPrevTab] = useState('tab1');

//   const handleTabClick = (id: string) => {
//     if (id === activeTab) return;
//     setPrevTab(activeTab);
//     setActiveTab(id);
//   };

//   const activeIndex = tabs.findIndex((t) => t.id === activeTab);
//   const prevIndex = tabs.findIndex((t) => t.id === prevTab);
//   const direction = activeIndex > prevIndex ? 1 : -1;

//   return (
//     <div className="flex flex-col items-center p-4 max-w-xl mx-auto mt-40">
//       {/* Tabs header */}
//       <div className="flex space-x-4 mb-4">
//         {tabs.map((tab) => (
//           <button
//             key={tab.id}
//             onClick={() => handleTabClick(tab.id)}
//             className={`px-4 py-2 rounded-lg transition-colors duration-300 ${
//               activeTab === tab.id ? 'bg-blue-600 text-white' : 'bg-gray-200'
//             }`}
//           >
//             {tab.label}
//           </button>
//         ))}
//       </div>

//       {/* Animated tab content */}
//       <div className="relative w-full h-40 overflow-hidden">
//         <AnimatePresence mode="wait" custom={direction}>
//           <motion.div
//             key={activeTab}
//             custom={direction}
//             initial={{ x: direction * 300, opacity: 0 }}
//             animate={{ x: 0, opacity: 1 }}
//             exit={{ x: -direction * 300, opacity: 0 }}
//             transition={{ duration: 0.4, ease: 'easeInOut' }}
//             className="absolute top-0 left-0 w-full h-full"
//           >
//             <div className="bg-white p-6 rounded-lg shadow h-full flex items-center justify-center text-center">
//               {tabs.find((t) => t.id === activeTab)?.content}
//             </div>
//           </motion.div>
//         </AnimatePresence>
//       </div>
//     </div>
//   );
// }
