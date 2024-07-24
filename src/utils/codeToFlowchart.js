export function convertCodeToFlowchart(code) {
  const lines = code.split('\n').filter(line => line.trim() !== '');
  
  // Improved code breakdown logic
  const sections = breakCodeIntoSections(lines);
  
  const nodes = sections.map((section, index) => ({
    id: `node-${index}`,
    data: { label: section.join('\n') },
    position: { x: 250, y: index * 150 },
    style: {
      background: '#f0f0f0',
      border: '1px solid #ddd',
      borderRadius: '5px',
      padding: '10px',
      fontSize: '12px',
      width: 200,
      whiteSpace: 'pre-wrap',
    },
  }));

  const edges = sections.slice(0, -1).map((_, index) => ({
    id: `edge-${index}`,
    source: `node-${index}`,
    target: `node-${index + 1}`,
    type: 'smoothstep',
  }));

  return { nodes, edges };
}

function breakCodeIntoSections(lines) {
  const sections = [];
  let currentSection = [];

  lines.forEach((line, index) => {
    if (isNewSectionStart(line, index, lines)) {
      if (currentSection.length > 0) {
        sections.push(currentSection);
        currentSection = [];
      }
    }
    currentSection.push(line);
  });

  if (currentSection.length > 0) {
    sections.push(currentSection);
  }

  return sections;
}

function isNewSectionStart(line, index, lines) {
  // Logic to determine if a line starts a new section
  // This can be customized based on the specific code structure
  const keywords = ['function', 'class', 'if', 'for', 'while', 'switch'];
  const trimmedLine = line.trim();

  if (index === 0) return true;
  if (keywords.some(keyword => trimmedLine.startsWith(keyword))) return true;
  if (trimmedLine.endsWith('{')) return true;
  if (trimmedLine.startsWith('}')) return true;

  return false;
}