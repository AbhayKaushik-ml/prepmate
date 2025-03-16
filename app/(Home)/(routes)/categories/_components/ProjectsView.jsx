"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ExternalLink, Clock, Code, BookOpen } from 'lucide-react';

function ProjectsView({ category }) {
  const [projects, setProjects] = useState([]);
  
  // Set projects data based on category
  useEffect(() => {
    let projectsData = [];
    
    switch(category) {
      case 'ml-ai':
        projectsData = [
          {
            id: 'digit-recognition',
            name: 'Handwritten Digit Recognition',
            description: 'Build a neural network to recognize handwritten digits using the MNIST dataset.',
            difficulty: 'Intermediate',
            duration: '2-3 weeks',
            technologies: ['Python', 'TensorFlow/PyTorch', 'NumPy', 'Matplotlib'],
            image: '/project-placeholder.jpg'
          },
          {
            id: 'image-classification',
            name: 'Image Classification',
            description: 'Create a CNN to classify images into different categories.',
            difficulty: 'Intermediate',
            duration: '3-4 weeks',
            technologies: ['Python', 'TensorFlow/PyTorch', 'CNN', 'Data Augmentation'],
            image: '/project-placeholder.jpg'
          },
          {
            id: 'sentiment-analysis',
            name: 'Sentiment Analysis',
            description: 'Develop an NLP model to analyze sentiment in text data.',
            difficulty: 'Intermediate',
            duration: '2-3 weeks',
            technologies: ['Python', 'NLTK', 'Scikit-learn', 'spaCy'],
            image: '/project-placeholder.jpg'
          },
          {
            id: 'time-series',
            name: 'Time Series Forecasting',
            description: 'Build a model to predict future values in time series data.',
            difficulty: 'Advanced',
            duration: '3-4 weeks',
            technologies: ['Python', 'Pandas', 'Statsmodels', 'Prophet'],
            image: '/project-placeholder.jpg'
          },
          {
            id: 'recommendation-system',
            name: 'Recommendation System',
            description: 'Create a recommendation system for products or content.',
            difficulty: 'Advanced',
            duration: '4-5 weeks',
            technologies: ['Python', 'Collaborative Filtering', 'Matrix Factorization', 'Deep Learning'],
            image: '/project-placeholder.jpg'
          }
        ];
        break;
        
      case 'web-dev':
        projectsData = [
          {
            id: 'portfolio-website',
            name: 'Portfolio Website',
            description: 'Build a responsive personal portfolio to showcase your skills and projects.',
            difficulty: 'Beginner',
            duration: '1-2 weeks',
            technologies: ['HTML', 'CSS', 'JavaScript', 'Responsive Design'],
            image: '/project-placeholder.jpg'
          },
          {
            id: 'blog-platform',
            name: 'Blog Platform',
            description: 'Create a full-stack blog with authentication and content management.',
            difficulty: 'Intermediate',
            duration: '3-4 weeks',
            technologies: ['React/Next.js', 'Node.js', 'MongoDB/PostgreSQL', 'Authentication'],
            image: '/project-placeholder.jpg'
          },
          {
            id: 'ecommerce-site',
            name: 'E-commerce Site',
            description: 'Develop an online store with product listings, cart, and checkout.',
            difficulty: 'Advanced',
            duration: '4-6 weeks',
            technologies: ['React/Next.js', 'Node.js', 'MongoDB/PostgreSQL', 'Payment Gateway'],
            image: '/project-placeholder.jpg'
          },
          {
            id: 'realtime-chat',
            name: 'Real-time Chat App',
            description: 'Build a real-time chat application with private and group messaging.',
            difficulty: 'Intermediate',
            duration: '2-3 weeks',
            technologies: ['React', 'Socket.io', 'Node.js', 'Express'],
            image: '/project-placeholder.jpg'
          },
          {
            id: 'social-media',
            name: 'Social Media Dashboard',
            description: 'Create a social media platform with posts, likes, and comments.',
            difficulty: 'Advanced',
            duration: '5-6 weeks',
            technologies: ['React/Next.js', 'GraphQL', 'Node.js', 'MongoDB'],
            image: '/project-placeholder.jpg'
          }
        ];
        break;
        
      case 'mobile-dev':
        projectsData = [
          {
            id: 'weather-app',
            name: 'Weather App',
            description: 'Build a mobile app that displays weather forecasts based on location.',
            difficulty: 'Beginner',
            duration: '1-2 weeks',
            technologies: ['React Native/Flutter', 'Weather API', 'Location Services', 'UI Components'],
            image: '/project-placeholder.jpg'
          },
          {
            id: 'todo-list',
            name: 'To-Do List App',
            description: 'Create a task management app with reminders and categories.',
            difficulty: 'Beginner',
            duration: '1-2 weeks',
            technologies: ['React Native/Flutter', 'Local Storage', 'Notifications', 'State Management'],
            image: '/project-placeholder.jpg'
          },
          {
            id: 'chat-app',
            name: 'Chat App',
            description: 'Develop a mobile messaging app with real-time communication.',
            difficulty: 'Intermediate',
            duration: '3-4 weeks',
            technologies: ['React Native/Flutter', 'Firebase', 'Authentication', 'Push Notifications'],
            image: '/project-placeholder.jpg'
          },
          {
            id: 'ecommerce-mobile',
            name: 'E-commerce Mobile App',
            description: 'Build a shopping app with product listings and checkout.',
            difficulty: 'Advanced',
            duration: '4-6 weeks',
            technologies: ['React Native/Flutter', 'API Integration', 'State Management', 'Payment Gateway'],
            image: '/project-placeholder.jpg'
          },
          {
            id: 'fitness-tracker',
            name: 'Fitness Tracker',
            description: 'Create an app to track workouts, steps, and health metrics.',
            difficulty: 'Intermediate',
            duration: '3-4 weeks',
            technologies: ['React Native/Flutter', 'Health APIs', 'Charts/Graphs', 'Local Storage'],
            image: '/project-placeholder.jpg'
          }
        ];
        break;
      
      // Add other categories with their projects...
      case 'cloud-computing':
      case 'devops':
      case 'mlops':
      case 'dsa':
        projectsData = [
          {
            id: `${category}-project-1`,
            name: 'Sample Project 1',
            description: 'This is a placeholder for a project in this category.',
            difficulty: 'Intermediate',
            duration: '2-3 weeks',
            technologies: ['Relevant Tech 1', 'Relevant Tech 2', 'Relevant Tech 3'],
            image: '/project-placeholder.jpg'
          },
          {
            id: `${category}-project-2`,
            name: 'Sample Project 2',
            description: 'This is another placeholder for a project in this category.',
            difficulty: 'Advanced',
            duration: '3-4 weeks',
            technologies: ['Relevant Tech 1', 'Relevant Tech 2', 'Relevant Tech 3'],
            image: '/project-placeholder.jpg'
          }
        ];
        break;
      
      default:
        projectsData = [];
    }
    
    setProjects(projectsData);
  }, [category]);

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'Beginner':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'Intermediate':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'Advanced':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-5">
      <h2 className="text-xl font-bold mb-6 text-gray-800 dark:text-white">Projects</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <div 
            key={project.id} 
            className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <div className="relative h-48">
              <Image
                src={project.image}
                alt={project.name}
                width={500}
                height={300}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/500x300?text=Project+Image';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                <h3 className="text-white text-xl font-bold">{project.name}</h3>
              </div>
            </div>
            
            <div className="p-4 space-y-4">
              <p className="text-gray-600 dark:text-gray-300 text-sm">{project.description}</p>
              
              <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                <Clock size={16} />
                <span>{project.duration}</span>
              </div>
              
              <div className="flex flex-wrap gap-2 mt-2">
                <span className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(project.difficulty)}`}>
                  {project.difficulty}
                </span>
                
                {project.technologies.slice(0, 3).map((tech, index) => (
                  <span key={index} className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200">
                    {tech}
                  </span>
                ))}
                {project.technologies.length > 3 && (
                  <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200">
                    +{project.technologies.length - 3} more
                  </span>
                )}
              </div>
              
              <div className="pt-3 flex justify-between items-center border-t border-gray-100 dark:border-gray-700 mt-3">
                <button className="flex items-center text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors">
                  <Code size={16} className="mr-1" />
                  View Code
                </button>
                <button className="flex items-center text-sm text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 transition-colors">
                  <BookOpen size={16} className="mr-1" />
                  Start Learning
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {projects.length === 0 && (
        <div className="text-center py-12 text-gray-500 dark:text-gray-400">
          <p className="text-lg">No projects available for this category yet.</p>
          <p className="text-sm mt-2">Check back soon or explore another category!</p>
        </div>
      )}
    </div>
  );
}

export default ProjectsView; 