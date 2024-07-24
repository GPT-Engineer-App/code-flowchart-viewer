import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import ReactFlow, { Background, Controls } from 'reactflow';
import 'reactflow/dist/style.css';
import { convertCodeToFlowchart } from "../utils/codeToFlowchart";

const Index = () => {
  const [code, setCode] = useState("");
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const uploadedCode = e.target.result;
        setCode(uploadedCode);
        const { nodes, edges } = convertCodeToFlowchart(uploadedCode);
        setNodes(nodes);
        setEdges(edges);
      };
      reader.readAsText(file);
    }
  };

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Code to Flowchart</h1>
      
      <div className="mb-6">
        <Input
          type="file"
          onChange={handleFileUpload}
          accept=".js,.py,.java,.txt"
          className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-xl font-semibold mb-2">Uploaded Code</h2>
          <Textarea
            value={code}
            readOnly
            className="w-full h-[400px] font-mono text-sm"
          />
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Flowchart</h2>
          <div style={{ width: '100%', height: '400px' }}>
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              fitView
            >
              <Background />
              <Controls />
            </ReactFlow>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;