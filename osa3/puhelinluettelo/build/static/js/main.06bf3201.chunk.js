(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{12:function(e,n,t){e.exports=t(37)},37:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),o=t(11),u=t.n(o),c=t(2),i=t(3),l=t.n(i),m="http://localhost:3001/api/persons",s=function(){return l.a.get(m).then(function(e){return e.data})},f=function(e){return l.a.post(m,e).then(function(e){return e.data})},d=function(e,n){return l.a.put("".concat(m,"/").concat(e,"/update"),n).then(function(e){return e.data})},v=function(e){return l.a.delete("".concat(m,"/").concat(e,"/delete")).then(function(e){return e.data})},h=function(e){return r.a.createElement("div",null,"rajaa n\xe4ytett\xe4vi\xe4: ",r.a.createElement("input",{onChange:function(n){return e.onChange(n.target.value)}}))},b=function(e){return r.a.createElement("form",null,r.a.createElement("div",null,"nimi: ",r.a.createElement("input",{onChange:function(n){return e.onChangeName(n.target.value)}})),r.a.createElement("div",null,"numero: ",r.a.createElement("input",{onChange:function(n){return e.onChangeNumber(n.target.value)}})),r.a.createElement("div",null,r.a.createElement("button",{type:"submit",onClick:function(n){return function(n){n.preventDefault(),e.onSubmit()}(n)}},"lis\xe4\xe4")))},g=function(e){return r.a.createElement("div",{key:e.id},e.name," ",e.number,r.a.createElement("button",{onClick:function(){return e.onRemove(e.id,e.name)}},"Poista"))},E=function(e){var n=e.persons,t=e.nameFilter,a=e.onRemove;return r.a.createElement("div",null,n.filter(function(e){return e.name.toLocaleLowerCase().includes(t.toLocaleLowerCase())}).map(function(e){return r.a.createElement(g,{key:e.name,name:e.name,number:e.number,id:e.id,onRemove:a})}))},p=function(e){var n=e.message;if(!n.message)return null;var t={color:n.error?"red":"green",background:"lightgrey",fontSize:20,borderStyle:"solid",borderRadius:5,padding:10,marginBottom:10};return r.a.createElement("div",{style:t},n.message)},j=function(){var e=Object(a.useState)([]),n=Object(c.a)(e,2),t=n[0],o=n[1],u=Object(a.useState)(""),i=Object(c.a)(u,2),l=i[0],m=i[1],g=Object(a.useState)(""),j=Object(c.a)(g,2),k=j[0],C=j[1],w=Object(a.useState)(""),y=Object(c.a)(w,2),O=y[0],S=y[1],L=Object(a.useState)({message:"",error:!1}),N=Object(c.a)(L,2),P=N[0],R=N[1];Object(a.useEffect)(function(){s().then(function(e){return o(e)})},[t]);var I=function(e){var n=arguments.length>1&&void 0!==arguments[1]&&arguments[1];R({message:e,error:n}),setInterval(function(){R(""),clearInterval()},4e3)};return r.a.createElement("div",null,r.a.createElement("h1",null,"Puhelinluettelo"),r.a.createElement(p,{message:P}),r.a.createElement(h,{onChange:function(e){return S(e)}}),r.a.createElement("h2",null,"Lis\xe4\xe4 uusi"),r.a.createElement(b,{onChangeName:function(e){return m(e)},onChangeNumber:function(e){return C(e)},onSubmit:function(){t.every(function(e){return e.name!==l})?f({name:l,number:k}).then(I("Lis\xe4ttiin ".concat(l))).catch(function(e){return I("Henkil\xf6n ".concat(l," luominen ei onnistunut"),!0)}):window.confirm("".concat(l," on jo luettelossa, korvataanko vanha numero uudella?"))&&d(t.findIndex(function(e){return e.name===l})+1,{name:l,number:k}).then(I("P\xe4ivitettiin ".concat(l))).catch(function(e){return I("Henkil\xf6\xe4 ".concat(l," ei l\xf6ytynyt"),!0)})}}),r.a.createElement("h2",null,"Numerot"),r.a.createElement(E,{persons:t,nameFilter:O,onRemove:function(e,n){window.confirm("Poistetaanko ".concat(n,"?"))&&v(e).then(I("Poistettiin ".concat(n))).catch(function(e){return I("Henkil\xf6 ".concat(l," oli jo poistettu"),!0)})}}))};u.a.render(r.a.createElement(j,null),document.getElementById("root"))}},[[12,1,2]]]);
//# sourceMappingURL=main.06bf3201.chunk.js.map