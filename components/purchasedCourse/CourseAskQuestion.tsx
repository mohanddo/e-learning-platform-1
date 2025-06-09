import React from "react";

const CourseAskQuestion: React.FC = () => {
  return (
    <div className="mt-6 pt-6 border-t border-gray-200">
      <h3 className="text-lg font-bold text-gray-800 mb-5">
        Poser une nouvelle question
      </h3>
      {/* Form structure for asking a question */}
      <form className="space-y-5">
        {/* Question Title */}
        <div>
          <label
            htmlFor="questionTitle"
            className="block text-sm font-semibold text-gray-700 mb-1"
          >
            Titre
          </label>
          <input
            type="text"
            id="questionTitle"
            className="block w-full border border-gray-300 rounded-md shadow-sm p-2.5 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm transition duration-150 ease-in-out"
            placeholder="Entrez le titre de votre question"
          />
        </div>
        {/* Question Body */}
        <div>
          <label
            htmlFor="questionBody"
            className="block text-sm font-semibold text-gray-700 mb-1"
          >
            Détails
          </label>
          <textarea
            id="questionBody"
            rows={4}
            className="block w-full border border-gray-300 rounded-md shadow-sm p-2.5 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm transition duration-150 ease-in-out"
            placeholder="Fournissez des détails sur votre question"
          ></textarea>
        </div>
        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="inline-flex justify-center py-2.5 px-5 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition duration-150 ease-in-out"
          >
            Publier la question
          </button>
        </div>
      </form>
    </div>
  );
};

export default CourseAskQuestion;
