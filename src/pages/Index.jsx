import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const Index = () => {
  const [code, setCode] = useState("");

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setCode(e.target.result);
      reader.readAsText(file);
    }
  };

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
          <div className="border-2 border-dashed border-gray-300 rounded-lg h-[400px] flex items-center justify-center">
            <p className="text-gray-500">Flowchart will be displayed here</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;