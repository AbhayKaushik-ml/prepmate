"use client";

import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import CourseVideoDescription from "./_components/CourseVideoDescription";
import { getCourseById } from "@/app/_services";
import Card from "../../../_components/Card"; // Adjust the path if the file is elsewhere
import CourseEnrollSection from "./_components/CourseEnrollSection";
import CourseContentSection from "./_components/CourseContentSection";

function CoursePreview() {
  const pathname = usePathname(); // Get the current URL path
  const [slug, setSlug] = useState(""); // State for storing the slug
  const [courseInfo, setInfo] = useState(null); // State for storing course info
  const [activeIndex, setActiveIndex] = useState(0); // State for storing active index

  useEffect(() => {
    // Extract the slug from the URL path
    const segments = pathname.split("/"); // Split the URL into segments
    const slug = segments[segments.length - 1]; // Get the last segment
    setSlug(slug);
  }, [pathname]);

  useEffect(() => {
    if (slug) {
      getCourseInfoBySlug(slug);
    }
  }, [slug]);

  const getCourseInfoBySlug = async (slug) => {
    try {
      const response = await getCourseById(slug); // Call your service to fetch data
      setInfo(response); // Store the response in state
    } catch (error) {
      console.error("Error fetching course info:", error);
    }
  };

  useEffect(() => {
    console.log("Updated Course Info:", courseInfo);
  }, [courseInfo]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 p-5 gap-5 text-gray-800 dark:text-white">
      <div className="col-span-2 bg-gradient-to-br from-purple-400 to-purple-500 rounded-xl shadow-md overflow-hidden">
        <Card>
          <div className="p-6">
            {courseInfo ? (
              <CourseVideoDescription 
                courseInfo={courseInfo} 
                activeIndex={activeIndex}
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="dark:text-gray-300 animate-pulse">
                  Loading course information...
                </p>
              </div>
            )}
          </div>
        </Card>
      </div>
      {/* course content */}
      <div>
        <CourseEnrollSection courseInfo={courseInfo} />
        <CourseContentSection 
          courseInfo={courseInfo} 
          setActiveIndex={setActiveIndex}
        />
      </div>
    </div>
  );
}

export default CoursePreview;
























