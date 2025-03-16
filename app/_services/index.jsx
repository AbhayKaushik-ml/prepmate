import { gql } from 'graphql-tag';
import { request } from 'graphql-request';

const MASTER_URL = `https://ap-south-1.cdn.hygraph.com/content/${process.env.NEXT_PUBLIC_HYGRAPH_KEY}/master`;

// Fetch the list of courses
export const getCourseList = async () => {
  const query = gql`
query courseList {
  courseLists(first: 20, orderBy: publishedAt_ASC) {
    banner {
      url
    }
    free
    id
    name
    totalChapter
    tags
    slug
  }
}
  `;

  try {
    const result = await request(MASTER_URL, query);
    return result.courseLists;
  } catch (error) {
    console.error("Error fetching course list:", error);
    throw error;
  }
};

// Fetch courses by specific tag
export const getCoursesByTag = async (tag) => {
  // Define possible variations of tags for different categories
  const tagVariations = {
    'web-dev': ['web-dev', 'webdev', 'web', 'html', 'css', 'javascript', 'react', 'nextjs', 'node', 'express', 'mongodb', 'postgresql', 'prisma'],
    'ml-ai': ['ml-ai', 'ml', 'ai', 'machine-learning', 'artificial-intelligence', 'python', 'tensorflow', 'pytorch'],
    'mobile-dev': ['mobile-dev', 'mobile', 'android', 'ios', 'react-native', 'flutter'],
    'cloud-computing': ['cloud-computing', 'cloud', 'aws', 'azure', 'gcp', 'docker', 'kubernetes'],
    'devops': ['devops', 'jenkins', 'git', 'github-actions', 'terraform'],
    'mlops': ['mlops', 'machine-learning-ops'],
    'dsa': ['dsa', 'data-structures', 'algorithms']
  };

  // Get the array of tag variations for the requested tag
  const variations = tagVariations[tag] || [tag];

  // Construct a query that will match any of the variations
  const query = gql`
    query GetCoursesByTag($variations: [String!]) {
      courseLists(where: { tags_contains_some: $variations }) {
        banner {
          url
        }
        free
        id
        name
        totalChapter
        tags
        slug
      }
    }
  `;

  try {
    const result = await request(MASTER_URL, query, { variations });
    
    // If no courses found with tag variations, fall back to manually filtering courses that might be related
    if (!result.courseLists || result.courseLists.length === 0) {
      console.log("No courses found with tag variations, falling back to all courses");
      
      // Get all courses
      const allCourses = await getCourseList();
      
      // Manually filter courses that might be related to the tag
      // by checking if any tag contains the requested tag as a substring
      return allCourses.filter(course => {
        if (!course.tags || !Array.isArray(course.tags)) return false;
        
        // Check if any course tag matches or contains any of our variations
        return course.tags.some(courseTag => 
          variations.some(variation => 
            courseTag.toLowerCase().includes(variation.toLowerCase())
          )
        );
      });
    }
    
    return result.courseLists;
  } catch (error) {
    console.error("Error fetching courses by tag:", error);
    // On error, fall back to getting all courses
    const allCourses = await getCourseList();
    return allCourses;
  }
};

// Fetch course details by ID
export const getCourseById = async (courseId) => {
  const query = gql`
    query GetCourseById($slug: String!) {
  courseList(where: { slug: $slug }) {
    banner {
      url
    }
    chapter {
      ... on Chapter {
        id
        name
        video {
          url
        }
      }
    }
    id
    free
    description
    name
    slug
    sourceCode
    tags
    totalChapter
  }
}

  `;

  try {
    const result = await request(MASTER_URL, query, { slug: courseId });
    return result.courseList;
  } catch (error) {
    console.error("Error fetching course by ID:", error);
    throw error;
  }
};

// Export functions as named exports
export default {
  getCourseList,
  getCourseById,
  getCoursesByTag
};


