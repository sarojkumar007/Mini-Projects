(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))i(t);new MutationObserver(t=>{for(const e of t)if(e.type==="childList")for(const a of e.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function o(t){const e={};return t.integrity&&(e.integrity=t.integrity),t.referrerPolicy&&(e.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?e.credentials="include":t.crossOrigin==="anonymous"?e.credentials="omit":e.credentials="same-origin",e}function i(t){if(t.ep)return;t.ep=!0;const e=o(t);fetch(t.href,e)}})();function s(n,r=2){const o=10**r;return Math.round((n+Number.EPSILON)*o)/o}function M(n,r,o){const i=n*(r/1200)*(1+r/1200)**o/((1+r/1200)**o-1);return s(i)}const g=Intl.NumberFormat("en-US",{currency:"INR",style:"currency"}),L=Intl.DateTimeFormat("en-US",{month:"short",year:"numeric",day:"2-digit"}),c=n=>g.format(n),p=(n,r=!0)=>r?L.format(n):[n.getFullYear(),("0"+(n.getMonth()+1)).slice(-2),("0"+n.getDate()).slice(-2)].join("-");function b(){document.querySelector("#emi_form").addEventListener("submit",n=>{n.preventDefault();const r=parseFloat(document.querySelector("#principal").value??0),o=parseFloat(document.querySelector("#roi").value??0),i=parseFloat(document.querySelector("#tenure").value??0),t=document.querySelector("#start-date").value,e=M(r,o,i),a=s(e*i-r),y=s(e*i),v=[];let l=`<table class="styled_table">
      <thead>
        <tr>
          <th>#</th>
          <th>Month</th>
          <th>EMI</th>
          <th>Principal</th>
          <th>Interest</th>
          <th>Remaining</th>
        </tr>
      </thead>
      <tbody>`;const d=new Date(t);let u=r;for(let m=1;m<=i;m++){const f=u*(o/1200),h=e-f;u-=h,v.push([p(d),Math.round(Math.abs(u)),s(h),s(f)]),l+=`<tr>
        <td>${m}</td>
        <td>${p(d)}</td>
        <td>${c(Math.round(e))}</td>
        <td>${c(s(h))}</td>
        <td>${c(s(f))}</td>
        <td>${c(Math.round(Math.abs(u)))}</td>
      </tr>`,d.setMonth(d.getMonth()+1,d.getDate())}l+="</tbody></table>",document.querySelector("#emi_table").innerHTML=l,document.querySelector("#emi_total").innerHTML=`
      <div class="grid grid-cols-1 md:grid-cols-3">
            <div>Principal: ${c(r)}</div>
            <div>Annual Rate of Interest (%): ${o}</div>
            <div>Tenure(in Months): ${i}</div>
            <div>EMI: ${c(e)}</div>
            <div>Total Interest: ${c(a)}</div>
            <div>Total Amount: ${c(y)}</div>
          </div>
      `}),document.querySelector("#emi_form").addEventListener("reset",()=>{document.querySelector("#emi_table").innerHTML="",document.querySelector("#emi_total").innerHTML=""})}document.addEventListener("DOMContentLoaded",b);
