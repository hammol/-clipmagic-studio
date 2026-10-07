"use client"
import {useState,useRef} from 'react'
export default function Home(){
  const [video,setVideo]=useState<string|null>(null)
  const [caption,setCaption]=useState("THIS IS HOW YOU GO VIRAL")
  const [style,setStyle]=useState(0)
  const styles=[
    {name:"Hormozi",bg:"#FFFF00",color:"black"},
    {name:"MrBeast",bg:"#FF0000",color:"white"},
    {name:"Minimal",bg:"white",color:"black"},
  ]
  const inputRef=useRef<HTMLInputElement>(null)
  const handleFile=(e:any)=>{
    const file=e.target.files?.[0]
    if(file){ setVideo(URL.createObjectURL(file)) }
  }
  return (
    <main style={{minHeight:'100vh',background:'black',color:'white',fontFamily:'sans-serif',padding:20}}>
      <div style={{maxWidth:1100,margin:'0 auto'}}>
        <h1 style={{fontSize:32,fontWeight:900}}>✨ ClipMagic Studio <span style={{color:'#FFFF00'}}>PRO</span></h1>
        <p style={{opacity:0.7}}>Turn long videos into viral shorts in 30 seconds.</p>

        {!video? (
          <div onClick={()=>inputRef.current?.click()} style={{marginTop:30,border:'2px dashed #444',borderRadius:20,padding:60,textAlign:'center',cursor:'pointer'}}>
            <div style={{fontSize:50}}>📤</div>
            <h2>Drop your podcast / video here</h2>
            <p style={{opacity:0.6}}>MP4, MOV up to 500MB</p>
            <input ref={inputRef} type="file" accept="video/*" onChange={handleFile} hidden/>
            <button style={{marginTop:20,background:'white',color:'black',padding:'12px 24px',borderRadius:99,fontWeight:800,border:'none'}}>Select Video</button>
          </div>
        ):(
          <div style={{display:'grid',gridTemplateColumns:'1fr 340px',gap:20,marginTop:30}}>
            <div style={{background:'#111',borderRadius:20,padding:10,aspectRatio:'9/16',maxHeight:700,position:'relative',overflow:'hidden'}}>
              <video src={video} controls style={{width:'100%',height:'100%',objectFit:'cover',borderRadius:15}}/>
              <div style={{position:'absolute',bottom:80,left:'50%',transform:'translateX(-50%)',background:styles[style].bg,color:styles[style].color,padding:'6px 14px',borderRadius:8,fontWeight:900,fontSize:22,textAlign:'center',maxWidth:'90%'}}>{caption}</div>
            </div>
            <div style={{background:'#181818',borderRadius:20,padding:20}}>
              <h3>Caption Text</h3>
              <input value={caption} onChange={e=>setCaption(e.target.value)} style={{width:'100%',padding:12,borderRadius:10,border:'1px solid #333',background:'black',color:'white',marginTop:8}}/>
              <h3 style={{marginTop:20}}>Style</h3>
              <div style={{display:'flex',gap:10,marginTop:10}}>
                {styles.map((s,i)=>(
                  <button key={i} onClick={()=>setStyle(i)} style={{flex:1,padding:12,borderRadius:10,border:style===i?'2px solid white':'1px solid #333',background:s.bg,color:s.color,fontWeight:800}}>{s.name}</button>
                ))}
              </div>
              <h3 style={{marginTop:20}}>Viral Templates</h3>
              <div style={{marginTop:10,display:'grid',gap:8}}>
                <button onClick={()=>setCaption("I LOST $10,000 IN 24 HOURS")} style={{padding:12,borderRadius:10,background:'#222',color:'white',border:'1px solid #333',textAlign:'left'}}>💰 Money Hook</button>
                <button onClick={()=>setCaption("STOP DOING THIS MISTAKE")} style={{padding:12,borderRadius:10,background:'#222',color:'white',border:'1px solid #333',textAlign:'left'}}>🚨 Warning Hook</button>
                <button onClick={()=>setCaption("THIS CHANGED MY LIFE")} style={{padding:12,borderRadius:10,background:'#222',color:'white',border:'1px solid #333',textAlign:'left'}}>🔥 Story Hook</button>
              </div>
              <button onClick={()=>{setVideo(null)}} style={{marginTop:20,width:'100%',padding:14,borderRadius:12,background:'white',color:'black',fontWeight:900,border:'none',fontSize:16}}>⬇️ Export Clip (PRO)</button>
              <p style={{fontSize:12,opacity:0.5,marginTop:10,textAlign:'center'}}>Exports in HD 1080x1920 • No watermark</p>
              <button onClick={()=>setVideo(null)} style={{marginTop:10,width:'100%',padding:10,background:'transparent',color:'#666',border:'none'}}>Upload New Video</button>
            </div>
          </div>
        )}
        <div style={{marginTop:40,display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:15}}>
          <div style={{background:'#111',padding:15,borderRadius:15}}><b>⚡ Fast</b><br/><span style={{opacity:0.6,fontSize:13}}>Auto captions in 5 sec</span></div>
          <div style={{background:'#111',padding:15,borderRadius:15}}><b>🎯 Viral</b><br/><span style={{opacity:0.6,fontSize:13}}>AI finds best moments</span></div>
          <div style={{background:'#111',padding:15,borderRadius:15}}><b>💸 Monetize</b><br/><span style={{opacity:0.6,fontSize:13}}>Ready for TikTok/Reels</span></div>
        </div>
      </div>
    </main>
  )
}
