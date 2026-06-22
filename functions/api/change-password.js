export async function onRequest(context) {
  const c = {'Access-Control-Allow-Origin':'*','Access-Control-Allow-Methods':'POST,OPTIONS','Access-Control-Allow-Headers':'Content-Type'};
  if(context.request.method==='OPTIONS')return new Response(null,{headers:c});
  try{const{super_password,new_password}=await context.request.json();const s=await context.env.RANKING_KV.get('super_password');if(super_password!==(s||'yangjian1'))return new Response(JSON.stringify({success:false,error:'超级密码错误'}),{headers:{'Content-Type':'application/json',...c}});if(!new_password)return new Response(JSON.stringify({success:false,error:'密码不能为空'}),{headers:{'Content-Type':'application/json',...c}});await context.env.RANKING_KV.put('admin_password',new_password);return new Response(JSON.stringify({success:true}),{headers:{'Content-Type':'application/json',...c}})}
  catch(e){return new Response(JSON.stringify({success:false,error:e.message}),{headers:{'Content-Type':'application/json',...c}})}
}