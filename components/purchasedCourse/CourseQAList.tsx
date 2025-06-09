import React, { useState } from "react";
import { Button } from "../ui/button";
const CourseQAList: React.FC = () => {
  const [filter, setFilter] = useState<string>("current_session");
  const [sort, setSort] = useState<string>("by_date");

  return (
    <div className="w-full bg-white pb-10 p-6">
      {/* Filter and Sort Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 space-y-4 md:space-y-0">
        <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
          <div className="flex items-center space-x-2">
            <p className="text-sm font-medium text-gray-700">Filters :</p>
            <select className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500">
              <option>Current Session</option>
              <option>All Sessions</option>
            </select>
          </div>
          <div className="flex items-center space-x-2">
            <p className="text-sm font-medium text-gray-700">Sort by:</p>
            <select className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500">
              <option>Sort by date (most recent)</option>
              <option>Sort by most upVotes</option>
            </select>
          </div>
        </div>

        <Button className="bg-[var(--addi-color-400)] hover:bg-[var(--addi-color-500)] text-white text-md font-semibold">
          Ask a question
        </Button>
      </div>

      {/* Questions List */}
      <div>
        <h3 className="text-lg font-bold text-gray-800 mb-4">
          Toutes les questions dans cette session (9)
        </h3>
        {/* Example Question Item */}
        {/* Added border-t to the first item for consistency with the image */}
        <div className="border-t border-b py-4 flex items-start space-x-4 hover:bg-gray-50 cursor-pointer">
          {/* Avatar/Initials */}
          <div className="w-10 h-10 rounded-full bg-purple-200 flex items-center justify-center text-purple-800 font-semibold text-sm flex-shrink-0">
            KY
          </div>
          <div className="flex-1">
            {/* Question Title */}
            <h4 className="font-semibold text-gray-800">
              course content (MVVM MVM )
            </h4>
            {/* Question Details */}
            <p className="text-sm text-gray-600 mt-1">
              i have question this course include any lec about MVVM or MVM or
              coroutine
            </p>
            {/* Asker and Session */}
            <p className="text-xs text-gray-500 mt-2">
              Kamran • Session 3 • Il y a 2 ans
            </p>
          </div>
          {/* Votes and Comments */}
          <div className="flex flex-col items-center space-y-1 text-gray-500 text-sm flex-shrink-0">
            <div className="flex items-center">
              1 <span className="ml-1">⬆️</span>
            </div>
            <div className="flex items-center">
              1 <span className="ml-1">💬</span>
            </div>
          </div>
        </div>

        {/* Repeat for other questions - add border-b to each */}
        <div className="border-b py-4 flex items-start space-x-4 hover:bg-gray-50 cursor-pointer">
          {/* Avatar/Initiales */}
          <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-black font-semibold flex-shrink-0">
            SA
          </div>
          <div className="flex-1">
            {/* Question Title */}
            <h4 className="font-semibold text-gray-800">Course structure</h4>
            {/* Question Details */}
            <p className="text-sm text-gray-600 mt-1">
              Hi Denis, i have a question about course structure, you 18 days of
              training, what section 19 onward is ...
            </p>
            {/* Asker and Session */}
            <p className="text-xs text-gray-500 mt-2">
              Shabbir • Session 3 • Il y a 8 mois
            </p>
          </div>
          {/* Votes and Comments */}
          <div className="flex flex-col items-center space-y-1 text-gray-500 text-sm flex-shrink-0">
            <div className="flex items-center">
              0 <span className="ml-1">⬆️</span>
            </div>
            <div className="flex items-center">
              1 <span className="ml-1">💬</span>
            </div>
          </div>
        </div>
      </div>

      {/* Show More Button */}
      <div className="text-center mt-6">
        <button className="border border-purple-600 text-purple-600 px-6 py-2 rounded-md font-medium hover:bg-purple-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
          Afficher plus
        </button>
      </div>

      {/* Posez une nouvelle question section - will be a separate component */}
      {/* <div className="mt-6 pt-6 border-t">
        <h3 className="text-lg font-bold mb-4">Poser une nouvelle question</h3>
        </div> */}
    </div>
  );
};

export default CourseQAList;
