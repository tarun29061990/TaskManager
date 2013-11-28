
//handle task related operations in a list
var HandleTaskOperations = function(e){
	var e = e;
	var dragTarget;

	this.write = function(){
		var addTaskTemplate = document.getElementsByClassName("taskTemp")[0];
		addTaskTemplate = addTaskTemplate.cloneNode(true);
		var taskBlock = e.target.parentNode;
		addTaskTemplate.style.display = "block";
		addTaskTemplate.children[0].value = "";
		addTaskTemplate.focus();
		taskBlock.appendChild(addTaskTemplate);
	},

	this.add = function(){
		var parent = e.target.parentNode;
		var superParent  = e.target.parentNode.parentNode;
		var textareaval = e.target.parentNode.children[0].value;
		
		var task = document.getElementsByClassName("task")[0];
		task = task.cloneNode(true);
		task.setAttribute("class","taskNew");
		var para = task.children;
		para = para[0];
		para.textContent = textareaval;
	
		task.style.display = "block";
		

		parent.remove();
		superParent.appendChild(task);
	},

	this.edit = function(){
		var editTemp = document.getElementsByClassName("editTemp")[0];
		editTemp = editTemp.cloneNode(true);

		var parent = e.target.parentNode;
		
		editTemp.style.display = "block";
		parent.appendChild(editTemp);
		
	},

	this.modify = function(){
		var superParent = e.target.parentNode.parentNode;
		var parent = e.target.parentNode;
		var value = e.target.parentNode.children[0].value;
		var para = superParent.children[0];
		para.textContent = value;
		parent.remove();
	},

	this.remove = function(){
		var parent = e.target.parentNode;
		parent.remove();
	}
}


var writeTaskTemp = function(e){
	var writetaskObj = new HandleTaskOperations(e);
	writetaskObj.write();
}

var addTask = function(e){
	var addTaskobj = new HandleTaskOperations(e);
	addTaskobj.add();
}

var editTask = function(e){
	var editTaskObj = new HandleTaskOperations(e);
	editTaskObj.edit();
}

var removeTask = function(e){
	var removeTaskObj = new HandleTaskOperations(e);
	removeTaskObj.remove();
}

var modifyTask= function(e){
	var modifyTaskObj = new HandleTaskOperations(e);
	modifyTaskObj.modify();
}

//
//handle list realted events 
var HandleListOperations = function(e){
	var e =e;

	this.addList = function(){
		var listName = e.target.parentNode.children[1].value;

		var listTemp = document.getElementsByClassName("taskBlock")[0];
		listTemp = listTemp.cloneNode(true);

		
		listTemp.setAttribute("class","FL taskBlockNew");
		var name = listTemp.lastElementChild;
		name.textContent = listName;
		listTemp.style.display = "block";
		var parent = document.getElementById("tasksBlock");
		parent.appendChild(listTemp);
		e.target.parentNode.children[0].value = "";
	}
}

var addList = function(e){
	var addListObj = new HandleListOperations(e);
	addListObj.addList();
}
//

// handle drag and drop events
var dragAndDropOperation = function(e){

	var ev = e;

	this.drag = function(){
		ev.dataTransfer.effectAllowed='move';
		dragTarget = ev;
		ev.dataTransfer.setData("text/html", ev.target.innerHTML); 
		ev.dataTransfer.setDragImage(ev.target,120,0);
		return true;
	},

	this.dragEnter = function(){
		event.preventDefault();
		
   		return true;
	},

	this.dragOver = function(){
		event.preventDefault();
     	return true;
	},

	this.dragDrop = function(){
		var data = ev.dataTransfer.getData("text/html");
	   	var div = document.createElement("div");
	   	div.innerHTML = data;
	   	div.setAttribute("class","taskNew");
	   	div.setAttribute("draggable","true");
	   	div.setAttribute("ondragstart","return dragStart(event);")
	   	ev.target.appendChild(div);

	   	dragTarget.target.style.display = "none";
	   	ev.stopPropagation();
	   	return true;
	}
}

var dragStart = function(e){
	var dragObj = new dragAndDropOperation(e)
	dragObj.drag();
}

var dragEnter = function(e){
	var dragEnterObj = new dragAndDropOperation(e);
	dragEnterObj.dragEnter();
}

var dragOver = function(e){
	var dragOverObj = new dragAndDropOperation(e);
	dragOverObj.dragOver();
}

var dragDrop = function(e){
	var dragDropObj = new dragAndDropOperation(e);
	dragDropObj.dragDrop();
}
//