import{mkdirSync,readdirSync,readFileSync,writeFileSync}from'node:fs';
import{join}from'node:path';
const S='(9i,.237zzzzzzzz1111111-111-111z111zzzzzzzzzzzzzHLLH(zzzzzzzzzzz-0zzzzzzzzzzzzzz,,),';
const F={16:(a,b)=>(a+b)|0,17:(a,b)=>(a-b)|0,18:Math.imul,19:(a,b)=>b?a===-2147483648&&b===-1?a:(a/b)|0:NaN,20:(a,b)=>b?b===-1?0:(a%b)|0:NaN,21:(a,b)=>b?Math.floor((a>>>0)/(b>>>0))|0:NaN,22:(a,b)=>b?(a>>>0)%(b>>>0)|0:NaN,24:(a,b)=>a&b,25:(a,b)=>a|b,26:(a,b)=>a^b,28:(a,b)=>a<<(b&31),29:(a,b)=>a>>(b&31),30:(a,b)=>(a>>>(b&31))|0,32:(a,b)=>a===b?1:0,33:(a,b)=>a<b?1:0,34:(a,b)=>(a>>>0)<(b>>>0)?1:0};
function run(p,q){
const D=new Int32Array(256);let s=0;const C=new Int32Array(64);let c=0;const M=new Int32Array(256);
const o=new Uint8Array(65536);let l=0,i=0,x=0,t=0;const n=p.length;
const e=z=>({out:o.slice(0,l),code:z});
for(;;){
if(t===1e6)return e(10);
if(x<0||x>=n)return e(9);
const op=p[x],v=S.charCodeAt(op)-40;
if(op>83||v>79)return e(5);
const m=v>>4,y=(v>>2)&3,w=v&3;
if(x+m>=n)return e(9);
t++;
const nx=x+1+m;
if(s<y)return e(2);
if(s-y+w>256)return e(3);
x=nx;
if(op>=16&&op<=34&&op!==23&&op!==27){
const b=D[s-1],a=D[s-2],r=F[op](a,b);
if(r!==r)return e(4);
s-=2;D[s++]=r;
continue;
}
switch(op){
case 0:return e(0);
case 1:D[s++]=(p[nx-1]<<24)>>24;break;
case 2:D[s++]=p[nx-4]|(p[nx-3]<<8)|(p[nx-2]<<16)|(p[nx-1]<<24);break;
case 3:s--;break;
case 4:D[s]=D[s-1];s++;break;
case 5:{const g=D[s-1];D[s-1]=D[s-2];D[s-2]=g;break;}
case 6:D[s]=D[s-2];s++;break;
case 7:{const a=D[s-3];D[s-3]=D[s-2];D[s-2]=D[s-1];D[s-1]=a;break;}
case 23:D[s-1]=-D[s-1]|0;break;
case 27:D[s-1]=~D[s-1];break;
case 48:case 49:case 50:{
const r=((p[nx-2]|(p[nx-1]<<8))<<16)>>16;
let k=true;
if(op!==48){const v=D[--s];k=op===49?v===0:v!==0;}
if(k)x=nx+r;
break;
}
case 51:
if(c===64)return e(7);
C[c++]=nx;
x=p[nx-2]|(p[nx-1]<<8);
break;
case 52:
if(!c)return e(8);
x=C[--c];
break;
case 64:{
const a=D[s-1];
if(a<0||a>255)return e(6);
D[s-1]=M[a];
break;
}
case 65:{
const a=D[s-1],v=D[s-2];
if(a<0||a>255)return e(6);
s-=2;M[a]=v;
break;
}
case 80:{
const g=''+D[s-1];
if(l+g.length>65536)return e(11);
s--;
for(let j=0;j<g.length;j++)o[l++]=g.charCodeAt(j);
break;
}
case 81:
if(l+1>65536)return e(11);
o[l++]=D[--s]&255;
break;
case 82:D[s++]=i<q.length?q[i++]:-1;break;
case 83:return e(D[--s]&255);
}
}
}
const I=process.env.MAKEFUN_INPUT_DIR||'/input',O=process.env.MAKEFUN_OUTPUT_DIR||'/output';
for(const d of readdirSync(I).sort()){
const r=run(readFileSync(join(I,d,'program.bin')),readFileSync(join(I,d,'input.bin')));
mkdirSync(join(O,d),{recursive:true});
writeFileSync(join(O,d,'stdout.bin'),r.out);
writeFileSync(join(O,d,'exit.txt'),r.code+'\n');
}
