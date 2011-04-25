YUI.add("gallery-complexnumber",function(D){function C(F,E){this.r=F||0;this.i=E||0;}C.fromPolar=function(F,E){return new C(F*Math.cos(E),F*Math.sin(E));};C.prototype={real:function(){return this.r;},imag:function(){return this.i;},magnitude:function(){return Math.sqrt(this.r*this.r+this.i*this.i);},phase:function(){return Math.atan2(this.i,this.r);},add:function(E){B(this);if(A.isComplexNumber(E)){this.r+=E.r;this.i+=E.i;}else{this.r+=E;}return this;},subtract:function(E){B(this);if(A.isComplexNumber(E)){this.r-=E.r;this.i-=E.i;}else{this.r-=E;}return this;},multiply:function(E){B(this);if(A.isComplexNumber(E)){var G=this.r*E.r-this.i*E.i;var F=this.r*E.i+this.i*E.r;this.r=G;this.i=F;}else{this.r*=E;this.i*=E;}return this;},divide:function(F){B(this);if(A.isComplexNumber(F)){var E=A.divide(this,F);this.r=E.r;this.i=E.i;}else{this.r/=F;this.i/=F;}return this;},negate:function(){B(this);this.r=-this.r;this.i=-this.i;return this;},conjugate:function(){B(this);this.i=-this.i;return this;},rotate:function(E){B(this);this.multiply(C.fromPolar(1,E));return this;},toString:function(){function E(F){return F===1?"i":F===-1?"-i":F+"i";}if(this.i===0){return this.r.toString();}else{if(this.r===0){return E(this.i);}else{return this.r+(this.i>0?"+":"")+E(this.i);}}}};D.ComplexNumber=C;function B(E){if(E===A.ZERO||E===A.I){throw Error("You cannot modify ZERO or I");}}var A={ZERO:new C(),I:new C(0,1),isComplexNumber:function(E){return((E instanceof C)||(E.hasOwnProperty("r")&&E.hasOwnProperty("i")));},add:function(){var E=new C();D.Array.each(arguments,function(F){if(D.Lang.isArray(F)){F=A.add.apply(this,F);}E.add(F);});return E;},addReciprocals:function(){var E=new C();D.Array.each(arguments,function(F){if(D.Lang.isArray(F)){E.add(A.addReciprocals.apply(this,F));}else{E.add(A.divide(1,F));}});return E;},parallel:function(){return A.divide(1,A.addReciprocals.apply(this,arguments));},subtract:function(H,G){var F=A.isComplexNumber(H),E=A.isComplexNumber(G);if(F&&E){return new C(H.r-G.r,H.i-G.i);}else{if(F){return new C(H.r-G,H.i);}else{if(E){return new C(H-G.r,-G.i);}else{return new C(H-G,0);}}}},multiply:function(){var E=new C(1,0);D.Array.each(arguments,function(F){if(D.Lang.isArray(F)){F=A.multiply.apply(this,F);}E.multiply(F);});return E;},divide:function(I,H){var F=A.isComplexNumber(I),E=A.isComplexNumber(H);if(F&&E){var G=H.r*H.r+H.i*H.i;return new C((I.r*H.r+I.i*H.i)/G,(I.i*H.r-I.r*H.i)/G);}else{if(F){return new C(I.r/H,I.i/H);}else{if(E){var G=H.r*H.r+H.i*H.i;return new C((I*H.r)/G,(-I*H.i)/G);}else{return new C(I/H,0);}}}},negative:function(E){if(A.isComplexNumber(E)){return new C(-E.r,-E.i);}else{return new C(-E,0);}},abs:function(E){if(A.isComplexNumber(E)){return new C(Math.sqrt(E.r*E.r+E.i*E.i),0);}else{return new C(Math.abs(E),0);}},phase:function(E){if(A.isComplexNumber(E)){return new C(Math.atan2(E.i,E.r),0);}else{return new C();}},conjugate:function(E){if(A.isComplexNumber(E)){return new C(E.r,-E.i);}else{return new C(E,0);}},rotate:function(F,E){return A.multiply(F,C.fromPolar(1,E));},acosh:function(E){if(A.isComplexNumber(E)){return A.log(A.add(E,A.multiply(A.sqrt(new C(E.r+1,E.i)),A.sqrt(new C(E.r-1,E.i)))));}else{return new C(Math.acosh(E),0);}},asinh:function(E){if(A.isComplexNumber(E)){var F=A.multiply(E,E);return A.log(A.add(E,A.sqrt(new C(F.r+1,F.i))));}else{return new C(Math.asinh(E),0);}},atanh:function(E){if(A.isComplexNumber(E)){var F=A.subtract(A.log(new C(1+E.r,E.i)),A.log(new C(1-E.r,-E.i)));return new C(F.r/2,F.i/2);}else{return new C(Math.atanh(E),0);}},cos:function(E){if(A.isComplexNumber(E)){return new C(Math.cos(E.r)*Math.cosh(E.i),-Math.sin(E.r)*Math.sinh(E.i));}else{return new C(Math.cos(E),0);}},cosh:function(E){if(A.isComplexNumber(E)){var F=A.add(A.exp(E),A.exp(new C(-E.r,-E.i)));return new C(F.r/2,F.i/2);}else{return new C(Math.cosh(E),0);}},exp:function(E){if(A.isComplexNumber(E)){var F=new C(Math.cos(E.i),Math.sin(E.i));F.multiply(Math.exp(E.r));return F;}else{return new C(Math.exp(E),0);}},log:function(E){if(A.isComplexNumber(E)){return new C(Math.log(E.magnitude()),E.phase());}else{return new C(Math.log(E),0);}},pow:function(E,H){var G=A.isComplexNumber(E);if((G&&E.r===0&&E.i===0)||(!G&&E===0)){var F=A.isComplexNumber(H);if((F&&H.r===0&&H.i===0)||(!F&&H===0)){return new C(1);}else{return new C();}}else{return A.exp(A.multiply(A.log(E),H));}},sin:function(E){if(A.isComplexNumber(E)){return new C(Math.sin(E.r)*Math.cosh(E.i),Math.cos(E.r)*Math.sinh(E.i));}else{return new C(Math.sin(E),0);}},sinh:function(E){if(A.isComplexNumber(E)){var F=A.subtract(A.exp(E),A.exp(new C(-E.r,-E.i)));return new C(F.r/2,F.i/2);}else{return new C(Math.sinh(E),0);}},sqrt:function(E){var F=A.isComplexNumber(E);return C.fromPolar(Math.sqrt(F?E.magnitude():Math.abs(E)),(F?E.phase():E<0?Math.PI:0)/2);},tan:function(E){if(A.isComplexNumber(E)){return A.divide(A.sin(E),A.cos(E));}else{return new C(Math.tan(E),0);}},tanh:function(E){if(A.isComplexNumber(E)){var F=A.exp(new C(2*E.r,2*E.i));return A.divide(new C(F.r-1,F.i),new C(F.r+1,F.i));}else{return new C(Math.tanh(E),0);}}};D.ComplexMath=A;},"@VERSION@",{requires:["gallery-math"]});