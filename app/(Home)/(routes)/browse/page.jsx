"use client";

import React, { useEffect, useState } from 'react';
import CategoryFilter from './_components/CategoryFilter';
// import { getCourseList } from '@/app/_services';
import CourseList from './_components/CourseList';
import WelcomeBanner from './_components/WelcomeBanner';

function Browse() {

  return (
    <div>
      <CategoryFilter />
      <WelcomeBanner/>
      <CourseList  /> {/* Renamed prop to 'courses' for consistency */}
    </div>
  );
}

export default Browse;
