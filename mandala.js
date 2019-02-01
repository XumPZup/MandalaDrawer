var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var d = 700;
var canvasCenter = d/2;
ctx.canvas.width = d;
ctx.canvas.height = d;

//
//
// - Buttons
var addCircle = document.getElementById('ring');
var addCirclePattern = document.getElementById('ringPattern');
var addPetalsPatternBtn = document.getElementById('petalsPattern');
var addLinesPatternBtn = document.getElementById('linesPattern');
var addTrianglesPatternBtn = document.getElementById('trianglesPattern');
var addSpyralsPatternBtn = document.getElementById('spyralsPattern');
var addPreMadePetalsBtn = document.getElementById('preMadePetalsPattern');
var addPreMadePetals2Btn = document.getElementById('preMadePetalsPattern2');
var addPreMadePetals3Btn = document.getElementById('preMadePetalsPattern3');
var deleteBtn = document.getElementById('delete');
var copyBtn = document.getElementById('copy');
var lineToggle = document.getElementById('lines');
var decorationMenuToggle = document.getElementById('toggleDecorations');


// - Bttuons Event Listeners
addCircle.addEventListener('click', addRing);
addCirclePattern.addEventListener('click', addRingPattern);
addPetalsPatternBtn.addEventListener('click', addPetalsPattern);
addLinesPatternBtn.addEventListener('click', addLinesPattern);
addTrianglesPatternBtn.addEventListener('click', addTrianglesPattern);
addSpyralsPatternBtn.addEventListener('click', addSpyralsPattern);
addPreMadePetalsBtn.addEventListener('click', addPreMadePetalsPattern);
addPreMadePetals2Btn.addEventListener('click', addPreMadePetalsPattern2);
addPreMadePetals3Btn.addEventListener('click', addPreMadePetalsPattern3);

// - Not adders
lineToggle.addEventListener('click', toggleLines);
decorationMenuToggle.addEventListener('click', toggleDecorations);
deleteBtn.addEventListener('click', deleteObj);
copyBtn.addEventListener('click', copyObj);


// - Inputs div
var menu = document.getElementById('menu');

// - List div
var objectList = document.getElementById('objects');

//Event when inputs change
var inputsDiv = document.getElementsByClassName('menuInput');
for(var i = 0; i < inputsDiv.length; i++){
	input = inputsDiv[i].getElementsByTagName('input')[0];
	input.addEventListener('change', editObject);
}


var mainColor = '#000000';
// background must be an <image> elem
var background = false;

var showLines = true;
var objs = [];



function lines(){
	ctx.lineWidth = 1;
	ctx.strokeStyle = mainColor;
	ctx.beginPath();
	// - PI / 2
	ctx.moveTo(d*0.5,0)
	ctx.lineTo(d*0.5,d);
	ctx.moveTo(0,d*0.5)
	ctx.lineTo(d,d*0.5);
	// - PI / 4
	ctx.moveTo(0,0)
	ctx.lineTo(d,d);
	ctx.moveTo(0,d)
	ctx.lineTo(d,0);
	ctx.stroke();
	ctx.closePath();
}


// Save / Load //
function save(){
	var str = ''
	for(var i = 0; i < objs.length; i++){
		str += objs[i].repr();
		str += '|';
	}
	return str;
//	var p = document.createElement('p');
//	p.innerHTML = str;
//	document.body.appendChild(p);
}


function load(str){
	var objects = str.split('|').splice(0, str.split('|').length-1);
	for(var i = 0; i < objects.length; i++){
		var key_val = objects[i].split(';');
		var keys = key_val[0].split(',').splice(0, key_val[0].split(',').length-1);
		var values = key_val[1].split(',').splice(0, key_val[1].split(',').length-1);
		var btn = document.getElementById(values[0]).click();
		for(var j = 0; j < keys.length; j++){
			if(values[j][0] == '#'){
				objs[objs.length-1][keys[j]] = values[j];
			}
			else{
				objs[objs.length-1][keys[j]] = parseFloat(values[j]);
			}
		}
	}
	draw();
}


//____________________________________________//
// Toggle Lines/Decoration, Delete and copy  //
//__________________________________________//

// lineToggle eventListener
function toggleLines(){
	if(lineToggle.checked){
		showLines = true;
	}
	else{
		showLines = false;
	}
	draw();
}

// decorationMenuToggle eventListener
function toggleDecorations(){
	if(this.checked){
		document.getElementById('decorations').style.display='block';
	}
	else{
		document.getElementById('decorations').style.display='none';
	}
}

// delete eventListener
function deleteObj(){
	var current = document.getElementsByClassName('on');
	if(current.length){
		var id = current[0].getAttribute('id');
		current[0].remove();
		objs.splice(id, 1);
		for(var i = parseInt(id); i < objs.length; i++){
			var obj = document.getElementById(i+1);
			var txt = obj.innerHTML.split(' ');
			obj.innerHTML = '';
			for(var j = 0; j < txt.length-1; j++){
				obj.innerHTML += txt[j] + ' ';
			}
			obj.innerHTML += 'id=' + i;
			obj.setAttribute('id', i);
		}
		draw();
	}
}


// copyBtn eventListener
function copyObj(){
	var current = document.getElementsByClassName('on');
	if(current.length){
		var id = current[0].getAttribute('id');
		var btn = document.getElementById(objs[id].tp);
		btn.click();
		var keys = Object.keys(objs[id]).splice(0, Object.keys(objs[id]).length-2);
		for(var i = 0; i < keys.length; i++){
			objs[objs.length-1][keys[i]] = objs[id][keys[i]];
		}
		draw();
	}
}



//________________
// - Classes
//_________________
function Ring(){
	this.tp = 'ring';
	this.radius = 20;
	this.lineWidth = 1;
	this.lineColor = mainColor;
	this.fill = 0;
	// Displays a circle 
	this.display = function(){
		ctx.beginPath();
		ctx.lineWidth = this.lineWidth;
		ctx.fillStyle = this.lineColor;
		ctx.arc(canvasCenter,canvasCenter,this.radius,0,2*Math.PI);
		ctx.strokeStyle = this.lineColor;
		if(this.fill){
			ctx.fill();
		}
		else{
			ctx.stroke();
		}
		ctx.closePath();
	}
	
	this.repr = function(){
		keys = Object.keys(this).splice(0, Object.keys(this).length-2);
		keysStr = ''
		valStr = '';
		for(var i = 0; i < keys.length; i++){
			keysStr += keys[i] + ',';
			valStr += this[keys[i]] + ',';
		}
		str = keysStr + ';' + valStr;
		return str;
	}
}

//________________________________________________________________________________________________________________//
//________________________________________________________________________________________________________________//
function RingPattern(){
	this.tp = 'ringPattern';
	// Object
	this.radius = 15;
	this.center = 30;
	this.quantity = 0.5;
	this.completeness = 1;
	this.orientation = 0;
	this.rotation = 0;
	this.lineWidth = 1;
	this.lineColor = mainColor;
	this.fill = 0;
	// Adders
	this.specularCopy = 0;
	this.circlesAround = 0;
	// Decoration
	this.circlesGap = 0.06; // - Gap angle from one another
	this.circlesRadius = 3; 
	this.circlesDistance = 2; // - Distance from the side
	this.start = 0; // - Start position
	this.stop = 1; // - End position
	this.fillCircles = 0; // 0/1 Fills circles
	this.circlesColor = mainColor;
	this.circlesLineWidth = 1;
	//____________________________
	// Decorative Funcrions
	//_____________________________
	this.displayCirclesAround = function(x, y, u){
		var gap = this.circlesGap * Math.PI;
		var cmplt = this.completeness * Math.PI;
		var radius2 = this.radius - this.circlesDistance;

		for(var i = u - cmplt + gap*this.stop; i < u + cmplt-gap*this.start; i+=gap){
			ctx.beginPath();
			ctx.lineWidth = this.circlesLineWidth;
			ctx.fillStyle = this.circlesColor;
			ctx.strokeStyle = this.circlesColor;
			
			var xC = x + Math.cos(i) * radius2;
			var yC = y + Math.sin(i) * radius2;
			ctx.arc(xC, yC, this.circlesRadius, 0, Math.PI*2);
			if(this.fillCircles){
				ctx.fill();
			}
			else{
				ctx.stroke()
			}
			ctx.closePath();
		}
	}
	//________________________
	// Main Display
	//________________________
	// Displays a pattern of Circles
	this.display = function(){
		var cmplt = this.completeness * Math.PI;
		var itselfRotation = this.rotation * Math.PI;
		for(var i = this.orientation*Math.PI; i < Math.PI * 2+this.orientation*Math.PI; i+=(Math.PI*(1/8)) / this.quantity){
			var u = i + itselfRotation;
			ctx.beginPath();
			ctx.lineWidth = this.lineWidth;
			ctx.fillStyle = this.lineColor;
			ctx.strokeStyle = this.lineColor;
			//
			var x = Math.cos(i)*this.center+canvasCenter;
			var y = Math.sin(i)*this.center+canvasCenter
			ctx.arc(x, y, this.radius, u - cmplt, cmplt + u);	
			//
			if(this.fill){
				ctx.fill();
			}
			else{
				ctx.stroke()
			}
			ctx.closePath();
			//____________________________
			//Circles Around
			//____________________________
			if(this.circlesAround){
				this.displayCirclesAround(x,y,u);
			}
			//_______________________
			// Specular copy
			//_______________________
			if(this.specularCopy){
				var ii = i - this.orientation*Math.PI*2;
				var uu = -itselfRotation + ii;
				ctx.beginPath();
				ctx.lineWidth = this.lineWidth;
				ctx.fillStyle = this.lineColor;
				ctx.strokeStyle = this.lineColor;
				var x = Math.cos(ii)*this.center+canvasCenter;
				var y = Math.sin(ii)*this.center+canvasCenter
				ctx.arc(x, y, this.radius, uu - cmplt, cmplt + uu);	
				if(this.fill){
				ctx.fill();
				}
				else{
					ctx.stroke()
				}
				ctx.closePath();
				//____________________________
				//Circles Around
				//____________________________
				if(this.circlesAround){
					this.displayCirclesAround(x,y,uu);
				}
			}
		}	
	}
	
	this.repr = function(){
		keys = Object.keys(this).splice(0, Object.keys(this).length-3);
		keysStr = ''
		valStr = '';
		for(var i = 0; i < keys.length; i++){
			keysStr += keys[i] + ',';
			valStr += this[keys[i]] + ',';
		}
		str = keysStr + ';' + valStr;
		return str;
	}
}

						
function PetalsPattern(){
	this.tp = 'petalsPattern';
	this.radius = 15;
	this.center = 30;
	this.quantity = 0.5;
	this.completeness = 0.5;
	this.orientation = 0;
	this.proximity = 0;
	// left side rotation
	this.rotation1 = 0;
	// right side rotation
	this.rotation2 = 0;
	this.lineWidth = 1;
	this.lineColor = mainColor;
	this.display = function(){
		ctx.lineWidth = this.lineWidth;
		ctx.strokeStyle = this.lineColor;
		for(var i = this.orientation*Math.PI; i < Math.PI * 2+this.orientation*Math.PI; i+=(Math.PI*(1/8)) / this.quantity){
			ctx.beginPath();
			ctx.arc(Math.cos((this.proximity*Math.PI) + i)*this.center+canvasCenter, Math.sin((this.proximity*Math.PI) + i)*this.center+canvasCenter, this.radius, 
					-Math.PI*this.completeness + (this.proximity*Math.PI) + i + (1.5+this.rotation1), Math.PI*this.completeness + (this.proximity*Math.PI) + i + (1.5+this.rotation1));	
			ctx.stroke();
			ctx.closePath();
			ctx.beginPath();
			ctx.arc(Math.cos(i - (this.proximity*Math.PI))*this.center+canvasCenter, Math.sin(i - (this.proximity*Math.PI))*this.center+canvasCenter, this.radius,
					Math.PI*(1-this.completeness) + i-(this.proximity*Math.PI) + (1.5+this.rotation2), -Math.PI*(1-this.completeness) + i-(this.proximity*Math.PI) + (1.5+this.rotation2));
			ctx.stroke();
			ctx.closePath();
		}
	}
	
	this.repr = function(){
		keys = Object.keys(this).splice(0, Object.keys(this).length-2);
		keysStr = ''
		valStr = '';
		for(var i = 0; i < keys.length; i++){
			keysStr += keys[i] + ',';
			valStr += this[keys[i]] + ',';
		}
		str = keysStr + ';' + valStr;
		return str;
	}
}

					
function LinesPattern(){
	this.tp = 'linesPattern';
	this.length = 10;
	this.center = 30;
	this.quantity = 0.5;
	this.orientation = 0;
	this.rotation = 0;
	this.lineWidth = 1;
	this.lineColor = mainColor;
	this.display = function(){
		ctx.beginPath();
		ctx.lineWidth = this.lineWidth;
		ctx.strokeStyle = this.lineColor;
		for(var i = this.orientation*Math.PI; i < Math.PI * 2+this.orientation*Math.PI; i+=(Math.PI*(1/8)) / this.quantity){
			x = Math.cos(i)*this.center+canvasCenter;
			y = Math.sin(i)*this.center+canvasCenter;
			ctx.moveTo(x,y);;
			xx = Math.cos(i + Math.PI*this.rotation) * this.length;
			yy = Math.sin(i + Math.PI*this.rotation) * this.length;
			x = x+xx;
			y = y+yy;
			ctx.lineTo(x,y);
		}
		ctx.stroke();
		ctx.closePath();
	}
	
	this.repr = function(){
		keys = Object.keys(this).splice(0, Object.keys(this).length-2);
		keysStr = ''
		valStr = '';
		for(var i = 0; i < keys.length; i++){
			keysStr += keys[i] + ',';
			valStr += this[keys[i]] + ',';
		}
		str = keysStr + ';' + valStr;
		return str;
	}
}

					
function TrianglesPattern(){
this.tp = 'trianglesPattern';
	// Object
	this.center = 30;
	this.height = 20;
	this.quantity = 0.5;
	this.angle = 0.22;
	this.orientation = 0;
	this.rotation = 0;
	this.lineWidth = 1;
	this.lineColor = mainColor;
	// Adders
	this.specularCopy = 0;
	//_______________________
	// Main Display
	//_____________________
	this.display = function(){
		var itselfRotation = this.rotation * Math.PI;
		for(var i = this.orientation*Math.PI; i < Math.PI*2 + this.orientation*Math.PI; i+=(Math.PI*(1/8)) / this.quantity){
			ctx.beginPath();
			ctx.lineWidth = this.lineWidth;
			ctx.strokeStyle = this.lineColor;
			u = i + itselfRotation;
			Ax = Math.cos(i) * (this.center + this.height) + canvasCenter;
			Ay = Math.sin(i) * (this.center + this.height) + canvasCenter;
			Bx = Math.cos(u-Math.PI+this.angle) * this.height + Ax;
			By = Math.sin(u-Math.PI+this.angle) * this.height + Ay;
			Cx = Math.cos(u+Math.PI-this.angle) * this.height + Ax;
			Cy = Math.sin(u+Math.PI-this.angle) * this.height + Ay;
			ctx.moveTo(Bx, By);
			ctx.lineTo(Ax, Ay);
			ctx.lineTo(Cx, Cy);
			ctx.stroke();
			ctx.closePath();
			//__________________________
			// - SpecularCopy
			//__________________________
			if(this.specularCopy){
				ctx.beginPath();
				ctx.lineWidth = this.lineWidth;
				ctx.strokeStyle = this.lineColor;
				var ii = i - this.orientation*Math.PI*2;
				var uu = -itselfRotation + ii;
				Ax = Math.cos(ii) * (this.center + this.height) + canvasCenter;
				Ay = Math.sin(ii) * (this.center + this.height) + canvasCenter;
				Bx = Math.cos(uu-Math.PI+this.angle) * this.height + Ax;
				By = Math.sin(uu-Math.PI+this.angle) * this.height + Ay;
				Cx = Math.cos(uu+Math.PI-this.angle) * this.height + Ax;
				Cy = Math.sin(uu+Math.PI-this.angle) * this.height + Ay;
				ctx.moveTo(Bx, By);
				ctx.lineTo(Ax, Ay);
				ctx.lineTo(Cx, Cy);
				ctx.stroke();
				ctx.closePath();
			}
		}	
	}
	
	this.repr = function(){
		keys = Object.keys(this).splice(0, Object.keys(this).length-2);
		keysStr = ''
		valStr = '';
		for(var i = 0; i < keys.length; i++){
			keysStr += keys[i] + ',';
			valStr += this[keys[i]] + ',';
		}
		str = keysStr + ';' + valStr;
		return str;
	}
}

					
function SpyralsPattern(){
	this.tp = 'spyralsPattern';
	this.center = 30;
	this.radius = 20;
	this.quantity = 0.5;
	this.rotation = 0;
	this.orientation = 0;
	this.loops = 3;
	this.lineWidth = 1;
	this.lineColor = mainColor; 
	this.display = function(){
		ctx.beginPath();
		ctx.lineWidth = this.lineWidth;
		ctx.strokeStyle = this.lineColor;
		for(var i = this.orientation*Math.PI; i < Math.PI*2 + this.orientation*Math.PI; i+=(Math.PI*(1/8)) / this.quantity){
			cx = Math.cos(i) * (this.radius+this.center) + canvasCenter;
			cy = Math.sin(i) * (this.radius+this.center) + canvasCenter;
			ctx.moveTo(cx,cy);
			inc = this.radius / (this.loops*25);
			rad = inc;
			for(var u = i + this.rotation; u < (Math.PI*this.loops) + (i+this.rotation); u+=Math.PI/25){
				x = (Math.cos(u) * rad) + cx;
				y = (Math.sin(u) * rad) + cy;
				ctx.lineTo(x,y);
				rad+=inc;
			}
		}
		ctx.stroke();
		ctx.closePath();
	}
	
	this.repr = function(){
		keys = Object.keys(this).splice(0, Object.keys(this).length-2);
		keysStr = ''
		valStr = '';
		for(var i = 0; i < keys.length; i++){
			keysStr += keys[i] + ',';
			valStr += this[keys[i]] + ',';
		}
		str = keysStr + ';' + valStr;
		return str;
	}
	
}

//_______________________________________________________________________
//_______________________________________________________________________
function PreMadePetalsPattern(){
	// Object
	this.tp = 'preMadePetalsPattern';
	this.center = 50;
	this.radius = 30;
	this.height = 45;
	this.quantity = 0.5;
	this.orientation = 0;
	this.rotation = 0;
	this.lineWidth = 1;
	this.lineColor = mainColor;
	this.completeness = 0.25;
	// Activator
	this.specularCopy = 0;
	// Two arc with a triangle on top
	//___________________________
	// Main Display
	//_______________________
	this.display = function(){
		var cmplt = this.completeness * Math.PI;
		var itselfRotation = this.rotation * Math.PI;
		for(var i = this.orientation*Math.PI; i < Math.PI*2 + this.orientation*Math.PI; i+=(Math.PI*(1/8)) / this.quantity){
			ctx.beginPath();
			ctx.lineWidth = this.lineWidth;
			ctx.strokeStyle = this.lineColor;
			
			var u = i + itselfRotation;
			// Circle center
			var x = Math.cos(i) * this.center + canvasCenter;
			var y = Math.sin(i) * this.center + canvasCenter;
			// Highest point
			var x2 = Math.cos(u) * (this.height) + x;
			var y2 = Math.sin(u) * (this.height) + y;
			
			ctx.arc(x, y, this.radius, 1.5*Math.PI-cmplt+u, 1.5*Math.PI+cmplt+u);
			ctx.lineTo(x2,y2);

			var posX = Math.cos(Math.PI*0.5-cmplt+u) * this.radius + x;
			var posY = Math.sin(Math.PI*0.5-cmplt+u) * this.radius + y;
			ctx.moveTo(posX,posY);
			ctx.arc(x, y, this.radius, Math.PI*0.5-cmplt+u, Math.PI*0.5+cmplt+u);
			ctx.moveTo(posX,posY);
			ctx.lineTo(x2,y2);			
			ctx.stroke();
			ctx.closePath();
			//__________
			// Spaecular Copy
			//________
			if(this.specularCopy){
				ctx.beginPath();
				ctx.lineWidth = this.lineWidth;
				ctx.strokeStyle = this.lineColor;
				
				var ii = i - this.orientation*Math.PI*2;
				var uu = -itselfRotation + ii;
				
				var x = Math.cos(ii) * this.center + canvasCenter;
				var y = Math.sin(ii) * this.center + canvasCenter;
			
				var x2 = Math.cos(uu) * (this.height) + x;
				var y2 = Math.sin(uu) * (this.height) + y;
				
				ctx.arc(x, y, this.radius, 1.5*Math.PI-cmplt+uu, 1.5*Math.PI+cmplt+uu);
				ctx.lineTo(x2,y2);

				var posX = Math.cos(Math.PI*0.5-cmplt+uu) * this.radius + x;
				var posY = Math.sin(Math.PI*0.5-cmplt+uu) * this.radius + y;
				ctx.moveTo(posX,posY);
				ctx.arc(x, y, this.radius, Math.PI*0.5-cmplt+uu, Math.PI*0.5+cmplt+uu);
				ctx.moveTo(posX,posY);
				ctx.lineTo(x2,y2);			
				ctx.stroke();
				ctx.closePath();
			}
		}
	}
	
	
	this.repr = function(){
		keys = Object.keys(this).splice(0, Object.keys(this).length-2);
		keysStr = ''
		valStr = '';
		for(var i = 0; i < keys.length; i++){
			keysStr += keys[i] + ',';
			valStr += this[keys[i]] + ',';
		}
		str = keysStr + ';' + valStr;
		return str;
	}
}

//_______________________________________________________________________
//_______________________________________________________________________
function PreMadePetalsPattern2(){
	//________________
	// - Object 
	this.tp = 'preMadePetalsPattern2';
	this.center = 50;
	this.width = 15;
	this.height = 15;
	this.quantity = 0.5;
	this.orientation = 0;
	this.rotation = 0;
	this.completeness = 0.5;
	this.lineColor = mainColor;
	this.lineWidth = 1;
	//_____________________
	// - Decoration toggle
	this.specularCopy = 0; // - 0/1 Activate specularCopy in this.display [no function]
	this.circlesOnTheSides = 0; // - 0/1 Activate this.displayCisrclesOnTheSides() in this.display
	this.topCircle = 0; // 0/1 Activate this.displayTopCircle() in this.display()
	//________________________
	// - Decoration
	this.circlesGap = 0.06; // - Gap angle from one another
	this.circlesRadius = 3; 
	this.circlesDistance = 2; // - Distance from the side
	this.topCircleDistance = 2; // - [TopCircle] Distance from the side
	this.start = 0; // - Start position
	this.stop = 2; // - End position
	this.topCircleRadius = 3;
	this.fillCircles = 0; // 0/1 Fills circles
	this.fillTopCircle = 0; // 0/1 Fills top circle
	this.circlesColor = mainColor;
	this.topCircleColor = mainColor;
	this.circlesLineWidth = 1;
	this.topCircleLineWidth = 1;
	//___________________________
	// - Decorative functions
	//_________________________
	this.displayTopCircle = function(xC,yC,u){
		// Down 180° from the top
		var xSpace = Math.cos(Math.PI+u) * this.topCircleDistance;
		var ySpace = Math.sin(Math.PI+u) * this.topCircleDistance;
		ctx.strokeStyle = this.topCircleColor;
		ctx.lineWidth = this.topCircleLineWidth
		ctx.fillStyle = this.topCircleColor;
		ctx.beginPath();
		ctx.arc(xC+xSpace,yC+ySpace,this.topCircleRadius,0,Math.PI*2);
		if(this.fillTopCircle){
			ctx.fill();
		}
		else{
			ctx.stroke();
		}
		ctx.closePath();
	}
	//___________________________________________________________________
	//___________________________________________________________________
	this.displayCirclesOnTheSides = function(radius,xR,yR,xL,yL,u, angle){
		var gap = this.circlesGap * Math.PI;
		var cmplt = this.completeness * 2*Math.PI;
		var circ = cmplt - angle - gap*this.start; // - Loop end
		ctx.strokeStyle = this.circlesColor;
		ctx.lineWidth = this.circlesLineWidth
		ctx.fillStyle = this.circlesColor;
		for(var i = gap*this.stop; i < circ; i+=gap){
			ctx.beginPath();
			// - Left circles center
			var xC = xL + Math.cos(u-i-angle) * (radius-this.circlesDistance);
			var yC = yL + Math.sin(u-i-angle) * (radius-this.circlesDistance);
			ctx.arc(xC,yC,this.circlesRadius,0,Math.PI*2)
			if(this.fillCircles){
				ctx.fill();
			}
			else{
				ctx.stroke();
			}
			ctx.closePath();
			
			ctx.beginPath();
			// - Right circles center
			var xC = xR - Math.cos(Math.PI+angle+u+i) * (radius-this.circlesDistance);
			var yC = yR - Math.sin(Math.PI+angle+u+i) * (radius-this.circlesDistance);
			ctx.arc(xC,yC,this.circlesRadius,0,Math.PI*2)
			if(this.fillCircles){
				ctx.fill();
			}
			else{
				ctx.stroke();
			}
			ctx.closePath();
		}
	}
	//__________________________
	// - Main Display 
	//_________________________
	// Two incident arches
	this.display = function(){
		// Hypotenuse
		var radius = (this.width**2 + this.height**2) ** 0.5;
		
		var yD = (Math.sin(0.5*Math.PI) * this.width) - (Math.sin(0.5*Math.PI) * radius);	
		var yE = (Math.sin(0.5*Math.PI) * -this.width) + (Math.sin(0.5*Math.PI) * radius);
		// Gratest distance between the arches
		centerRadius = (yE-yD) / 2;
		
		var angle = Math.asin(this.width / radius); // arc start angle
		var cmplt = this.completeness * 2*Math.PI; // arc end angle
		var itselfRotation = this.rotation * Math.PI;
		
		ctx.strokeStyle = this.lineColor;
		ctx.lineWidth = this.lineWidth;
		for(var i = this.orientation*Math.PI; i < Math.PI*2 + this.orientation*Math.PI; i+=(Math.PI*(1/8)) / this.quantity){
			ctx.strokeStyle = this.lineColor;
			ctx.lineWidth = this.lineWidth;
			ctx.beginPath();
			var u = itselfRotation + i;
			// - Top point
			var xC = Math.cos(i) * this.center + canvasCenter;
			var yC = Math.sin(i) * this.center + canvasCenter;
			
			// - Bottom Point (180° down)
			var xQ = xC + (Math.cos(Math.PI+u) * this.height);
			var yQ = yC + (Math.sin(Math.PI+u) * this.height);
			
			// - Right point center of left arch (90° Right)
			var xR = xQ + Math.cos(0.5*Math.PI+u) * this.width;
			var yR = yQ + Math.sin(0.5*Math.PI+u) * this.width;
			
			// - Left point center of right arch (90° Left)
			var xL = xQ - Math.cos(0.5*Math.PI+u) * this.width;
			var yL = yQ - Math.sin(0.5*Math.PI+u) * this.width;
			ctx.arc(xL,yL, radius, u+angle, u+cmplt);
			
			// - Left arch bottom endline point
			var xR2 = xR + Math.cos(u-cmplt)*radius;
			var yR2 = yR + Math.sin(u-cmplt)*radius;
			ctx.moveTo(xR2,yR2);
			ctx.arc(xR,yR, radius, u-cmplt, u-angle);
			ctx.stroke();
			ctx.closePath();
			// - (xC;yC) (xQ;yQ) (xR;yR) is a right triangle
		/*	//_________________________________________________
			// Points of gratest distance between the arces
			//_________________________________________________
			// Left 
			var xD = xR - Math.cos(0.5*Math.PI+u) * radius;
			var yD = yR - Math.sin(0.5*Math.PI+u) * radius;
			// Right
			var xE = xL + Math.cos(0.5*Math.PI+u) * radius;
			var yE = yL + Math.sin(0.5*Math.PI+u) * radius;			
			
			ctx.moveTo(xE,yE);
			ctx.lineTo(xD,yD);
			*/
			//____
			// - Circles On The Sides
			//____
			if(this.circlesOnTheSides && this.circlesGap > 0){
				this.displayCirclesOnTheSides(radius,xL,yL,xR,yR,u,angle);
			} 
			//_____
			// - Top Circle
			//_____
			if(this.topCircle){
				this.displayTopCircle(xC,yC,u);
			}
			//___________________________________________________
			// - SPECULAR COPY
			//__________________________________________________
			if(this.specularCopy){
				ctx.strokeStyle = this.lineColor;
				ctx.lineWidth = this.lineWidth;
				ctx.beginPath();
				var ii = i - this.orientation*Math.PI*2;
				var uu = -itselfRotation + ii;
				
				var xC = Math.cos(ii) * this.center + canvasCenter;
				var yC = Math.sin(ii) * this.center + canvasCenter;
				
				var xQ = xC + (Math.cos(Math.PI+uu) * this.height);
				var yQ = yC + (Math.sin(Math.PI+uu) * this.height);
				
				var xR = xQ + Math.cos(0.5*Math.PI+uu) * this.width;
				var yR = yQ + Math.sin(0.5*Math.PI+uu) * this.width;

				var xL = xQ - Math.cos(0.5*Math.PI+uu) * this.width;
				var yL = yQ - Math.sin(0.5*Math.PI+uu) * this.width;
				
				ctx.arc(xL,yL, radius, uu+angle, uu+cmplt);
				
				var xR2 = xR + Math.cos(uu-cmplt)*radius;
				var yR2 = yR + Math.sin(uu-cmplt)*radius;
				ctx.moveTo(xR2,yR2);
				ctx.arc(xR,yR, radius, uu-cmplt, uu-angle);
				ctx.stroke();
				ctx.closePath();
				//______
				//______
				//______
				if(this.circlesOnTheSides && this.circlesGap > 0){
					this.displayCirclesOnTheSides(radius,xL,yL,xR,yR,uu,angle);
				}
				//______
				//______
				//______
				if(this.topCircle){
					this.displayTopCircle(xC,yC,uu);
				}				
			}	
		}
	}
	
	this.repr = function(){
		keys = Object.keys(this).splice(0, Object.keys(this).length-4);
		keysStr = ''
		valStr = '';
		for(var i = 0; i < keys.length; i++){
			keysStr += keys[i] + ',';
			valStr += this[keys[i]] + ',';
		}
		str = keysStr + ';' + valStr;
		return str;
	}
}

//_______________________________________________________________________
//_______________________________________________________________________
function PreMadePetalsPattern3(){
	this.tp = 'preMadePetalsPattern3';
	// Object
	this.radius = 5;
	this.center = 30;
	this.height = 30;
	this.completeness = 0.5;
	this.orientation = 0;
	this.quantity = 0.5;
	this.rotation = 0;
	this.lineWidth = 1;
	this.lineColor = mainColor;
	// Activators
	this.specularCopy = 0;
	// An arch with a triangle
	//______________________________
	// Main display
	//_______________________________
	this.display = function(){
		var itselfRotation = this.rotation * Math.PI;
		for(var i = this.orientation*Math.PI; i < Math.PI * 2 + this.orientation*Math.PI; i+=(Math.PI *(1/8))/this.quantity){
			ctx.beginPath();
			ctx.lineWidth = this.lineWidth;
			ctx.strokeStyle = this.lineColor;
			var u = i + itselfRotation;
			// Circle center
			var xC = Math.cos(i) * (this.height+this.center) + canvasCenter;
			var yC = Math.sin(i) * (this.height+this.center) + canvasCenter;
			
			// Triangle point
			var Ax = xC - Math.cos(u) * this.height;
			var Ay = yC - Math.sin(u) * this.height;
			ctx.moveTo(Ax,Ay)
			
			ctx.arc(xC,yC, this.radius, u-(Math.PI*this.completeness), u + (Math.PI*this.completeness));
			
			var Bx = xC - Math.cos(u + (Math.PI*this.completeness)) * this.radius;
			var By = yC - Math.sin(u + (Math.PI*this.completeness)) * this.radius;
			ctx.lineTo(Ax,Ay);
			ctx.stroke();
			//___________________
			// Specularcopy
			//___________________
			if(this.specularCopy){
				ctx.beginPath();
				ctx.lineWidth = this.lineWidth;
				ctx.strokeStyle = this.lineColor;
				var ii = i - this.orientation*Math.PI*2;
				var uu = -itselfRotation + ii;
				
				var xC = Math.cos(ii) * (this.height+this.center) + canvasCenter;
				var yC = Math.sin(ii) * (this.height+this.center) + canvasCenter;
				
				var Ax = xC - Math.cos(uu) * this.height;
				var Ay = yC - Math.sin(uu) * this.height;
				ctx.moveTo(Ax,Ay)
				
				ctx.arc(xC,yC, this.radius, uu-(Math.PI*this.completeness), uu + (Math.PI*this.completeness));
				
				var Bx = xC - Math.cos(uu + (Math.PI*this.completeness)) * this.radius;
				var By = yC - Math.sin(uu + (Math.PI*this.completeness)) * this.radius;
				ctx.lineTo(Ax,Ay);
				ctx.stroke();
			}
		}		
	}
		
	
	this.repr = function(){
		keys = Object.keys(this).splice(0, Object.keys(this).length-2);
		keysStr = ''
		valStr = '';
		for(var i = 0; i < keys.length; i++){
			keysStr += keys[i] + ',';
			valStr += this[keys[i]] + ',';
		}
		str = keysStr + ';' + valStr;
		return str;
	}
}

//________________________________________________________________________________________________________________//

//____________________________//
// - Adders EnventListeners - //
//____________________________//
function addRing(){
	circle = new Ring();
	objs.push(circle);
	obj = document.createElement('p');
	obj.innerHTML = 'Ring id=' + (objs.length-1);
	obj.setAttribute('id', objs.length-1);
	obj.setAttribute('class', 0);
	obj.addEventListener('click', selectObject);
	objectList.appendChild(obj);
	draw()
}


function addRingPattern(){
	circlePattern = new RingPattern();
	objs.push(circlePattern);
	obj = document.createElement('p');
	obj.innerHTML = 'Ring Pattern id=' + (objs.length-1);
	obj.setAttribute('id', objs.length-1);
	obj.setAttribute('class', 'off');	
	obj.addEventListener('click', selectObject);
	objectList.appendChild(obj);
	draw();
}


function addPetalsPattern(){
	petalsPattern = new PetalsPattern();
	objs.push(petalsPattern);
	obj = document.createElement('p');
	obj.innerHTML = 'Petals Pattern id=' + (objs.length-1);
	obj.setAttribute('id', objs.length-1);
	obj.setAttribute('class', 'off');	
	obj.addEventListener('click', selectObject);
	objectList.appendChild(obj);
	draw();
}


function addLinesPattern(){
	linesPattern = new LinesPattern();
	objs.push(linesPattern);
	obj = document.createElement('p');
	obj.innerHTML = 'Lines Pattern id=' + (objs.length-1);
	obj.setAttribute('id', objs.length-1);
	obj.setAttribute('class', 'off');	
	obj.addEventListener('click', selectObject);
	objectList.appendChild(obj);
	draw();
}


function addTrianglesPattern(){
	trianglesPattern = new TrianglesPattern();
	objs.push(trianglesPattern);
	obj = document.createElement('p');
	obj.innerHTML = 'Triangles Pattern id=' + (objs.length-1);
	obj.setAttribute('id', objs.length-1);
	obj.setAttribute('class', 'off');	
	obj.addEventListener('click', selectObject);
	objectList.appendChild(obj);
	draw();
}



function addSpyralsPattern(){
	spyralsPattern = new SpyralsPattern();
	objs.push(spyralsPattern);
	obj = document.createElement('p');
	obj.innerHTML = 'Spyrals Pattern id=' + (objs.length-1);
	obj.setAttribute('id', objs.length-1);
	obj.setAttribute('class', 'off');	
	obj.addEventListener('click', selectObject);
	objectList.appendChild(obj);
	draw();
}


function addPreMadePetalsPattern(){
	preMadePetals = new PreMadePetalsPattern();
	objs.push(preMadePetals);
	obj = document.createElement('p');
	obj.innerHTML = 'Premade petals pattern1 id=' + (objs.length-1);
	obj.setAttribute('id', objs.length-1);
	obj.setAttribute('class', 'off');	
	obj.addEventListener('click', selectObject);
	objectList.appendChild(obj);
	draw();
}


function addPreMadePetalsPattern2(){
	preMadePetalsPattern = new PreMadePetalsPattern2();
	objs.push(preMadePetalsPattern);
	obj = document.createElement('p');
	obj.innerHTML = 'Premade petals pattern 2 id=' + (objs.length-1);
	obj.setAttribute('id', objs.length-1);
	obj.setAttribute('class', 'off');	
	obj.addEventListener('click', selectObject);
	objectList.appendChild(obj);
	draw();
}


function addPreMadePetalsPattern3(){
	preMadePetalsPattern = new PreMadePetalsPattern3();
	objs.push(preMadePetalsPattern);
	obj = document.createElement('p');
	obj.innerHTML = 'Premade petals pattern 3 id=' + (objs.length-1);
	obj.setAttribute('id', objs.length-1);
	obj.setAttribute('class', 'off');	
	obj.addEventListener('click', selectObject);
	objectList.appendChild(obj);
	draw();
}

//________________________________________________________________________________________________________________//

//________________
// - Select
//________________
function selectObject(){
	// Deselect currently selected Object
	var current = document.getElementsByClassName('on');
	if(current.length){
		current[0].setAttribute('class', 'off');
	}
	
	// Select chosen object
	this.setAttribute('class', 'on');
	obj_id = this.getAttribute('id');
	// Change title
	var title = document.getElementById('title');
	title.innerHTML = 'Edit ' + objs[obj_id].tp
	// Displays menu if not on screen
	if(menu.style.display == 'none' || menu.style.display == ''){
		menu.style.display = 'block';
	}
	// Get object attributes and displays only needed inputs
	keys = Object.keys(objs[obj_id]).splice(0, Object.keys(objs[obj_id]).length-2);
	for(var i = 0; i < inputsDiv.length; i++){
		var key = inputsDiv[i].getAttribute('id')
		if(keys.includes(key)){
			inputsDiv[i].style.display = 'block';
			input = inputsDiv[i].getElementsByTagName('input')[0];
			// Set objects value to needed input
			input.value = objs[obj_id][key];
		}
		else{
			inputsDiv[i].style.display = 'none';
		}
	}	
}


//____________//
// - Edit -   //
//____________//
function editObject(){
	// Get selected object
	obj_on = document.getElementsByClassName('on');
	if(obj_on.length){
		obj_id = obj_on[0].getAttribute('id');
		// Get attribute name to modify
		key = this.parentNode.getAttribute('id');
		// Parse if numeric value
		if(this.type == 'number'){
			objs[obj_id][key] = parseFloat(this.value)
		}
		else{
			objs[obj_id][key] = this.value;
		}
		draw();
	}
}


//
//
//
function setBackground(src){
	img = new Image();
	img.src = src;
	img.onload = function(){
		background = img;
		draw();
	}
}


function draw(){
	ctx.clearRect(0,0,d,d);
	if(background){
		ctx.drawImage(background,0,0);
	}
	if(showLines){
		lines();
	}
	for(var i = 0; i < objs.length; i++){
		objs[i].display();
	}
}


draw();