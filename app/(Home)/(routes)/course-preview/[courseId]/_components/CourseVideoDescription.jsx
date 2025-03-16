import React from "react";
import VideoPlayer from "./VideoPlayer";
import Markdown from "react-markdown";

function CourseVideoDescription({ courseInfo, activeIndex }) {
  if (!courseInfo) {
    return <p className="text-gray-700 dark:text-gray-300">Loading course information...</p>;
  }

  return (
    <div className="text-gray-800 dark:text-white">
      <h2 className="text-[20px] font-semibold text-gray-900 dark:text-white">
        {courseInfo.name || "No Course Name Available"}
      </h2>
      {/* video player */}
      {console.log(activeIndex)}
      <VideoPlayer videoUrl={courseInfo?.chapter[activeIndex]?.video?.url} />
      {/* description */}
      <h2 className="mt-5 text-[17px] font-semibold text-gray-900 dark:text-white">
        About this course
      </h2>
      <div className="bg-white dark:bg-gray-800 rounded-md p-4">
        <div className="text-[12px] font-light mt-2 leading-6 prose dark:prose-invert prose-sm max-w-none">
          <Markdown>
            {courseInfo.description}
          </Markdown>
        </div>
      </div>
    </div>
  );
}

export default CourseVideoDescription;
