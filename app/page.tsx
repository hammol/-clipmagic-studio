"use client";
import { useState, useRef } from "react";

export default function Home() {
  const [video, setVideo] = useState<string | null>(null);
  const [caption, setCaption] = useState("THIS IS HOW YOU GO VIRAL");
  const [style, setStyle] = useState(0);
  const styles = [
    {name:"Hormozi",bg:"#FFFF00",color:"black"},
    {name:"MrBeast",bg:"#FF0000",color:"white"},
    {name:"Minimal",bg:"white",color:"black"},
  ];

  const handleFile = (e:any) => {
    const file = e.target.files?.[0];
    if(file){
      const url = URL.createObjectURL(file);
      setVideo(url);
    }
  };

  const handleExport = () => {
    // @ts-ignore
    if(typeof window.PaystackPop === 'undefined'){
      alert('Loading payment... please tap again in 2 sec');
      return;
    }
    // @ts-ignore
    const handler = window.PaystackPop.setup({
      key: 'pk_live_38382c65e9b4203605868e96f5c6d6e1e9ccf',
      email: 'owen@clipmagic.com',
      amount: 500 * 100,
      currency: 'KES',
      channels: ['mobile_money'],
      metadata: { custom_fields: [{display_name:"ClipMagic PRO"}] },
      callback: function(res:any){
        alert('✅ PAYMENT SUCCESS! Ref: ' + res.reference + '\nNow exporting your viral clip!');
      },
      onClose: function(){
        alert('Payment window closed');
      }
    });
    handler.openIframe();
  };

  return (
    <>
      <script src="https://js.paystack.co/v1/inline.js"></script>
      <main style={{minHeight:'100vh',background:'black',color:'white',padding:20,fontFamily:'sans-serif'}}>
        <h1 style={{fontWeight:'bold'}}>✨ ClipMagic Studio PRO</h1>
        <p style={{opacity:0.7,fontSize:14}}>Turn long videos into viral shorts in 30 seconds.</p>

        <div style={{marginTop:20,border:'1px dashed #444',borderRadius:16,padding:20,textAlign:'center'}}>
          {!video? (
            <>
              <div style={{fontSize:40}}>📥</div>
              <p style={{fontWeight:'bold'}}>Drop your podcast / video here</p>
              <p style={{fontSize:12,opacity:0.6}}>MP4, MOV to 500MB</p>
              <label style={{display:'inline-block',background:'white',color:'black',padding:'10px 20px',borderRadius:20,marginTop:15,cursor:'pointer',fontWeight:'bold'}}>
                Select Video
                <input type="file" accept="video/*" onChange={handleFile} style={{display:'none'}}/>
              </label>
            </>
          ) : (
            <div style={{textAlign:'left'}}>
              <div style={{display:'flex',gap:10}}>
                <div style={{width:80,height:120,background:styles[style].bg,color:styles[style].color,display:'flex',alignItems:'center',justifyContent:'center',fontWeight:'bold',borderRadius:8,textAlign:'center',fontSize:12}}>YOU GO VIRAL</div>
                <div style={{flex:1}}>
                  <label style={{fontSize:12,opacity:0.7}}>Caption Text</label>
                  <input value={caption} onChange={e=>setCaption(e.target.value)} style={{width:'100%',background:'#222',border:'1px solid #444',borderRadius:8,padding:8,color:'white',marginTop:4}}/>
                  <p style={{fontSize:12,marginTop:10,opacity:0.7}}>Style</p>
                  <div style={{display:'flex',gap:6,marginTop:4}}>
                    {styles.map((s,i)=><button key={i} onClick={()=>setStyle(i)} style={{padding:'6px 12px',borderRadius:20,border:'none',fontSize:12,fontWeight:'bold',background:i===style?'#FFFF00':'#222',color:i===style?'black':'white'}}>{s.name}</button>)}
                  </div>
                </div>
              </div>
              <div style={{marginTop:15}}>
                <p style={{fontSize:12,opacity:0.7}}>Viral Templates</p>
                <div style={{fontSize:12,marginTop:6,opacity:0.8}}>💰 Money Hook<br/>⚠️ Warning Hook<br/>🔥 Story Hook</div>
              </div>
              <button onClick={handleExport} style={{width:'100%',background:'white',color:'black',padding:14,borderRadius:12,border:'none',fontWeight:'bold',marginTop:16,cursor:'pointer'}}>📦 Export Clip (PRO)</button>
              <p style={{fontSize:10,textAlign:'center',opacity:0.5,marginTop:6}}>Exports in HD 1080p - No watermark</p>
              <button onClick={()=>setVideo(null)} style={{width:'100%',background:'transparent',color:'#888',border:'none',marginTop:8,fontSize:12,textDecoration:'underline'}}>Upload New Video</button>
            </div>
          )}
        </div>

        <div style={{display:'flex',gap:10,marginTop:20}}>
          <div style={{flex:1,background:'#111',borderRadius:12,padding:12}}><p style={{fontSize:11,fontWeight:'bold'}}>⚡ Fast</p><p style={{fontSize:10,opacity:0.6}}>Auto captions in 5 sec.</p></div>
          <div style={{flex:1,background:'#111',borderRadius:12,padding:12}}><p style={{fontSize:11,fontWeight:'bold'}}>🔥 Viral</p><p style={{fontSize:10,opacity:0.6}}>AI finds best moments</p></div>
          <div style={{flex:1,background:'#111',borderRadius:12,padding:12}}><p style={{fontSize:11,fontWeight:'bold'}}>💸 Monetize</p><p style={{fontSize:10,opacity:0.6}}>Ready for TikTok/Reels</p></div>
        </div>
      </main>
    </>
  );
         }
