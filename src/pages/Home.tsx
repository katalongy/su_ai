import { Link } from 'react-router-dom';
import { FileJson, QrCode, Fingerprint, ArrowRight } from 'lucide-react';

export default function Home() {
  const tools = [
    {
      title: 'JSON 格式化',
      description: '格式化、压缩、校验 JSON 数据，支持语法高亮和错误提示。',
      icon: FileJson,
      path: '/json-formatter',
      color: 'text-yellow-600',
      bg: 'bg-yellow-50',
    },
    {
      title: '二维码生成器',
      description: '将文本或链接转换为二维码，支持自定义尺寸和下载。',
      icon: QrCode,
      path: '/qr-generator',
      color: 'text-blue-600',
      bg: 'bg-blue-50',
    },
    {
      title: 'UUID 生成器',
      description: '批量生成 UUID v4，支持多种格式（带/不带横线、大小写）。',
      icon: Fingerprint,
      path: '/uuid-generator',
      color: 'text-purple-600',
      bg: 'bg-purple-50',
    },
  ];

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4 py-8">
        <h1 className="text-4xl font-bold text-gray-900">开发者工具箱</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          简单、高效、纯前端的开发工具集合，保障您的数据安全。
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool) => {
          const Icon = tool.icon;
          return (
            <Link
              key={tool.path}
              to={tool.path}
              className="block group bg-white p-6 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-start space-x-4">
                <div className={`p-3 rounded-lg ${tool.bg} ${tool.color}`}>
                  <Icon className="w-8 h-8" />
                </div>
                <div className="flex-1 space-y-2">
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {tool.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {tool.description}
                  </p>
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm font-medium text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">
                立即使用 <ArrowRight className="w-4 h-4 ml-1" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
