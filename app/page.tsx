"use client";
import { useState, useEffect, useRef } from "react";

export default function Page() {
  const [file, setFile] = useState<File | null>(null);
  const [style, setStyle] = useState(0);
  const [payReady, setPayReady] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [url, setUrl] = useState<string | null>(null);

  useEffect(()=>{
    if(document.querySelector('#paystack-script')){ setPayReady(true); return; }
    const s=document.createElement('script');
    s.id='paystack-script';
    s.src='https://js.paystack.co/v1/inline.js';
    s.onload=()=>setPayReady(true);
    document.body.appendChild(s);
  },[]);

  const onFile = (f:File)=>{
    setFile(f);
    if(url) URL.revokeObjectURL(url);
    setUrl(URL.createObjectURL(f));
  }

  const handleExport = ()=>{
    if(!file){ alert("Upload video first!"); return; }
    if(!payReady || typeof (window as any).PaystackPop === 'undefined'){
      alert("Paystack loading... wait 2 sec"); return;
    }
    const handler = (window as any).PaystackPop.setup({
      key: 'pk_test_your_key_here',
      email: 'customer@example.com',
      amount: 15000,
      currency: 'KES',
      callback: function(){ alert("Payment success! Exporting..."); },
      onClose: function(){}
    });
    handler.openIframe();
  }

  const styles = [
    {name:"Original", filter:"none"},
    {name:"Studio Clean", filter:"contrast(1.1) brightness(1.05)"},
    {name:"Cinematic Blur", filter:"blur(0px) contrast(1.2) saturate(0)"},
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <header className="border-b border-white/10 p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">ClipMagic Studio</h1>
        <div className="text-xs text-white/50">150 KES / export</div>
      </header>
      <main className="max-w-5xl mx-auto p-6 grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="border-2 border-dashed border-white/20 rounded-2xl p-8 text-center hover:border-purple-500/50 transition">
            <input type="file" accept="video/*" id="file" className="hidden" onChange={e=> e.target.files && onFile(e.target.files[0])} />
            <label htmlFor="file" className="cursor-pointer">
              <div className="text-4xl mb-3">🎬</div>
              <div className="font-semibold">{file? file.name : "Choose video file"}</div>
              <div className="text-xs text-white/50 mt-2">MP4, MOV up to 100MB</div>
            </label>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {styles.map((s,i)=>(
              <button key={i} onClick={()=>setStyle(i)} className={`p-3 rounded-xl text-sm font-medium border transition ${style===i? 'bg-white text-black border-white' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}>{s.name}</button>
            ))}
          </div>
          <button onClick={handleExport} className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 py-4 rounded-xl font-bold text-lg shadow-lg shadow-purple-900/30 transition">
            Export - 150 KES
          </button>
        </div>
        <div className="bg-black rounded-2xl overflow-hidden border border-white/10 aspect-video flex items-center justify-center">
          {url? <video ref={videoRef} src={url} controls className="w-full h-full object-contain" style={{filter: styles[style].filter}} /> : <div className="text-white/30 text-sm">Preview will appear here</div>}
        </div>
      </main>
    </div>
  )
    }
