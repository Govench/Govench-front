import{b as n,n as r}from"./chunk-D6JMSZLO.js";import{$ as i,V as a}from"./chunk-IPLSOEAW.js";var o=class s{baseUrl=`${r.baseURL}/admin/events`;http=i(n);baseUrl2=`${r.baseURL}/events`;fileUrl=`${r.baseURL}/media`;crearEvento(e){return this.http.post(`${this.baseUrl}`,e)}eliminarEvento(e){return this.http.delete(`${this.baseUrl}/${e}`)}updateEvent(e,t){return this.http.put(`${this.baseUrl}/${e}`,t)}getEventById(e){return this.http.get(`${this.baseUrl2}/${e}`)}uploadCover(e){let t=new FormData;return t.append("file",e),this.http.post(`${this.fileUrl}/upload`,t)}static \u0275fac=function(t){return new(t||s)};static \u0275prov=a({token:s,factory:s.\u0275fac,providedIn:"root"})};export{o as a};
