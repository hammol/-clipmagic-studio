"use client";
import { useState, useEffect } from "react";

export default function Page() {
  const [file, setFile] = useState<File | null>(null);
  const [style, setStyle] = useState(0);
  const [exporting, setExporting] = useState(false);
  const [paystackReady, setPaystackReady] = useState(false);

  useEffect(()=>{
    if (document.querySelector('#paystack-script')) {
      setPaystackReady(true);
      return;
    }
    const script = document.createElement('script');
    script.id = 'paystack-script';
    script.src = 'https://js.paystack.co/v1/inline.js';
    script.async = true;
    script.onload = () => setPaystackReady(true);
    document.body.appendChild(script);
  },[]);

  const handleExport = () => {
    if (!file) {
      alert("Upload video first!");
      return;
    }
    if (!paystackReady || typeof (window as any).PaystackPop === 'undefined') {
      alert("Payment is loading... wait 2 sec and tap Export again");
      return;
    }

    const handler = (window as any).PaystackPop.setup({
      key: 'pk_live_38382c65e9b4203605860473d6a75650c4033753', // your live key
      email: 'customer@aiphotoroom.com',
      amount: 150 * 150,
      currency: 'KES',
      label: 'AI PhotoRoom Export',
      onClose: () => alert("Payment cancelled"),
      callback: function(response: any) {
        setExporting(true);
        setTimeout(()=>{
          setExporting(false);
          alert("Payment successful! ID: " + response.reference + "\nVideo exported!");
        }, 3000);
      }
    });
    handler.openIframe();
  };

  return (
    <main className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold mb-6">AI PhotoRoom Studio</h1>

      <input type="file" accept="video/*" onChange={e=>setFile(e.target.files?.[0]||null)} className="mb-4" />

      <div className="flex gap-2 mb-6">
        <button onClick={()=>setStyle(0)} className="bg-white text-black px-4 py-2 rounded">Original</button>
        <button onClick={()=>setStyle(1)} className="bg-white text-black px-4 py-2 rounded">Studio</button>
        <button onClick={()=>setStyle(2)} className="bg-white text-black px-4 py-2 rounded">Blur</button>
      </div>

      <button onClick={handleExport} className="bg-green-600 px-8 py-3 rounded-full font-bold">
        {exporting? "Exporting..." : "Export - 150 KES"}
      </button>
      {!paystackReady && <p className="text-xs mt-2 opacity-60">Loading payment...</p>}
    </main>
  );
  }
