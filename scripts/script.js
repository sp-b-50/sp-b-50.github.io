let selected = null

function dragOver(e) {
  if (isBefore(selected, e.target)) {
    e.target.parentNode.insertBefore(selected, e.target)
  } else {
    e.target.parentNode.insertBefore(selected, e.target.nextSibling)
  }
}

function dragEnd() {
  selected = null
}

function dragStart(e) {
  e.dataTransfer.effectAllowed = 'move'
  e.dataTransfer.setData('text/plain', null)
  var img = new Image();
  img.src = "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAANSURBVBhXY2BgYGAAAAAFAAGKM+MAAAAAAElFTkSuQmCC";
  e.dataTransfer.setDragImage(img,1,1)
  selected = e.target
}

function isBefore(el1, el2) {
  let cur
  if (el2.parentNode === el1.parentNode) {
    for (cur = el1.previousSibling; cur; cur = cur.previousSibling) {
      if (cur === el2) return true
    }
  }
  return false;
}

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min) ) + min;
}

let generated = false;
let genArray = [];
let timeGenned = null;

function generateClicked() {
  var genButton = document.getElementById("generate-button");
  var list = document.getElementById("order-list");
  if (!generated)
  {
    var charset = document.getElementById("input-character-set").value;
    var numChars = document.getElementById("input-num-chars").value;
    var numResults = document.getElementById("input-num-results").value;
    var numCharRestriction = document.getElementById("input-char-restriction").value;

    var firstCharset = "";
    if (numCharRestriction < 1) firstCharset = charset;
    else
    {
      for (var i=0;i<numCharRestriction;i++)
      {
        firstCharset += charset[getRndInteger(0,charset.length)];
      }
    }

    genArray = [];
    for (var i=0;i<numResults;i++)
    {
      var randGen = firstCharset[getRndInteger(0,firstCharset.length)];
      for (var j=1;j<numChars;j++)
      {
        randGen+=charset[getRndInteger(0,charset.length)];
      }
      genArray.push(randGen);
    }
    console.log(genArray);

    while (list.firstChild) list.removeChild(list.lastChild);
    for (var i=0;i<genArray.length;i++)
    {
      var li = document.createElement("li");
      li.className = "notification";
      li.setAttribute("draggable", "true");
      li.setAttribute("ondragover", "dragOver(event)");
      li.setAttribute("ondragstart", "dragStart(event)");
      li.textContent = genArray[i];
      list.appendChild(li);
    }

    genArray.sort();

    genButton.className = "button is-primary is-outlined";
    genButton.textContent = "Check";

    timeGenned = Date.now();
    document.getElementById("time-label").textContent = "";
  }
  else
  {
    for (var i=0;i<genArray.length;i++)
    {
      var li = list.childNodes[i];
      if (li.textContent == genArray[i]) li.className = "notification is-success";
      else li.className = "notification is-danger";
      li.removeAttribute("draggable");
      li.removeAttribute("ondragover");
      li.removeAttribute("ondragstart");
    }

    genButton.className = "button is-primary";
    genButton.textContent = "Generate";

    var delta = Date.now() - timeGenned;
    document.getElementById("time-label").textContent = (delta/1000)+" seconds";
  }
  generated = !generated;
}