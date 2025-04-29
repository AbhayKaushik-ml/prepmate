const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };
  
  export const courseOutline = model.startChat({
    generationConfig,
    history: [
      {
        role: "user",
        parts: [
          {text: "Generate a study material for python for Exam and level of difficulty will be EASY with the summary of course, List of chapters along with summary for each chapter, Topic list in each chapter , All result in json format"},
        ],
      },
      {
        role: "model",
        parts: [
          {text: "```json\n{\n  \"course_title\": \"Python for Beginners - Exam Preparation\",\n  \"course_summary\": \"This study material provides a simplified overview of fundamental Python concepts, focusing on the essentials needed for an introductory-level Python exam. It covers basic syntax, data types, control flow, and simple data structures. The goal is to provide a clear and concise guide to help you understand and apply the core principles of Python programming.\",\n  \"level_of_difficulty\": \"EASY\",\n  \"chapters\": [\n    {\n      \"chapter_number\": 1,\n      \"chapter_title\": \"Introduction to Python\",\n      \"chapter_summary\": \"This chapter introduces the basic concepts of Python, including its history, features, and how to set up a development environment. It also covers the fundamentals of Python syntax and how to execute your first program.\",\n      \"topics\": [\n        \"What is Python?\",\n        \"History and Features of Python\",\n        \"Setting up Python Environment (Installation)\",\n        \"Running Python Scripts (Interactive Mode & Files)\",\n        \"Basic Python Syntax (Indentation, Comments)\",\n        \"Your First Python Program ('Hello, World!')\"\n      ]\n    },\n    {\n      \"chapter_number\": 2,\n      \"chapter_title\": \"Data Types and Variables\",\n      \"chapter_summary\": \"This chapter introduces Python's fundamental data types, such as integers, floats, strings, and booleans. It also explains how to declare and use variables to store and manipulate data.\",\n      \"topics\": [\n        \"Data Types (Integers, Floats, Strings, Booleans)\",\n        \"Variables (Declaration, Assignment, Naming Conventions)\",\n        \"Type Conversion (Casting)\",\n        \"Basic Operators (Arithmetic, Comparison, Logical)\",\n        \"String Operations (Concatenation, Slicing)\"\n      ]\n    },\n    {\n      \"chapter_number\": 3,\n      \"chapter_title\": \"Control Flow\",\n      \"chapter_summary\": \"This chapter covers control flow statements, which allow you to control the execution of your code based on conditions. It includes if-else statements, while loops, and for loops.\",\n      \"topics\": [\n        \"Conditional Statements (if, elif, else)\",\n        \"While Loops (Basic while loop structure)\",\n        \"For Loops (Iterating over sequences)\",\n        \"Break and Continue Statements\",\n        \"Nested Loops (Introduction)\"\n      ]\n    },\n    {\n      \"chapter_number\": 4,\n      \"chapter_title\": \"Data Structures: Lists and Tuples\",\n      \"chapter_summary\": \"This chapter introduces two fundamental data structures: lists and tuples.  It covers how to create, access, and manipulate these data structures. The key difference between mutable (lists) and immutable (tuples) is highlighted.\",\n      \"topics\": [\n        \"Lists (Creating, Accessing, Modifying)\",\n        \"List Operations (Appending, Inserting, Removing)\",\n        \"Tuples (Creating, Accessing)\",\n        \"Tuple Immutability\",\n        \"List and Tuple Use Cases\"\n      ]\n    },\n    {\n      \"chapter_number\": 5,\n      \"chapter_title\": \"Functions\",\n      \"chapter_summary\": \"This chapter introduces the concept of functions in Python, explaining how to define and call functions, pass arguments, and return values. It emphasizes the importance of functions for code reusability and organization.\",\n      \"topics\": [\n        \"Defining Functions (def keyword)\",\n        \"Calling Functions\",\n        \"Function Arguments (Positional, Keyword)\",\n        \"Return Values\",\n        \"Function Scope (Local vs. Global)\",\n        \"Built-in Functions (Examples: print(), len(), type())\"\n      ]\n    },\n    {\n      \"chapter_number\": 6,\n      \"chapter_title\": \"Input and Output\",\n      \"chapter_summary\": \"This chapter covers how to interact with the user by taking input and displaying output. It explains how to use the `input()` function to get data from the user and the `print()` function to display information.\",\n      \"topics\": [\n        \"Taking Input from the User (input() function)\",\n        \"Displaying Output (print() function)\",\n        \"String Formatting (Using f-strings or .format())\",\n        \"Basic File Handling (Reading and Writing to Files - Introduction)\"\n      ]\n    }\n  ]\n}\n```\n"},
        ],
      },
    ],
  });

  export const generateNotes = model.startChat({
    generationConfig,
    history: [
      {
        role: "user",
        parts: [
          {text: "Generate exam material detail content for each chapter, Make sure to include all topic points in the content, make sure to give content in HTML format( Do not add HTMLK, Head, Body, title tag), The chapters:\n\"chapters\": [\n    {\n      \"chapter_number\": 1,\n      \"chapter_title\": \"Advanced Component Patterns\",\n      \"chapter_summary\": \"This chapter explores advanced React component patterns beyond basic functional and class components. We'll cover render props, higher-order components (HOCs), compound components, and the use of context for advanced state management.\",\n      \"topics\": [\n        \"Render Props (Implementation and Use Cases)\",\n        \"Higher-Order Components (HOCs): Creation, Usage, and Pitfalls\",\n        \"Compound Components: Building Reusable UI Elements\",\n        \"Context API: Advanced Usage for Global State Management and Theming\",\n        \"Choosing the Right Component Pattern for Specific Scenarios\"\n      ]\n    },"},
        ],
      },
      {
        role: "model",
        parts: [
          {text: "```html\n<div>\n  <h2>Chapter 1: Advanced Component Patterns</h2>\n  <p>This chapter explores advanced React component patterns beyond basic functional and class components. We'll cover render props, higher-order components (HOCs), compound components, and the use of context for advanced state management.</p>\n\n  <h3>Topics:</h3>\n\n  <h4>1. Render Props (Implementation and Use Cases)</h4>\n  <ul>\n    <li><strong>Definition:</strong> Understand the concept of render props: a technique for sharing code between React components using a prop whose value is a function.</li>\n    <li><strong>Implementation:</strong>\n      <ul>\n        <li>Create a component that accepts a prop with a function as its value (the render prop).</li>\n        <li>The component invokes the render prop function and renders whatever that function returns.</li>\n      </ul>\n    </li>\n    <li><strong>Use Cases:</strong>\n      <ul>\n        <li>Sharing stateful logic: Mouse tracking, data fetching, animations.</li>\n        <li>Cross-cutting concerns: Authentication, authorization.</li>\n        <li>Reusable UI interactions.</li>\n      </ul>\n    </li>\n    <li><strong>Examples:</strong>\n      <ul>\n        <li>Creating a <code>MouseTracker</code> component that tracks mouse position and provides it to the render prop.</li>\n        <li>Building a <code>DataProvider</code> component that fetches data and renders different content based on the loading state.</li>\n      </ul>\n    </li>\n    <li><strong>Benefits:</strong> Code reuse, separation of concerns, flexibility.</li>\n    <li><strong>Potential Drawbacks:</strong> Can lead to complex component hierarchies if overused (\"render prop hell\").</li>\n  </ul>\n\n  <h4>2. Higher-Order Components (HOCs): Creation, Usage, and Pitfalls</h4>\n  <ul>\n    <li><strong>Definition:</strong> Understand the concept of HOCs: a function that takes a component and returns a new, enhanced component.</li>\n    <li><strong>Creation:</strong>\n      <ul>\n        <li>Write a function that accepts a component as an argument.</li>\n        <li>Inside the function, create a new component that wraps the original component.</li>\n        <li>The wrapper component can add additional props, state, or lifecycle methods.</li>\n        <li>Return the wrapper component.</li>\n      </ul>\n    </li>\n    <li><strong>Usage:</strong>\n      <ul>\n        <li>Apply HOCs to components to add cross-cutting functionalities like authentication, logging, or styling.</li>\n        <li>Example: <code>withAuthentication(MyComponent)</code>, <code>withLogging(MyComponent)</code></li>\n      </ul>\n    </li>\n    <li><strong>Pitfalls:</strong>\n      <ul>\n        <li><strong>Name Collisions:</strong> Potential for prop name collisions with the wrapped component.</li>\n        <li><strong>Ref Forwarding:</strong> Difficulty forwarding refs to the wrapped component.  Use <code>React.forwardRef</code> to solve this.</li>\n        <li><strong>Debugging:</strong> Difficult to debug due to the nested component structure.  Set the <code>displayName</code> property of the HOC.</li>\n        <li><strong>Static Method Loss:</strong> Static methods of the wrapped component are not automatically copied.  Need to copy them explicitly.  Use Hoist-non-react-statics library.</li>\n        <li><strong>HOC Hell/Wrapper Hell:</strong> Overuse can lead to a deeply nested component tree, making it hard to reason about.</li>\n      </ul>\n    </li>\n    <li><strong>Best Practices:</strong>\n      <ul>\n        <li>Use descriptive names for HOCs.</li>\n        <li>Pass all original props through to the wrapped component.</li>\n        <li>Use <code>React.forwardRef</code> to forward refs.</li>\n        <li>Consider alternatives like Hooks or Render Props if HOCs become too complex.</li>\n      </ul>\n    </li>\n  </ul>\n\n  <h4>3. Compound Components: Building Reusable UI Elements</h4>\n  <ul>\n    <li><strong>Definition:</strong> Understand the concept of compound components: a pattern where several components work together to form a larger, more complex UI element. The parent manages state and implicitly shares it with its children.</li>\n    <li><strong>Characteristics:</strong>\n      <ul>\n        <li>Implicit state sharing between parent and children.</li>\n        <li>Children rely on the parent's state and logic.</li>\n        <li>Provides a higher level of abstraction and reusability.</li>\n      </ul>\n    </li>\n    <li><strong>Implementation:</strong>\n      <ul>\n        <li>Create a parent component that manages the shared state.</li>\n        <li>Create child components that rely on the parent's state and functions.</li>\n        <li>Use <code>React.Children.map</code> or <code>cloneElement</code> to pass props to children (less common nowadays).  The modern approach is to use Context.</li>\n        <li>The parent component provides the state and functions to the children through Context.</li>\n      </ul>\n    </li>\n    <li><strong>Examples:</strong>\n      <ul>\n        <li><code>Tabs</code> and <code>TabPanel</code> components.  The <code>Tabs</code> component manages the active tab, and the <code>TabPanel</code> components display content based on the active tab.</li>\n        <li><code>Accordion</code> and <code>AccordionItem</code> components.</li>\n        <li><code>Select</code> and <code>Option</code> components.</li>\n      </ul>\n    </li>\n    <li><strong>Benefits:</strong>\n      <ul>\n        <li>Improved code organization.</li>\n        <li>Increased reusability.</li>\n        <li>Simplified API for consumers.</li>\n      </ul>\n    </li>\n  </ul>\n\n  <h4>4. Context API: Advanced Usage for Global State Management and Theming</h4>\n  <ul>\n    <li><strong>Review:</strong> Understand the basic use of the Context API for simple prop drilling scenarios.</li>\n    <li><strong>Advanced Usage:</strong>\n      <ul>\n        <li><strong>Multiple Contexts:</strong> Using multiple contexts for different aspects of the application state (e.g., user authentication, theme, language).</li>\n        <li><strong>Combining Contexts:</strong> Nesting context providers to provide different levels of context.</li>\n        <li><strong>Context Selectors:</strong> Creating custom hooks or components that selectively subscribe to specific values within a context to optimize performance.  Avoid re-renders when only certain parts of the context change.</li>\n        <li><strong>Theming:</strong> Implementing a theming system using Context to provide different styles based on user preference or application settings.</li>\n        <li><strong>Dynamic Context Values:</strong> Updating context values based on user interactions or data changes.</li>\n        <li><strong>Context with Reducers:</strong> Combining Context with a reducer function to manage complex state updates, similar to Redux but without external dependencies.  This provides a more scalable solution than simple <code>useState</code> within the provider.</li>\n      </ul>\n    </li>\n    <li><strong>Performance Considerations:</strong>\n      <ul>\n        <li>Avoid unnecessary re-renders by memoizing context values and using context selectors.</li>\n        <li>Be mindful of the scope of context providers.</li>\n      </ul>\n    </li>\n  </ul>\n\n  <h4>5. Choosing the Right Component Pattern for Specific Scenarios</h4>\n  <ul>\n    <li><strong>Factors to Consider:</strong>\n      <ul>\n        <li>Complexity of the logic being shared.</li>\n        <li>Frequency of use.</li>\n        <li>Maintainability.</li>\n        <li>Performance implications.</li>\n        <li>Testability.</li>\n      </ul>\n    </li>\n    <li><strong>Guidelines:</strong>\n      <ul>\n        <li><strong>Render Props:</strong> Suitable for simple code sharing scenarios and when you need fine-grained control over the rendered output.</li>\n        <li><strong>HOCs:</strong> Useful for adding cross-cutting concerns to multiple components, but be mindful of the potential pitfalls.</li>\n        <li><strong>Compound Components:</strong> Ideal for building complex UI elements with implicit state sharing.</li>\n        <li><strong>Context API:</strong> Best for managing global state and providing values to deeply nested components.  Consider combining with a reducer for complex state logic.</li>\n        <li><strong>Hooks:</strong> Often a simpler and more modern alternative to Render Props and HOCs for sharing stateful logic and side effects.</li>\n      </ul>\n    </li>\n    <li><strong>Examples:</strong>\n      <ul>\n        <li>When to use a Render Prop vs. a Hook for mouse tracking.</li>\n        <li>When to use a HOC vs. Context for authentication.</li>\n        <li>When to use Compound Components vs. a single complex component.</li>\n      </ul>\n    </li>\n  </ul>\n</div>\n```"},
        ],
      },
    ],
  });

  export const GenerateStudyTypeContentAiModel = model.startChat({
    generationConfig,
    history: [
      {
        role: 'user',
      parts: [
        {
          text: "Generate the flashcard on topic: Flutter Fundamentals, user Interface(UI) Development, Basic App navigation, in JSON format with front back content, maximum 15"},
      ],
    },
    {
      role: 'model',
      parts: [
        {
          text: `\`\`\`json
[
  {
    "front": "What is the core UI building block in Flutter?",
    "back": "Widgets"
  },
  {
    "front": "What are the two main types of widgets in Flutter?",
    "back": "Stateless and Stateful Widgets"
  },
  {
    "front": "How do you create a basic UI layout in Flutter?",
    "back": "Using layout widgets like Row, Column, and Container"
  },
  {
    "front": "What is the purpose of the \`Scaffold\` widget?",
    "back": "Provides basic app structure (AppBar, body, Drawer, etc.)"
  },
  {
    "front": "How do you navigate to a new screen in Flutter?",
    "back": "Using \`Navigator.push()\`"
  },
  {
    "front": "How do you return to the previous screen?",
    "back": "Using \`Navigator.pop()\`"
  },
  {
    "front": "What is a \`MaterialApp\` widget?",
    "back": "A convenience widget for building Material Design applications"
  },
  {
    "front": "What is a \`CupertinoApp\` widget?",
    "back": "A convenience widget for building iOS-style applications"
  },
  {
    "front": "How do you manage application state that changes?",
    "back": "Using \`StatefulWidget\` and \`setState()\`"
  },
  {
    "front": "What is the purpose of the \`build\` method in a widget?",
    "back": "Describes the UI for the widget"
  },
  {
    "front": "What is the default entry point for a Flutter application?",
    "back": "\`main()\` function"
  },
  {
    "front": "How do you define routes for navigation in a Flutter app?",
    "back": "Using the \`routes\` property of \`MaterialApp\` (or similar)"
  },
  {
    "front": "What is the \`AppBar\` widget used for?",
    "back": "Displays a title, leading/trailing icons, and actions at the top of a screen"
  },
  {
    "front": "What is the \`Drawer\` widget used for?",
    "back": "A side navigation panel that slides out from the edge of the screen"
  },
  {
    "front": "What is the concept of a widget tree in Flutter?",
    "back": "Widgets are organized in a hierarchical structure, forming a tree"
  }
]
\`\`\``,
        },
      ],
    },
  ],
});