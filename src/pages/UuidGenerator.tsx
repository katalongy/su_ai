import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Fingerprint, Copy, RefreshCw } from 'lucide-react';

export default function UuidGenerator() {
  const [count, setCount] = useState(1);
  const [hyphens, setHyphens] = useState(true);
  const [uppercase, setUppercase] = useState(false);
  const [uuids, setUuids] = useState<string[]>([]);

  const generateUuids = () => {
    const newUuids = Array.from({ length: count }, () => {
      let uuid = uuidv4();
      if (!hyphens) uuid = uuid.replace(/-/g, '');
      if (uppercase) uuid = uuid.toUpperCase();
      return uuid;
    });
    setUuids(newUuids);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const copyAll = () => {
    navigator.clipboard.writeText(uuids.join('\n'));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center space-x-2">
        <Fingerprint className="w-6 h-6 text-purple-600" />
        <h1 className="text-2xl font-bold text-gray-900">UUID 生成器</h1>
      </div>

      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">生成数量</label>
            <input
              type="number"
              min="1"
              max="100"
              value={count}
              onChange={(e) => setCount(Math.min(100, Math.max(1, Number(e.target.value))))}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
            />
          </div>
          
          <div className="flex items-center space-x-4 pt-8">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={hyphens}
                onChange={(e) => setHyphens(e.target.checked)}
                className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
              />
              <span className="text-gray-700">包含连字符 (-)</span>
            </label>
          </div>

          <div className="flex items-center space-x-4 pt-8">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={uppercase}
                onChange={(e) => setUppercase(e.target.checked)}
                className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
              />
              <span className="text-gray-700">大写字母</span>
            </label>
          </div>
        </div>

        <button
          onClick={generateUuids}
          className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors font-medium flex items-center justify-center"
        >
          <RefreshCw className="w-4 h-4 mr-2" /> 生成 UUID
        </button>
      </div>

      {uuids.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
            <span className="font-medium text-gray-700">生成结果 ({uuids.length})</span>
            <button
              onClick={copyAll}
              className="text-sm text-purple-600 hover:text-purple-700 font-medium flex items-center"
            >
              <Copy className="w-4 h-4 mr-1" /> 复制全部
            </button>
          </div>
          <div className="divide-y divide-gray-100 max-h-[500px] overflow-y-auto">
            {uuids.map((uuid, index) => (
              <div key={index} className="p-4 flex items-center justify-between hover:bg-gray-50 group">
                <code className="font-mono text-gray-600">{uuid}</code>
                <button
                  onClick={() => copyToClipboard(uuid)}
                  className="p-2 text-gray-400 hover:text-purple-600 opacity-0 group-hover:opacity-100 transition-all"
                  title="复制"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
