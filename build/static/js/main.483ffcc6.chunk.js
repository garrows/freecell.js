(this.webpackJsonpfreecell=this.webpackJsonpfreecell||[]).push([[0],{1:function(e,t,n){e.exports={constants:'"../../Constants.module.css"',menuHeight:"20px",Menu:"Menu_Menu__ySKF0",MenuItem:"Menu_MenuItem__1_gke",MenuItemLeft:"Menu_MenuItemLeft__2AjAh",MenuList:"Menu_MenuList__b97po",MenuItemRight:"Menu_MenuItemRight__1kH1x",Dialog:"Menu_Dialog__3oTEx"}},14:function(e,t,n){e.exports={constants:'"../Constants.module.css"',gameWidth:"632px",gameHeight:"480px",topRowHeight:"106px",cardWidth:"71px",cardPadding:"7px",menuHeight:"20px",App:"App_App__2s_Fq"}},16:function(e,t,n){e.exports={constants:'"../Constants.module.css"',cardWidth:"71px",cardHeight:"96px",menuHeight:"20px",overseerWidth:"64px",topRowHeight:"106px",cardPadding:"7px",cardTopShowing:"18px",Card:"Card_Card__1k9eP"}},17:function(e,t,n){e.exports={CardSpace:"CardSpace_CardSpace__3db5j"}},18:function(e,t,n){e.exports={overseer:"Overseer_overseer__1sYiJ"}},21:function(e,t,n){e.exports=n(34)},26:function(e,t,n){},34:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=n(7),l=n.n(o),c=(n(26),n(4)),i=n(14),u=n.n(i),s=n(3),m=n(6),d=0,f=Object(m.b)({name:"menu",initialState:[],reducers:{illegalMove:{reducer:function(e,t){var n=t.payload,a=n.id,r=n.text;alert("Hello illegalMove slice! "+r),e.push({id:a,text:r,completed:!1})},prepare:function(e){return{payload:{text:e,id:d++}}}},toggleTodo:function(e,t){var n=e.find((function(e){return e.id===t.payload}));n&&(n.completed=!n.completed)}}}),v=f.actions,g=v.illegalMove,p=(v.toggleTodo,f.reducer),h=n(8),b=n(9),w=function(){function e(t){Object(h.a)(this,e),this.seed=t}return Object(b.a)(e,[{key:"rand",value:function(){return this.seed=214013*this.seed+2531011&2147483647,this.seed>>16&32767}},{key:"max_rand",value:function(e){return this.rand()%e}},{key:"shuffle",value:function(e){if(e.length)for(var t=e.length;--t;){var n=this.max_rand(t+1),a=e[t];e[t]=e[n],e[n]=a}return e}}]),e}();var E=function(e){var t=function(e){var t=new w(e),n=function(e,t){for(var n=[],a=e;a<=t;a++)n.push(a);return n},a=n(0,7).map((function(){return[]})),r=n(0,51);t.shuffle(r),r=r.reverse();for(var o=0;o<52;o++)a[o%8].push(r[o]);var l=function(e,t){var n=e%4,a=Math.floor(e/4),r="CDHS".charAt(n),o=["A","2","3","4","5","6","7","8","9","10","J","Q","K"][a];return{key:r+o,suit:r,value:o,int:a+1,column:0,row:t,area:"table",color:"S"===r||"C"===r?"black":"red",selected:!1}};return a.map((function(e,t){var n=e.map(l);return n.forEach((function(e){return e.column=t})),n})).flat()}(e);return t.sort((function(e,t){return e.suit<t.suit?-1:e.suit>t.suit?1:e.int-t.int})),t};function C(e){e.illegalMoveShowing=!0,e.deck.forEach((function(e){return e.selected=!1}))}function k(e,t,n){var a=e.deck.find((function(e){return e.selected}));if(a)if(a.column!==t||"table"!==a.area){var r=e.deck.filter((function(e){return"table"===e.area})).filter((function(e){return e.column===t})).sort((function(e,t){return t.row-e.row})),o=null,l=e.deck.filter((function(e){return"table"===e.area})).filter((function(e){return e.column===a.column})).sort((function(e,t){return t.row-e.row})),c=l.filter((function(e){return o?!(!o||e.int!==o.int+1||e.color===o.color)&&(o=e,!0):(o=e,!0)}));if("hold"===a.area){var i=r[0];if(i.color===a.color||i.int!==a.int+1)return C(e);a.row=i.row+1}else if(r.length>0){var u=r[0],s=c.find((function(e){return u.color!==e.color&&u.int===e.int+1}));if(!s)return C(e);var m=c.slice(c.indexOf(s)),d=u.row+1;m.forEach((function(e){e.column=t,e.row=d,d++}))}if(n)if("single"===n)a.row=0;else l.every((function(e){return o?!(!o||e.int!==o.int+1||e.color===o.color)&&(e.column=t,o=e,!0):(e.column=t,o=e,!0)})),e.deck.filter((function(e){return"table"===e.area})).filter((function(e){return e.column===a.column})).sort((function(e,t){return e.row-t.row})).forEach((function(e,t){return e.row=t}));else if(0===r.length){var f=e.deck.filter((function(e){return"table"===e.area})).filter((function(e){return e.column===a.column})).sort((function(e,t){return t.row-e.row}))[1];if(f&&a.int===f.int-1&&a.color!==f.color)return e.selectedColumn=t,void(e.moveColumnDialogShowing=!0);a.row=0}a.column=t,a.selected=!1,a.area="table",M(e)}else a.selected=!1}function y(e,t){var n=e.deck.find((function(e){return e.selected}));if(n){var a=e.deck.filter((function(e){return"stacks"===e.area})).filter((function(e){return e.column===t})).sort((function(e,t){return t.int-e.int}));if(0===a.length&&"A"!==n.value)return C(e);if(a[0]&&a[0].suit!==n.suit)return C(e);if(a[0]&&a[0].int!==n.int-1)return C(e);n.row=0,n.column=t,n.selected=!1,n.area="stacks",M(e)}}function x(e,t){for(var n=e.deck,a=function(a){var r=n.filter((function(e){return"table"===e.area})).filter((function(e){return e.column===a})).sort((function(e,t){return t.row-e.row}))[0];if(r&&r.suit===t.suit&&r.int===t.int+1)return r.area="stacks",r.column=t.column,{v:M(e)}},r=0;r<8;r++){var o=a(r);if("object"===typeof o)return o.v}for(var l=function(a){var r=n.filter((function(e){return"hold"===e.area})).filter((function(e){return e.column===a}))[0];if(r&&r&&r.suit===t.suit&&r.int===t.int+1)return r.area="stacks",r.column=t.column,{v:M(e)}},c=0;c<4;c++){var i=l(c);if("object"===typeof i)return i.v}}function M(e){var t=e.deck,n=t.filter((function(e){return"stacks"===e.area})).map((function(e){return e.column})),a=[0,1,2,3].find((function(e){return!n.includes(e)}));void 0!==a&&["S","D","H","C"].forEach((function(t){if(x(e,{int:0,suit:t,column:a}))return M(e)}));for(var r=function(n){var a=t.filter((function(e){return"stacks"===e.area})).filter((function(e){return e.column===n})).sort((function(e,t){return t.int-e.int}));if(a[0]&&x(e,a[0]))return{v:M(e)}},o=0;o<4;o++){var l=r(o);if("object"===typeof l)return l.v}e.gameOverDialogShowing=0===t.filter((function(e){return"stacks"!==e.area})).length}var N=function(){return Math.round(1e6*Math.random())},S=N(),O=Object(m.b)({name:"table",initialState:{deck:E(S),overseerDirection:"left",illegalMoveShowing:!1,seed:S},reducers:{deal:function(e,t){e.seed=t.payload||N(),e.deck=E(e.seed)},cardClicked:function(e,t){var n=e.deck.find((function(e){return e.key===t.payload.key})),a=e.deck.find((function(e){return e.selected}));if(a)if(n.key!==a.key)switch(n.area){case"table":k(e,n.column);break;case"hold":return C(e);case"stacks":y(e,n.column)}else n.selected=!1;else"table"===n.area?e.deck.filter((function(e){return"table"===e.area})).filter((function(e){return e.column===n.column})).sort((function(e,t){return t.row-e.row}))[0].selected=!0:n.selected=!0},holdSpaceClicked:function(e,t){var n=t.payload,a=e.deck.find((function(e){return e.selected}));if(a){if(e.deck.filter((function(e){return"hold"===e.area})).filter((function(e){return e.column===n})).length>0)return C(e);a.row=0,a.column=n,a.selected=!1,a.area="hold",M(e)}},stackSpaceClicked:function(e,t){y(e,t.payload)},holdSpaceHover:function(e){e.overseerDirection="left"},stackSpaceHover:function(e){e.overseerDirection="right"},cardHover:function(e,t){var n=t.payload.area;"stacks"===n?e.overseerDirection="right":"hold"===n&&(e.overseerDirection="left")},columnClicked:function(e,t){k(e,t.payload)},cardDoubleClicked:function(e,t){var n=e.deck.find((function(e){return e.key===t.payload.key}));if(n.selected=!1,"table"===n.area){var a=e.deck.filter((function(e){return"hold"===e.area}));if(a.length<4){n.area="hold",n.row=0;var r=a.map((function(e){return e.column})),o=[0,1,2,3].find((function(e){return!r.includes(e)}));n.column=o}M(e)}},closeIllegalMoveDialog:function(e){e.illegalMoveShowing=!1},closeGameOverDialog:function(e){e.gameOverDialogShowing=!1},moveSingleCard:function(e){e.moveColumnDialogShowing=!1,k(e,e.selectedColumn,"single")},moveColumn:function(e){e.moveColumnDialogShowing=!1,k(e,e.selectedColumn,"column")},cancelMoveColumnDialog:function(e){e.moveColumnDialogShowing=!1}}}),_=O.actions,j=_.deal,D=_.cardClicked,T=_.holdSpaceClicked,H=_.stackSpaceClicked,A=_.holdSpaceHover,I=_.stackSpaceHover,R=_.cardHover,L=_.columnClicked,G=_.cardDoubleClicked,W=_.closeIllegalMoveDialog,F=_.closeGameOverDialog,B=_.moveSingleCard,K=_.moveColumn,P=_.cancelMoveColumnDialog,J=function(e){return e.table.deck},Q=function(e){return e.table.illegalMoveShowing},Y=function(e){return e.table.overseerDirection},z=function(e){return e.table.seed},q=function(e){return e.table.gameOverDialogShowing},U=function(e){return e.table.moveColumnDialogShowing},X=O.reducer,$=n(16),V=n.n($);var Z=function(e){var t=e.suit,n=e.value,a=e.column,o=e.row,l=e.area,c=e.selected,i=e.onClick,u=e.onDoubleClick,s=e.onMouseEnter;return r.a.createElement("div",{style:{backgroundImage:"url(/deck/".concat(n.toLowerCase()).concat(t.toLowerCase(),".gif)")},className:"".concat(V.a.Card),"data-column":a,"data-row":o,"data-area":l,"data-value":n,"data-selected":c,onClick:i,onDoubleClick:u,onMouseEnter:s})},ee=n(17),te=n.n(ee);var ne=function(e){var t=e.suit,n=e.number,a=e.onClick;return r.a.createElement("div",{style:{backgroundImage:"url(/deck/".concat(n).concat(t,".gif)")},className:"".concat(te.a.CardSpace),onClick:a})},ae=n(20),re=n(19),oe=n(18),le=n.n(oe),ce=function(e){Object(ae.a)(n,e);var t=Object(re.a)(n);function n(){return Object(h.a)(this,n),t.apply(this,arguments)}return Object(b.a)(n,[{key:"render",value:function(){var e=this.props,t=e.direction,n=e.gameOver;return r.a.createElement("div",{className:"".concat(le.a.overseer)},n?null:r.a.createElement("img",{src:"/deck/overseer-".concat(t,".gif"),alt:"overseeing king"}))}}]),n}(a.Component),ie=n(5),ue=n.n(ie),se=n(1),me=n.n(se);n(33);function de(e){var t=e.deck,n=e.newGame,o=e.undo,l=e.illegalMoveShowing,i=e.onIllegalMoveClosed,u=e.gameOverShowing,s=e.onGameOverClosed,m=e.moveColumnDialogShowing,d=e.onMoveSingleCard,f=e.onMoveColumn,v=e.onCancelMoveColumn,g=e.seed,p=Object(a.useState)(!1),h=Object(c.a)(p,2),b=h[0],w=h[1],E=Object(a.useState)("game"),C=Object(c.a)(E,2),k=C[0],y=C[1],x=Object(a.useState)(!1),M=Object(c.a)(x,2),N=M[0],S=M[1],O=Object(a.useState)(!1),_=Object(c.a)(O,2),j=_[0],D=_[1],T=Object(a.useState)(!1),H=Object(c.a)(T,2),A=H[0],I=H[1],R=Object(a.useState)(!1),L=Object(c.a)(R,2),G=L[0],W=L[1],F=Object(a.useState)(!0),B=Object(c.a)(F,2),K=B[0],P=B[1],J=Object(a.useState)(g),Q=Object(c.a)(J,2),Y=Q[0],z=Q[1],q=t.filter((function(e){return"stacks"!==e.area})).length;function U(e){y(e),w(!b)}function X(e){w(!1),e()}return r.a.createElement("div",{className:me.a.Menu},r.a.createElement("div",{className:"".concat(me.a.MenuItem," ").concat(me.a.MenuItemLeft),onClick:function(){return U("game")},onMouseEnter:function(){return y("game")}},"Game"),r.a.createElement("div",{className:"".concat(me.a.MenuItem," ").concat(me.a.MenuItemLeft),onClick:function(){return U("help")},onMouseEnter:function(){return y("help")}},"Help"),r.a.createElement("div",{className:"".concat(me.a.MenuItem," ").concat(me.a.MenuItemRight)},"Cards left: ",q),b&&"game"===k?r.a.createElement("div",{className:me.a.MenuList},r.a.createElement("div",{onClick:function(){return X((function(){return D(!0)}))}},"New Game"),r.a.createElement("div",{onClick:function(){return X((function(){return W(!0)}))}},"Select Game"),r.a.createElement("div",{onClick:function(){return X((function(){return I(!0)}))}},"Restart Game"),r.a.createElement("div",{onClick:function(){return X(o)},disabled:!0},"Undo")):null,b&&"help"===k?r.a.createElement("div",{className:me.a.MenuList,style:{left:"35px"}},r.a.createElement("div",{onClick:function(){return X((function(){return S(!0)}))}},"About...")):null,j||A?r.a.createElement("div",{className:me.a.Dialog},r.a.createElement("div",{style:{width:"235px"},className:"window"},r.a.createElement("div",{className:"title-bar"},r.a.createElement("div",{className:"title-bar-text"},"FreeCell"),r.a.createElement("div",{className:"title-bar-controls"},r.a.createElement("button",{"aria-label":"Close"}))),r.a.createElement("div",{className:"window-body"},r.a.createElement("img",{src:"/info.png",alt:"info bubble",style:{verticalAlign:"middle"}}),r.a.createElement("span",{style:{textAlign:"center"}},"Do you want to resign this game?"),r.a.createElement("div",{className:"field-row",style:{justifyContent:"center"}},r.a.createElement("button",{onClick:function(){A?(n(g),I(!1)):(n(),D(!1))}},"Yes"),r.a.createElement("button",{onClick:function(){return D(!1)}},"No"))))):null,u?r.a.createElement("div",{className:me.a.Dialog},r.a.createElement("div",{style:{width:"210px"},className:"window"},r.a.createElement("div",{className:"title-bar",style:{height:"21px"}},r.a.createElement("div",{className:"title-bar-text"},"Game Over")),r.a.createElement("div",{className:"window-body"},r.a.createElement("p",{style:{textAlign:"center"}},"Congratulations, you win!"),r.a.createElement("p",{style:{textAlign:"center"}},"Do you want to play again?"),r.a.createElement("div",{className:"field-row",style:{paddingLeft:"19px",paddingTop:"15px",paddingBottom:"7px"}},r.a.createElement("input",{defaultChecked:!0,type:"checkbox",id:"selectGame",checked:K,onChange:function(e){return P(e.target.checked)}}),r.a.createElement("label",{htmlFor:"selectGame"},"Select game")),r.a.createElement("div",{className:"field-row",style:{justifyContent:"center",marginBottom:"20px"}},r.a.createElement("button",{onClick:function(){K?(W(!0),s()):(n(),s())}},"Yes"),r.a.createElement("button",{onClick:function(){return s()}},"No"))))):null,m?r.a.createElement("div",{className:me.a.Dialog},r.a.createElement("div",{style:{width:"230px"},className:"window"},r.a.createElement("div",{className:"title-bar",style:{height:"21px"}},r.a.createElement("div",{className:"title-bar-text"},"Move to Empty Column...")),r.a.createElement("div",{className:"window-body"},r.a.createElement("div",{className:"field-row",style:{justifyContent:"center",marginTop:"25px"}},r.a.createElement("button",{style:{width:"130px"},onClick:function(){f()}},"Move column")),r.a.createElement("div",{className:"field-row",style:{justifyContent:"center",marginTop:"12px"}},r.a.createElement("button",{style:{width:"130px"},onClick:function(){d()}},"Move single card")),r.a.createElement("div",{className:"field-row",style:{justifyContent:"center",marginTop:"12px",marginBottom:"15px"}},r.a.createElement("button",{onClick:function(){v()}},"Cancel"))))):null,G?r.a.createElement("div",{className:me.a.Dialog},r.a.createElement("div",{style:{width:"185px"},className:"window"},r.a.createElement("div",{className:"title-bar"},r.a.createElement("div",{className:"title-bar-text"},"Game Number"),r.a.createElement("div",{className:"title-bar-controls"},r.a.createElement("button",{"aria-label":"Close"}))),r.a.createElement("div",{className:"window-body",style:{textAlign:"center"}},r.a.createElement("p",null,"Select a game number",r.a.createElement("br",null),"from 1 to 1000000"),r.a.createElement("p",null,r.a.createElement("input",{type:"text",value:Y,onChange:function(e){e.target.value=Math.min(1e6,parseInt(e.target.value))||0,z(e.target.value)},style:{paddingLeft:"5px"}})),r.a.createElement("div",{className:"field-row",style:{justifyContent:"center"}},r.a.createElement("button",{onClick:function(){n(Y),W(!1)}},"OK"))))):null,l?r.a.createElement("div",{className:me.a.Dialog},r.a.createElement("div",{style:{width:"198px"},className:"window"},r.a.createElement("div",{className:"title-bar"},r.a.createElement("div",{className:"title-bar-text"},"FreeCell"),r.a.createElement("div",{className:"title-bar-controls"},r.a.createElement("button",{"aria-label":"Close"}))),r.a.createElement("div",{className:"window-body"},r.a.createElement("img",{src:"/info.png",alt:"info bubble",style:{verticalAlign:"middle"}}),r.a.createElement("span",{style:{textAlign:"center"}},"That move is not allowed."),r.a.createElement("div",{className:"field-row",style:{justifyContent:"center"}},r.a.createElement("button",{onClick:function(){return i()}},"OK"))))):null,N?r.a.createElement("div",{className:me.a.Dialog},r.a.createElement("div",{style:{width:"400px"},className:"window"},r.a.createElement("div",{className:"title-bar"},r.a.createElement("div",{className:"title-bar-text"},"FreeCell"),r.a.createElement("div",{className:"title-bar-controls"},r.a.createElement("button",{"aria-label":"Close"}))),r.a.createElement("div",{className:"window-body"},r.a.createElement("img",{src:"/info.png",alt:"info bubble",style:{verticalAlign:"middle"}}),r.a.createElement("span",{style:{textAlign:"center"}},"FreeCell"),r.a.createElement("p",null,"By ",r.a.createElement("a",{href:"https://garrows.com"},"Glen Arrowsmith")),r.a.createElement("p",null,"I made this for my father and father-in-law because there were no decent ad-free or paid versions of FreeCell that run on Windows 10. Hopefully this helps get your dad off of Windows XP too."),r.a.createElement("p",null,"If you'd like to see more classic remakes, show your interest by ",r.a.createElement("a",{href:"https://patreon.com/garrows"},"supporting my Patreon"),". All proceeds go to charity."),r.a.createElement("div",{className:"field-row",style:{justifyContent:"center"}},r.a.createElement("button",{onClick:function(){return S(!1)}},"OK"))))):null)}var fe={illegalMove:g},ve=Object(s.b)((function(e,t){return{onIllegalMove:t.onIllegalMove}}),fe)((function(e){e.illegalMove;var t=Object(s.d)(J),n=Object(s.d)(Q),a=Object(s.d)(Y),o=Object(s.d)(z),l=Object(s.d)(q),c=Object(s.d)(U),i=Object(s.c)(),u=0===t.filter((function(e){return"stacks"!==e.area})).length;return document.title="FreeCell Game #".concat(o),r.a.createElement("div",null,r.a.createElement(de,{deck:t,seed:o,newGame:function(e){return i(j(e))},undo:function(){alert("undo")},illegalMoveShowing:n,onIllegalMoveClosed:function(){return i(W())},gameOverShowing:l,onGameOverClosed:function(){return i(F())},moveColumnDialogShowing:c,onMoveSingleCard:function(){return i(B())},onMoveColumn:function(){return i(K())},onCancelMoveColumn:function(){return i(P())}}),r.a.createElement("div",{className:ue.a.TopRow},r.a.createElement("div",{className:ue.a.TopRowLeft,onMouseEnter:function(){return i(A())}},r.a.createElement(ne,{onClick:function(){return i(T(0))}}),r.a.createElement(ne,{onClick:function(){return i(T(1))}}),r.a.createElement(ne,{onClick:function(){return i(T(2))}}),r.a.createElement(ne,{onClick:function(){return i(T(3))}})),r.a.createElement(ce,{direction:a,gameOver:u}),r.a.createElement("div",{className:ue.a.TopRowRight,onMouseEnter:function(){return i(I())}},r.a.createElement(ne,{onClick:function(){return i(H(0))}}),r.a.createElement(ne,{onClick:function(){return i(H(1))}}),r.a.createElement(ne,{onClick:function(){return i(H(2))}}),r.a.createElement(ne,{onClick:function(){return i(H(3))}}))),r.a.createElement("div",{className:ue.a.Table},Array.apply(null,Array(8)).map((function(e,t){return r.a.createElement("div",{key:t,className:ue.a.Column,onClick:function(){return i(L(t))}})}))),t.map((function(e){return r.a.createElement(Z,{key:e.key,suit:e.suit,value:e.value,column:e.column,row:e.row,area:e.area,selected:e.selected,onClick:function(){return i(D(e))},onDoubleClick:function(){return i(G(e))},onMouseEnter:function(){return i(R(e))}})})),u?r.a.createElement("img",{src:"/deck/overseer-smile.gif",alt:"Smiling King",className:ue.a.SmilingOverseer}):null)}));var ge=function(){var e=r.a.useRef(null),t=Object(a.useState)(.5),n=Object(c.a)(t,2),o=n[0],l=n[1];function i(){var t=Math.min(window.innerWidth/e.current.clientWidth,window.innerHeight/e.current.clientHeight);l(t)}return r.a.useEffect((function(){return window.addEventListener("resize",i),i(),function(e){window.removeEventListener("resize",i)}})),r.a.createElement("div",{ref:e,className:u.a.App,style:{transform:"scale(".concat(o,")")}},r.a.createElement(ve,null))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var pe=n(2),he=Object(pe.c)({table:X,menu:p});window.debugStack=function(e){e.forEach((function(e){return console.log(e.suit,e.value,e.color,e.int)}))};var be=Object(m.a)({reducer:he});l.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(s.a,{store:be},r.a.createElement(ge,null))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},5:function(e,t,n){e.exports={constants:'"../../Constants.module.css"',gameWidth:"632px",gameHeight:"480px",topRowHeight:"106px",cardWidth:"71px",cardPadding:"7px",menuHeight:"20px",TopRow:"Table_TopRow__2QAWd",TopRowLeft:"Table_TopRowLeft__1QOCj",TopRowRight:"Table_TopRowRight__1be-C",Table:"Table_Table__2apwH",Column:"Table_Column__1-T6H",SmilingOverseer:"Table_SmilingOverseer__2yxjp"}}},[[21,1,2]]]);
//# sourceMappingURL=main.483ffcc6.chunk.js.map