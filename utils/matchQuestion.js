export function findBestMatch(input, qaDatabase) {
    // Exact match
    const exactMatch = qaDatabase.find(
      qa => qa.question.toLowerCase().trim() === input.toLowerCase().trim()
    );
    
    if (exactMatch) return exactMatch;
  
    // Partial match
    const partialMatch = qaDatabase.find(qa => 
      input.toLowerCase().includes(qa.question.toLowerCase()) ||
      qa.question.toLowerCase().includes(input.toLowerCase())
    );
  
    return partialMatch || null;
  }