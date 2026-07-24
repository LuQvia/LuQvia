/* LuQvia diagnosis form v3.2.0 */
(function () {
  'use strict';
  var form=document.querySelector('#luqvia-diagnosis-form');if(!form)return;
  var cfg=window.LUQVIA_CONFIG||{};var endpoint=cfg.diagnosisEndpoint||'';
  var submit=form.querySelector('[type="submit"]');var message=form.querySelector('[data-form-message]');
  var productMap={'tools':'LuQvia Tools・業務自動化全般','form-notify':'LuQvia Tools：フォーム・Slack通知自動化','store-performance':'LuQvia Tools：店舗売上・スタッフ実績管理','pdf-flow':'LuQvia Tools：フォーム入力・PDF帳票生成'};
  var params=new URLSearchParams(location.search);var key=params.get('product');var select=form.querySelector('[name="interest"]');var notice=document.querySelector('[data-interest-notice]');
  if(key&&productMap[key]&&select){select.value=productMap[key];if(notice){notice.hidden=false;notice.textContent='「'+productMap[key]+'」の相談として入力を開始しています。内容は変更できます。';}}
  function values(name){return Array.prototype.slice.call(form.querySelectorAll('[name="'+name+'"]:checked')).map(function(el){return el.value;});}
  function uuid(){if(window.crypto&&crypto.randomUUID)return crypto.randomUUID();return 'lqv-'+Date.now().toString(36)+'-'+Math.random().toString(36).slice(2,12);}
  function state(text,type){message.textContent='';message.dataset.state=type||'';var p=document.createElement('p');p.textContent=text;message.appendChild(p);}
  function emit(name,p){window.dataLayer=window.dataLayer||[];window.dataLayer.push(Object.assign({event:name},p||{}));if(typeof window.gtag==='function')window.gtag('event',name,p||{});}
  function jsonpStatus(id,attempt){return new Promise(function(resolve){var cb='luqviaDiagnosisStatus_'+Date.now()+'_'+attempt;var script=document.createElement('script');var timer=setTimeout(function(){cleanup();resolve(null);},5000);function cleanup(){clearTimeout(timer);try{delete window[cb];}catch(e){window[cb]=undefined;}script.remove();}window[cb]=function(data){cleanup();resolve(data||null);};script.onerror=function(){cleanup();resolve(null);};script.src=endpoint+'?action=status&submissionId='+encodeURIComponent(id)+'&callback='+encodeURIComponent(cb)+'&_='+Date.now();document.head.appendChild(script);});}
  async function confirmSaved(id){for(var i=0;i<7;i++){await new Promise(function(r){setTimeout(r,i===0?1200:2200);});var result=await jsonpStatus(id,i);if(result&&result.status==='confirmed')return result;if(result&&result.status==='rejected')throw new Error(result.message||'受付できませんでした。');}return null;}
  form.addEventListener('submit',async function(event){
    event.preventDefault();if(!form.reportValidity())return;
    if(!/^https:\/\/script\.google\.com\/macros\/s\/.+\/exec$/.test(endpoint)){state('送信先が設定されていません。info@luqvia.comへご連絡ください。','error');return;}
    submit.disabled=true;submit.textContent='送信・受付確認中…';message.textContent='';message.dataset.state='';
    var fd=new FormData(form);var id=uuid();var payload={version:'3.2.0',submissionId:id,type:'無料導線診断',interest:fd.get('interest')||'',company:fd.get('company')||'',name:fd.get('name')||'',email:fd.get('email')||'',phone:fd.get('phone')||'',websiteUrl:fd.get('websiteUrl')||'',industry:fd.get('industry')||'',area:fd.get('area')||'',currentChannels:values('currentChannels'),issues:values('issues'),requestDetails:fd.get('requestDetails')||'',contactMethod:fd.get('contactMethod')||'',timing:fd.get('timing')||'',budget:fd.get('budget')||'',source:location.pathname+location.search,consent:fd.get('consent')==='on',honeypot:fd.get('website')||'',userAgent:navigator.userAgent.slice(0,500),referrer:(document.referrer||'').slice(0,1000),utmSource:params.get('utm_source')||'',utmMedium:params.get('utm_medium')||'',utmCampaign:params.get('utm_campaign')||'',submittedAt:new Date().toISOString()};
    emit('diagnosis_submit_start',{diagnosis_interest:payload.interest,submission_id:id});
    try{
      await fetch(endpoint,{method:'POST',mode:'no-cors',headers:{'Content-Type':'text/plain;charset=utf-8'},body:JSON.stringify(payload),cache:'no-store',keepalive:true});
      var confirmed=await confirmSaved(id);
      if(confirmed){form.reset();if(key&&productMap[key]&&select)select.value=productMap[key];state('受付が完了しました。受付ID：'+id+'。自動返信メールをご確認ください。','success');emit('diagnosis_submit_success',{diagnosis_interest:payload.interest,submission_id:id});}
      else{state('送信処理は開始しましたが、保存完了を自動確認できませんでした。受付ID：'+id+'。自動返信メールが届かない場合は、この受付IDを添えてinfo@luqvia.comへご連絡ください。','pending');emit('diagnosis_submit_unconfirmed',{diagnosis_interest:payload.interest,submission_id:id});}
    }catch(err){console.error(err);state('送信を確認できませんでした。入力内容を残したまま、時間を空けて再度お試しいただくか、info@luqvia.comへご連絡ください。','error');emit('diagnosis_submit_error',{submission_id:id});}
    finally{submit.disabled=false;submit.textContent='無料診断を申し込む';}
  });
})();
