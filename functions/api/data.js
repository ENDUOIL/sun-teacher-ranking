export async function onRequest(context) {
  const c = {'Access-Control-Allow-Origin':'*','Access-Control-Allow-Methods':'GET,POST,OPTIONS','Access-Control-Allow-Headers':'Content-Type,x-password'};
  if(context.request.method==='OPTIONS')return new Response(null,{headers:c});
  if(context.request.method==='GET'){try{const d=await context.env.RANKING_KV.get('db','json');return new Response(JSON.stringify({success:true,data:d}),{headers:{'Content-Type':'application/json',...c}})}catch(e){return new Response(JSON.stringify({success:false,error:e.message}),{headers:{'Content-Type':'application/json',...c}})}}
  if(context.request.method==='POST'){try{const{data}=await context.request.json();await context.env.RANKING_KV.put('db',JSON.stringify(data));return new Response(JSON.stringify({success:true}),{headers:{'Content-Type':'application/json',...c}})}catch(e){return new Response(JSON.stringify({success:false,error:e.message}),{headers:{'Content-Type':'application/json',...c}})}}
  return new Response('Method not allowed',{status:405})
}