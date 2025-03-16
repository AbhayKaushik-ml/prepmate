"use client";
import React, { useState } from 'react';
import CourseList from '../../browse/_components/CourseList';
import RoadmapView from './RoadmapView';
import ProjectsView from './ProjectsView';

function CategoryLayout({ category }) {
  const [activeTab, setActiveTab] = useState('courses');

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg p-5 shadow-lg">
        <h1 className="text-2xl font-bold mb-2">{category.toUpperCase()} Learning Path</h1>
        <p className="text-sm opacity-80">
          Master {category} with our comprehensive curriculum and hands-on projects
        </p>
        
        {/* Tabs */}
        <div className="flex mt-6 border-b border-blue-400">
          <button
            className={`px-4 py-2 font-medium text-sm transition-colors ${
              activeTab === 'courses' 
                ? 'text-white border-b-2 border-white' 
                : 'text-blue-200 hover:text-white'
            }`}
            onClick={() => setActiveTab('courses')}
          >
            Courses
          </button>
          <button
            className={`px-4 py-2 font-medium text-sm transition-colors ${
              activeTab === 'roadmap' 
                ? 'text-white border-b-2 border-white' 
                : 'text-blue-200 hover:text-white'
            }`}
            onClick={() => setActiveTab('roadmap')}
          >
            Roadmap
          </button>
          <button
            className={`px-4 py-2 font-medium text-sm transition-colors ${
              activeTab === 'projects' 
                ? 'text-white border-b-2 border-white' 
                : 'text-blue-200 hover:text-white'
            }`}
            onClick={() => setActiveTab('projects')}
          >
            Projects
          </button>
        </div>
      </div>
      
      {/* Content based on active tab */}
      <div>
        {activeTab === 'courses' && <CourseList categoryFilter={category} />}
        {activeTab === 'roadmap' && <RoadmapView category={category} />}
        {activeTab === 'projects' && <ProjectsView category={category} />}
      </div>
    </div>
  );
}

export default CategoryLayout; 