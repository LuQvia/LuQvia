/* LuQvia diagnosis form v3.6.3 */
(function () {
  'use strict';
  var form=document.querySelector('#luqvia-diagnosis-form');if(!form)return;
  var cfg=window.LUQVIA_CONFIG||{};var endpoint=cfg.diagnosisEndpoint||'';
  var submit=form.querySelector('[type="submit"]');var message=form.querySelector('[data-form-message]');
  var params=new URLSearchParams(location.search);var select=form.querySelector('[name="interest"]');var notice=document.querySelector('[data-interest-notice]');
  var interestMap={
    'quick-launch':'クイック公開パッケージ','business-start':'開業スタートパッケージ','local-growth':'店舗集客パッケージ',
    'form-automation':'予約・申込自動化パッケージ','recruiting':'採用強化パッケージ','seo-start':'SEOスタートパッケージ',
    'operation':'公開後の運用・改善'
  };
  var interestKey=params.get('interest')||params.get('product')||'';
  if(interestMap[interestKey]&&select){select.value=interestMap[interestKey];if(notice){notice.hidden=false;notice.textContent='「'+interestMap[interestKey]+'」の相談として入力を開始しています。内容は変更できます。';}}
  function values(name){return Array.prototype.slice.call(form.querySelectorAll('[name="'+name+'"]:checked')).map(function(el){return el.value;});}
  function get(name){var el=form.querySelector('[name="'+name+'"]');return el?String(el.value||''):'';}
  function uuid(){if(window.crypto&&crypto.randomUUID)return crypto.randomUUID();return 'lqv-'+Date.now().toString(36)+'-'+Math.random().toString(36).slice(2,12);}
  function state(text,type){message.textContent='';message.dataset.state=type||'';var p=document.createElement('p');p.textContent=text;message.appendChild(p);}
  function emit(name,p){window.dataLayer=window.dataLayer||[];window.dataLayer.push(Object.assign({event:name},p||{}));if(typeof window.gtag==='function')window.gtag('event',name,p||{});}
  function recommend(){
    var interest=get('interest');var features=values('neededFeatures');var issues=values('issues');var launch=get('launchTiming');var project=get('projectType');var logo=get('logoStatus');
    var title='クイック公開パッケージ';var reason='必要なページと問い合わせ導線を整理し、公開を優先する構成です。';
    if(interest&&interest!=='まず相談したい'){title=interest;reason='選択いただいた目的を中心に、必要なオプションだけを組み合わせます。';}
    else if(features.indexOf('採用ページ・応募フォーム')>=0||issues.indexOf('採用応募が少ない')>=0){title='採用強化パッケージ';reason='採用情報と応募フォームを一つの導線にまとめる構成が適しています。';}
    else if(features.indexOf('予約・申込フォーム')>=0||features.indexOf('自動返信・通知・GAS連携')>=0||issues.indexOf('更新・受付業務に手間がかかる')>=0){title='予約・申込自動化パッケージ';reason='受付、返信、通知、管理の手作業を減らす構成が適しています。';}
    else if(features.indexOf('Googleビジネスプロフィール')>=0||features.indexOf('LINE導線・公式LINE')>=0){title='店舗集客パッケージ';reason='Google、LINE、予約・問い合わせを一つの導線にする構成が適しています。';}
    else if(features.indexOf('SEO調査・改善')>=0||issues.indexOf('検索流入が少ない')>=0){title='SEOスタートパッケージ';reason='検索需要と競合を確認し、公開後の改善計画まで設計する構成が適しています。';}
    else if(project==='新規制作'&&(logo==='作成を相談したい'||features.indexOf('独自ドメイン・メール')>=0||features.indexOf('ロゴ作成')>=0)){title='開業スタートパッケージ';reason='ホームページに加え、ロゴやドメインなど開業時のWeb環境をまとめる構成が適しています。';}
    else if(launch==='1週間以内'||launch==='2週間以内'||issues.indexOf('公開日が迫っている')>=0){title='クイック公開パッケージ';reason='必要情報を先に揃え、公開範囲を限定して短納期を優先します。';}
    var t=form.querySelector('[data-recommendation-title]');var r=form.querySelector('[data-recommendation-reason]');var h=form.querySelector('[name="recommendedPackage"]');
    if(t)t.textContent=title;if(r)r.textContent=reason;if(h)h.value=title;
    return {title:title,reason:reason};
  }
  form.addEventListener('change',recommend);form.addEventListener('input',recommend);recommend();
  function jsonpStatus(id,attempt){return new Promise(function(resolve){var cb='luqviaDiagnosisStatus_'+Date.now()+'_'+attempt;var script=document.createElement('script');var timer=setTimeout(function(){cleanup();resolve(null);},5000);function cleanup(){clearTimeout(timer);try{delete window[cb];}catch(e){window[cb]=undefined;}script.remove();}window[cb]=function(data){cleanup();resolve(data||null);};script.onerror=function(){cleanup();resolve(null);};script.src=endpoint+'?action=status&submissionId='+encodeURIComponent(id)+'&callback='+encodeURIComponent(cb)+'&_='+Date.now();document.head.appendChild(script);});}
  async function confirmSaved(id){for(var i=0;i<7;i++){await new Promise(function(r){setTimeout(r,i===0?1200:2200);});var result=await jsonpStatus(id,i);if(result&&result.status==='confirmed')return result;if(result&&result.status==='rejected')throw new Error(result.message||'受付できませんでした。');}return null;}
  form.addEventListener('submit',async function(event){
    event.preventDefault();if(!form.reportValidity())return;
    if(!/^https:\/\/script\.google\.com\/macros\/s\/.+\/exec$/.test(endpoint)){state('送信先が設定されていません。info@luqvia.comへご連絡ください。','error');return;}
    var rec=recommend();submit.disabled=true;submit.textContent='送信・受付確認中…';message.textContent='';message.dataset.state='';
    var fd=new FormData(form);var id=uuid();var payload={
      version:'3.6.3',submissionId:id,type:'無料導線診断',interest:fd.get('interest')||'',recommendedPackage:rec.title,recommendationReason:rec.reason,
      company:fd.get('company')||'',name:fd.get('name')||'',email:fd.get('email')||'',phone:fd.get('phone')||'',industry:fd.get('industry')||'',area:fd.get('area')||'',
      projectType:fd.get('projectType')||'',websiteStatus:fd.get('websiteStatus')||'',websiteUrl:fd.get('websiteUrl')||'',launchTiming:fd.get('launchTiming')||'',pageCount:fd.get('pageCount')||'',
      logoStatus:fd.get('logoStatus')||'',copyStatus:fd.get('copyStatus')||'',photoStatus:fd.get('photoStatus')||'',budget:fd.get('budget')||'',neededFeatures:values('neededFeatures'),issues:values('issues'),
      requestDetails:fd.get('requestDetails')||'',contactMethod:fd.get('contactMethod')||'',meetingMethod:fd.get('meetingMethod')||'',source:location.pathname+location.search,consent:fd.get('consent')==='on',honeypot:fd.get('website')||'',
      userAgent:navigator.userAgent.slice(0,500),referrer:(document.referrer||'').slice(0,1000),utmSource:params.get('utm_source')||'',utmMedium:params.get('utm_medium')||'',utmCampaign:params.get('utm_campaign')||'',submittedAt:new Date().toISOString()
    };
    emit('diagnosis_submit_start',{diagnosis_interest:payload.interest,recommended_package:payload.recommendedPackage,submission_id:id});
    try{
      await fetch(endpoint,{method:'POST',mode:'no-cors',headers:{'Content-Type':'text/plain;charset=utf-8'},body:JSON.stringify(payload),cache:'no-store',keepalive:true});
      var confirmed=await confirmSaved(id);
      if(confirmed){form.reset();if(interestMap[interestKey]&&select)select.value=interestMap[interestKey];recommend();state('受付が完了しました。受付ID：'+id+'。自動返信メールをご確認ください。','success');emit('diagnosis_submit_success',{diagnosis_interest:payload.interest,recommended_package:payload.recommendedPackage,submission_id:id});}
      else{state('送信処理は開始しましたが、保存完了を自動確認できませんでした。受付ID：'+id+'。自動返信メールが届かない場合は、この受付IDを添えてinfo@luqvia.comへご連絡ください。','pending');emit('diagnosis_submit_unconfirmed',{diagnosis_interest:payload.interest,recommended_package:payload.recommendedPackage,submission_id:id});}
    }catch(err){console.error(err);state('送信を確認できませんでした。入力内容を残したまま、時間を空けて再度お試しいただくか、info@luqvia.comへご連絡ください。','error');emit('diagnosis_submit_error',{submission_id:id});}
    finally{submit.disabled=false;submit.textContent='無料診断を申し込む';}
  });
})();
