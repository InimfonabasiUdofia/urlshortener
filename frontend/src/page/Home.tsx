import  { useState } from 'react';
import { Copy, Link2, Sparkles, ArrowRight, Check } from 'lucide-react';
import Navbar from '../components/navbar';

export default function Home() {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [originalUrl, setOriginalUrl] = useState('');
  const [modifiedUrl, setModifiedUrl] = useState('');
  const [copied, setCopied] = useState(false);

  const handleChange = (e:any) => {
    const url = e.target.value;
    setOriginalUrl(url);
      console.log(url)
    
    // Simple URL modification example - you can customize this logic
    if (url) {
      // This is just a demo transformation
      const modified = url.replace(/^(https?:\/\/)?(www\.)?/, 'https://');
      setModifiedUrl(modified);
    } else {
      setModifiedUrl('');
    }
  };
 
  async function createUrl() {
  try {
    const res = await fetch(`${backendUrl}/api/url`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url: originalUrl }),
    });

    if (!res.ok) {
      throw new Error("Failed to create url");
    }

    const data = await res.json();
    console.log(data);
  } catch (err) {
    console.error(err);
  }finally{
    console.log("succesfull")
  }
}



  const handleCopy = async () => {
    if (modifiedUrl) {
      await navigator.clipboard.writeText(modifiedUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <>
    <Navbar></Navbar>
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
       

        {/* Main Card */}
        <div className="bg-white lg:mt-25 mt-15  rounded-3xl shadow-2xl p-8 space-y-8">
          {/* Original URL Input */}
          <div className="space-y-3">
            <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
              <Sparkles className="w-4 h-4 mr-2 text-black" />
              Enter Your URL
            </label>
            <input
              type="text"
              value={originalUrl}
              onChange={handleChange}
              placeholder="https://example.com/your-url"
              className="w-full px-6 py-4 text-lg border-2 border-gray-200 rounded-2xl focus:border-black focus:outline-none transition-all duration-300"
            />
          </div>

          {/* Arrow Indicator */}
          {originalUrl && (
            <div className="flex justify-center"
            onClick={createUrl}>
              <div className=" bg-black p-3 rounded-full animate-bounce">
                <ArrowRight className="w-6 h-6 text-white" />
              </div>
            </div>
          )}

          {/* Modified URL Output */}
          {modifiedUrl && (
            <div className="space-y-3 animate-slide-up">
              <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                <Check className="w-4 h-4 mr-2 text-green-600" />
                Modified URL
              </label>
              <div className="relative">
                <div className="w-full px-6 py-4 text-lg bg-linear-to-r from-purple-50 to-indigo-50 border-2 border-purple-200 rounded-2xl break-all">
                  {modifiedUrl}
                </div>
                <button
                  onClick={handleCopy}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white hover:bg-purple-500 text-purple-600 hover:text-white p-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  {copied ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <Copy className="w-5 h-5" />
                  )}
                </button>
              </div>
              {copied && (
                <p className="text-sm text-green-600 text-center animate-fade-in">
                  ✓ Copied to clipboard!
                </p>
              )}
            </div>
          )}

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-gray-200">
            <div className="text-center p-4">
              <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <Sparkles className="w-6 h-6 text-black" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-1">Instant</h3>
              <p className="text-sm text-gray-600">Real-time URL transformation</p>
            </div>
            <div className="text-center p-4">
              <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <Copy className="w-6 h-6 text-black" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-1">Easy Copy</h3>
              <p className="text-sm text-gray-600">One click to clipboard</p>
            </div>
            <div className="text-center p-4">
              <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <Link2 className="w-6 h-6 text-black" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-1">Reliable</h3>
              <p className="text-sm text-gray-600">Consistent results</p>
            </div>
          </div>
        </div>
      

        
      </div>

   
    </div>
    </>
  );
}