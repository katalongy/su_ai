import { useState } from 'react';
import QRCode from 'qrcode';
import { QrCode, Download } from 'lucide-react';

export default function QrGenerator() {
  const [text, setText] = useState('');
  const [size, setSize] = useState(256);
  const [qrDataUrl, setQrDataUrl] = useState('');

  const generateQr = async () => {
    if (!text) return;
    try {
      const url = await QRCode.toDataURL(text, {
        width: size,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#ffffff',
        },
      });
      setQrDataUrl(url);
    } catch (err) {
      console.error(err);
    }
  };

  const downloadQr = () => {
    if (!qrDataUrl) return;
    const link = document.createElement('a');
    link.download = 'qrcode.png';
    link.href = qrDataUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center space-x-2">
        <QrCode className="w-6 h-6 text-blue-600" />
        <h1 className="text-2xl font-bold text-gray-900">二维码生成器</h1>
      </div>

      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">内容</label>
          <textarea
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none h-32"
            placeholder="输入文本或网址..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">尺寸 (px)</label>
            <select
              value={size}
              onChange={(e) => setSize(Number(e.target.value))}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value={128}>128 x 128 (小)</option>
              <option value={256}>256 x 256 (中)</option>
              <option value={512}>512 x 512 (大)</option>
              <option value={1024}>1024 x 1024 (超大)</option>
            </select>
          </div>
        </div>

        <button
          onClick={generateQr}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          生成二维码
        </button>
      </div>

      {qrDataUrl && (
        <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm flex flex-col items-center space-y-6">
          <div className="border-4 border-white shadow-lg rounded-lg overflow-hidden">
            <img src={qrDataUrl} alt="QR Code" />
          </div>
          <button
            onClick={downloadQr}
            className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-gray-700"
          >
            <Download className="w-4 h-4" />
            <span>下载 PNG</span>
          </button>
        </div>
      )}
    </div>
  );
}
