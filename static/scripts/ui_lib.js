docReady = function(fn) {
	if (document.readyState === "complete" || document.readyState === "interactive") {
		window.setTime(fn,1);
	} else {
		document.addEventListener("DOMContentLoaded", fn);
	}
}

getParentByClass = function(el, className) {
	let rent = el.parentElement,
	stop = 0;
	while(!rent.classList.contains(className)) {
		console.log(rent);
		rent = rent.parentElement;
		if ( stop == 1000 ) {
			return false;
		}
		stop ++;
	}
	return rent;
}

toggleClass = function(el,trgtClss) {
	if (el.classList.contains(trgtClss)){
		el.classList.remove(trgtClss);
	} else {
		el.classList.add(trgtClss);
	}
}

toggleShow = function(trgt) {
	console.log('toggle show');
	toggleClass(trgt,'show');
}

toggleHide = function(trgt) {
	console.log('toggle hide');
	toggleClass(trgt,'hide');
}

addAction = function(trgt, trggr, actnFn) {
	trgt.addEventListener(trggr, () => {actnFn()});
}

allAddActions = function(trgts, trggr, actnFn) {
	trgts.forEach(trgt => addAction(trgt,trggr,actnFn));
}

getAll = function(slctr) {
	const trgts = document.querySelectorAll(slctr);
	if ( trgts[0] !== undefined ) {
		return trgts;
	}
	return false;
}

getOne = function(slctr) {
	const trgt = document.querySelector(slctr);
	if ( trgt !== undefined ) {
		return trgt;
	}
	return false;
}

var replacement;

allowDrop = function(ev) {
  ev.preventDefault();
  ev.stopPropagation();
}

drag = function(ev) {
	swp = ev.target;
	ev.dataTransfer.effectAllowed = 'move';
	ev.dataTransfer.setData('text/html', swp.innerHTML);
}

swap = function(swpd, ev, target) { 
	if (swpd.classList.contains(target)) {
		swapPriority(swpd,swp);
		swp.innerHTML = swpd.innerHTML;
		swpd.innerHTML = ev.dataTransfer.getData('text/html');
	} else {
		swpd = getParentByClass(swpd, target);
		swapPriority(swpd,swp);
		swp.innerHTML = swpd.innerHTML;
		swpd.innerHTML = ev.dataTransfer.getData('text/html');
	}
}
updatePriority = function(priorityId, itemId) {
	console.log('priority.id = '+priorityId+'; item.id= '+itemId+';');
}
swapPriority = function(swpd,swp){
	const form = swpd.firstChild,
	itemId = form.id,
	priorityId = swpd.id,
	swporityId = swp.id,
	swpItemId = swp.firstChild.id;
	updatePriority(priorityId, swpItemId);
	updatePriority(swporityId, itemId);
}
drop = function(ev) {
  ev.preventDefault();
	let swpd = ev.target;
	console.log(swpd.innerHTML);
	if(swp !== swpd) {
		swap(swpd, ev, 'priority');
	}
}

docReady(function(){
	// toggle modal w/ btn
	const addBtn = getOne('button.add-item');

	action = function() {
		const modal = getOne('.add-item.modal');
		console.log(modal);
		if (modal) {
			toggleHide(modal);
		}
	}

	addAction(addBtn, 'click', action);

	const mdlClsBtns = getAll('.add-item.modal button');

	addAction(mdlClsBtns[0], 'click', action);

});
