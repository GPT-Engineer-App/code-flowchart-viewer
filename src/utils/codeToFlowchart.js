export function convertCodeToFlowchart(code) {
  // This is a simplified conversion. In a real-world scenario, you'd need a more sophisticated parser.
  const lines = code.split('\n').filter(line => line.trim() !== '');
  
  const nodes = lines.map((line, index) => ({
    id: `node-${index}`,
    data: { label: line.trim() },
    position: { x: 250, y: index * 100 },
    style: {
      background: '#f0f0f0',
      border: '1px solid #ddd',
      borderRadius: '5px',
      padding: '10px',
      fontSize: '12px',
    },
  }));

  const edges = lines.slice(0, -1).map((_, index) => ({
    id: `edge-${index}`,
    source: `node-${index}`,
    target: `node-${index + 1}`,
    type: 'smoothstep',
  }));

  return { nodes, edges };
}