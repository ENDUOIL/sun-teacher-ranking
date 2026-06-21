export async function onRequest(context) {
  const c = {'Access-Control-Allow-Origin':'*','Access-Control-Allow-Methods':'POST, OPTIONS','Access-Control-Allow-Headers':'Content-Type'};
  if(context.request.method==='OPTIONS')return new Response(null,{headers:c});
  try{const{password}=await context.request.json();const s=await context.env.RANKING_KV.get('admin_password');return new Response(JSON.stringify({success:password===(s||'251')}),{headers:{'Content-Type':'application/json',...c}})}
  catch(e){return new Response(JSON.stringify({success:false,error:e.message}),{headers:{'Content-Type':'application/json',...c}})}
}