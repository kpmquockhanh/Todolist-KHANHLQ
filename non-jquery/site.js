
function checkView () {
	return document.getElementById('f_all').classList.contains('active')?1:document.getElementById('f_active').classList.contains('active')?2:3;
}

function f_all () {
	let li = document.getElementById('list').children;
	for (var i = 0; i < li.length; i++) {
		li[i].style.display = 'block';
	}
}
function f_active () {
	let li = document.getElementById('list').children;
	for (var i = 0; i < li.length; i++) {
		!li[i].classList.contains('checked')?li[i].style.display = 'block':li[i].style.display = 'none';
	}
}
function f_completed () {
	let li = document.getElementById('list').children;
	for (var i = 0; i < li.length; i++) {
		li[i].classList.contains('checked')?li[i].style.display = 'block':li[i].style.display = 'none';
	}
}
function resetActive () {
	document.getElementById('f_all').classList.remove('active');
	document.getElementById('f_active').classList.remove('active');
	document.getElementById('f_completed').classList.remove('active');
}

Reload = function() {
	let Li=document.getElementById('list').getElementsByTagName('li');
	let completed=0;
	for (var i = 0; i < Li.length; i++) {
		Li[i].classList.contains('checked')?completed++:'';
	}

	document.getElementById('count').innerHTML=Li.length-completed;
};

//Delete li
Element.prototype.remove = function() {
	if (this.parentElement!=null)
		this.parentElement.removeChild(this);
}

addRemove = function() {
	let removeitems= document.getElementsByClassName('remove');
	for (var i = removeitems.length - 1; i >= 0; i--) {
	// console.log(removeitems[i]);	
	removeitems[i].addEventListener("click", function () {
		this.parentElement.remove();
		Reload();
	});	
}
};
document.oncontextmenu = function() {return false;};
Reload();
document.getElementById("todotext").focus();
addRemove();
// Add item

document.getElementById('todotext').addEventListener('keypress', function (key) {
// catch event press Enter
if (key.key==='Enter' && this.value!='') {
	let li = document.createElement("li");
	let text = document.createElement("div");
	text.appendChild(document.createTextNode(document.getElementById('todotext').value));
	text.setAttribute('class', 'text');
	let remove = document.createElement("div");
	remove.appendChild(document.createTextNode('x'));
	remove.setAttribute('class', 'remove');
	let clear = document.createElement("div");
	clear.setAttribute('class', 'clear');
	li.appendChild(text);
	li.appendChild(remove);
	li.appendChild(clear);
	li.addEventListener('click', function () {
		this.classList.toggle('checked');
		Reload();
	})
	document.getElementById('list').prepend(li);
	// clear to do text
	document.getElementById('todotext').value='';

	// update things
	Reload();

	//add listener for new li 
	addRemove();

	// add event Completed
	// addCompleted();
	// 
	// add Edit
	addEdit();
	checkView()==3?f_completed():'';
}
// document.getElementById('list').getElementsByTagName('li')[0].remove();
// 
// remove Items
});
	// completed item
// console.log(document.getElementById('list').children);

let li = document.getElementById('list').children;
for (var i = 0; i < li.length; i++) {
		// console.log(li[i]);
		li[i].addEventListener('click', function () {
			this.classList.toggle('checked');
			Reload();
			checkView()==3?f_completed():'';
			})
	}

// for (var i = 0; i < li.length; i++) {
// 	li[i].addEventListener('dblclick', function () {
// 		console.log('ok');
// 	})
// }

// get all
document.getElementById('getall').addEventListener('click', function () {
	let li = document.getElementById('list').children;
	let count=0;
	for (var i = 0; i < li.length; i++) {
		if (li[i].classList.contains('checked')) {
			count++;
		}
	}
	if (count==li.length) {
		for (var i = 0; i < li.length; i++) {
			li[i].classList.remove('checked');
			Reload();
			checkView()==3?f_completed():'';
		}
	}
	else
		for (var i = 0; i < li.length; i++) {
			li[i].classList.add('checked');
			Reload();
			checkView()==3?f_completed():'';
		}
	})
function checked () {
	let li = document.getElementById('list').children;
	for (var j = 0; j < li.length; j++) {
		console.log('i='+j);
		return li[j].classList.contains('checked')?j:-1;
	}
}
//Clear complete
document.getElementById('deleteall').addEventListener('click',function () {
	
let li = document.getElementById('list').children;
let len = li.length;
	for (let i = 0; i < len; i++) {
		// console.log(li[i]);
		// console.log(i);
		li[checked()].remove();
	}

})
function addEdit () {
	let text = document.getElementsByClassName('text');
	for (var i = 0; i < text.length; i++) {
		text[i].oncontextmenu = function(e) {
  			e.path[0].outerHTML='<input style="width:90%" type="text" class="edittext" value="'+e.path[0].innerHTML+'">';
  			// console.log(e.path[0].outerHTML)
  				let edittext = document.getElementsByClassName('edittext');
  				edittext[0].focus();
				edittext[0].addEventListener('keypress', function (e) {
					if (e.key=="Enter") {
						this.outerHTML='<div class="text">'+this.value+'</div>';
						addEdit();
				}
			})
		}
		
	}
}
addEdit();
document.getElementById('f_all').addEventListener('click', function (ele) {
	resetActive();
	ele.srcElement.classList.add('active');
	f_all();
	checkView()
});
document.getElementById('f_active').addEventListener('click', function (ele) {
	resetActive();
	ele.srcElement.classList.add('active');
	f_active();
	checkView()
});
document.getElementById('f_completed').addEventListener('click', function (ele) {
	resetActive();
	ele.srcElement.classList.add('active');
	f_completed();
	checkView()
});










