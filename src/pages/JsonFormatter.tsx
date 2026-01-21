import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Copy, FileJson, Minimize2, Maximize2 } from 'lucide-react';

export default function JsonFormatter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);

  const formatJson = () => {
    try {
      if (!input.trim()) return;
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, 2));
      setError(null);
    } catch (err) {
      setError('Invalid JSON: ' + (err as Error).message);
      setOutput('');
    }
  };

  const minifyJson = () => {
    try {
      if (!input.trim()) return;
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed));
      setError(null);
    } catch (err) {
      setError('Invalid JSON: ' + (err as Error).message);
      setOutput('');
    }
  };

  const copyToClipboard = () => {
    if (output) {
      navigator.clipboard.writeText(output);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <FileJson className="w-6 h-6 text-yellow-600" />
        <h1 className="text-2xl font-bold text-gray-900">JSON 格式化工具</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-200px)] min-h-[500px]">
        <div className="flex flex-col space-y-2">
          <label className="text-sm font-medium text-gray-700">输入 JSON</label>
          <textarea
            className="flex-1 p-4 font-mono text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
            placeholder="在此粘贴 JSON..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>

        <div className="flex flex-col space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-700">结果</label>
            <div className="flex space-x-2">
              <button
                onClick={formatJson}
                className="flex items-center px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                <Maximize2 className="w-4 h-4 mr-1" /> 格式化
              </button>
              <button
                onClick={minifyJson}
                className="flex items-center px-3 py-1 text-sm bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
              >
                <Minimize2 className="w-4 h-4 mr-1" /> 压缩
              </button>
              <button
                onClick={copyToClipboard}
                className="flex items-center px-3 py-1 text-sm bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                disabled={!output}
              >
                <Copy className="w-4 h-4 mr-1" /> 复制
              </button>
            </div>
          </div>
          
          <div className="flex-1 border border-gray-300 rounded-lg overflow-hidden bg-[#1e1e1e] relative">
            {error ? (
              <div className="p-4 text-red-400 font-mono text-sm">{error}</div>
            ) : (
              <SyntaxHighlighter
                language="json"
                style={vscDarkPlus}
                customStyle={{ margin: 0, height: '100%', borderRadius: 0 }}
                showLineNumbers={true}
              >
                {output || '// 结果将显示在这里'}
              </SyntaxHighlighter>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
