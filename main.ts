import*as F from'node:fs';
const S='(9i,.237zzzzzzzz1111111-111-111z111zzzzzzzzzzzzzHLLH(zzzzzzzzzzz-0zzzzzzzzzzzzzz,,),';
const K=(o,a,b)=>o==16?a+b|0:o==17?a-b|0:o==18?Math.imul(a,b):o==19?b?a/b|0:NaN:o==20?b?a%b|0:NaN:o==21?b?(a>>>0)/(b>>>0)|0:NaN:o==22?b?(a>>>0)%(b>>>0)|0:NaN:o==24?a&b:o==25?a|b:o==26?a^b:o==28?a<<(b&31):o==29?a>>(b&31):o==30?a>>>(b&31)|0:o==32?+(a==b):o==33?+(a<b):+((a>>>0)<(b>>>0));
function run(p,q){
let D=[],C=[],M=[],s=0,c=0;
let o=[],l=0,i=0,x=0,t=0;
const e=z=>[Buffer.from(o),z];
for(;;){
if(t==1e6)return e(10);
if(x>>>0>=p.length)return e(9);
const op=p[x],v=S.charCodeAt(op)-40;
if(op>83||v>79)return e(5);
const m=v>>4,y=(v>>2)&3,w=v&3;
if(x+m>=p.length)return e(9);
t++;
const nx=x+1+m;
if(s<y)return e(2);
if(s-y+w>256)return e(3);
x=nx;
switch(op){
case 0:return e(0);
case 1:D[s++]=p[nx-1]<<24>>24;break;
case 2:D[s++]=p[nx-4]|p[nx-3]<<8|p[nx-2]<<16|p[nx-1]<<24;break;
case 3:s--;break;
case 4:D[s]=D[s-1];s++;break;
case 5:[D[s-1],D[s-2]]=[D[s-2],D[s-1]];break;
case 6:D[s]=D[s-2];s++;break;
case 7:[D[s-3],D[s-2],D[s-1]]=[D[s-2],D[s-1],D[s-3]];break;
case 23:D[s-1]=-D[s-1]|0;break;
case 27:D[s-1]=~D[s-1];break;
case 48:case 49:case 50:{
const r=(p[nx-2]|p[nx-1]<<8)<<16>>16;
if(op==48||(op==49?D[--s]==0:D[--s]!=0))x=nx+r;
break;
}
case 51:
if(c==64)return e(7);
C[c++]=nx;
x=p[nx-2]|p[nx-1]<<8;
break;
case 52:
if(!c)return e(8);
x=C[--c];
break;
case 64:if(D[s-1]>>>0>255)return e(6);D[s-1]=M[D[s-1]]|0;break;
case 65:if(D[s-1]>>>0>255)return e(6);M[D[s-1]]=D[s-2];s-=2;break;
case 80:{
const g=D[s-1]+'';
if(l+g.length>65536)return e(11);
s--;
for(const j of g)o[l++]=j.charCodeAt(0);
break;
}
case 81:
if(l+1>65536)return e(11);
o[l++]=D[--s]&255;
break;
case 82:D[s++]=q[i++]??-1;break;
case 83:return e(D[--s]&255);
default:{
const b=D[s-1],a=D[s-2],r=K(op,a,b);
if(r!==r)return e(4);
s-=2;D[s++]=r;
}
}
}
}
const{MAKEFUN_INPUT_DIR:I='/input',MAKEFUN_OUTPUT_DIR:O='/output'}=process.env;
for(const d of F.readdirSync(I)){
const b=I+'/'+d,p=O+'/'+d,r=run(F.readFileSync(b+'/program.bin'),F.readFileSync(b+'/input.bin'));
F.mkdirSync(p,{recursive:true});
F.writeFileSync(p+'/stdout.bin',r[0]);
F.writeFileSync(p+'/exit.txt',r[1]+'\n');
}
