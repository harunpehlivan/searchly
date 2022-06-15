var resultsDisplayed = [];

let searchbox = document.getElementById("sb");

// Execute a function when the user releases a key on the keyboard
searchbox.addEventListener("keyup", function(event) {
  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13) {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    document.getElementsByClassName("search")[0].click();
  }
});

var oReq = new XMLHttpRequest();
oReq.onload = reqListener;
oReq.open("get", "/sites.json", true);
oReq.send();

var s;

var p = [];

function reqListener(e)
{
  var sitesjson = JSON.parse(this.responseText);
  s = jta(sitesjson);
  console.log(s);
}

const jta = obj =>
{
   const keys = Object.keys(obj);
   const res = [];
   for(let i = 0; i < keys.length; i++)
   {
      res.push(obj[keys[i]]);
   };
   return res;
};

function search()
{
  let r = document.getElementById("results");
  let q = document.getElementById("sb").value;
  let k = q.split(" ");

  r.innerHTML = "";
  p = [];

  for (let i1=0; i1<s.length; i1++)
  {
    let matchedletters = 0;

    let ct = s[i1]["title"];

    ct = ct.replace("\\", "\\\\");
    s[i1]["url"] = s[i1]["url"].replace("\\", "\\\\");
    s[i1]["desc"] = s[i1]["desc"].replace("\\", "\\\\");

    for (let i2=0; i2<k.length; i2++)
    {
      if (ct.toLowerCase().includes(k[i2].toLowerCase()))
      {
        matchedletters+=k[i2].length;
      }
    }

    for (let i2=0; i2<k.length; i2++)
    {
      if (s[i1]["url"].toLowerCase().includes(k[i2].toLowerCase()))
      {
        matchedletters+=k[i2].length;
      }
    }

    for (let i2=0; i2<k.length; i2++)
    {
      if (s[i1]["desc"].toLowerCase().includes(k[i2].toLowerCase()))
      {
        matchedletters+=k[i2].length;
      }
    }

    if ((matchedletters / s[i1]["title"].length) * (1+(s[i1]["clicks"] / 2500))<0.2)
    {
      continue;
    }

    p[p.length] = s[i1];
    p[p.length-1]["id"] = i1;
    p[p.length-1]["sv"] = (matchedletters / p[p.length-1]["title"].length) * (1+(p[p.length-1]["clicks"] / 2500));
    //p[p.length-1]["sv"] = (matchedletters / p[p.length-1]["title"])
  }

  console.log(p);
  let ps = sort2dArray(p);

  if (q.includes("+") || q.includes("-") || q.includes("*") || q.includes("/") || q.includes("^") || q.includes("**"))
  {
    a = eval(q.replace("^", "**"));
    let e = document.createElement("h1");
    if (a != undefined)
    {
      
      e.innerText = q + " = " + a;
    }
    r.appendChild(e);
  }

  let wikires = searchWikipedia(q)
  console.log(wikires);

  for (let i=0; i<ps.length; i++)
  {
    displayResult(ps[i]["title"], ps[i]["url"], ps[i]["desc"], ps[i]["id"]);
  }


}

function swap(arr, firstIndex, secondIndex)
{
  var temp = arr[firstIndex];
  arr[firstIndex] = arr[secondIndex];
  arr[secondIndex] = temp;
}

async function searchWikipedia(q) {
  const endpoint = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=${q}`;
  const response = await fetch(endpoint);
  if (!response.ok) {
    throw Error(response.statusText);
  }
  const json = await response.json();
  return json;
}

function sort2dArray(arr)
{
  resultsDisplayed = [];
  for(var i = 0; i < arr.length; i++)
  {
     
    for(var j = 0; j < ( arr.length - i -1 ); j++)
    {
      if(arr[j]["sv"] < arr[j+1]["sv"])
      {
        var temp = arr[j]
        arr[j] = arr[j + 1]
        arr[j+1] = temp
      }
    }
  }
  return arr;
}

function displayResult(title, url, desc, id)
{
    if (resultsDisplayed.includes(id) )
    {
      return;
    }

    resultsDisplayed[resultsDisplayed.length] = (id);

    let r = document.getElementById("results");

    let e1 = document.createElement("div");
    e1.className = "resultdiv";
    r.appendChild(e1);

    let e2 = document.createElement("div");
    let e3 = document.createElement("a");
    e3.className = "resulttitle";
    e3.innerText = title;
    e3.href = "click.php?id=" + id;
    e1.appendChild(e2);
    e2.appendChild(e3);

    let e9 = document.createElement("a");
    e9.href = "report.php?id=" + id;
    e2.appendChild(e9);

    let e8 = document.createElement("img");
    e8.width = 24;
    e8.height = 24;
    e8.src = "reportflag.png";
    e9.appendChild(e8);

    let e4 = document.createElement("span");
    e4.className = "resulturl";
    e4.innerText = url;
    e4.href = "click.php?id=" + id;
    e4.oncontextmenu = function(){previewsite(url); return false;};
    e1.appendChild(e4);

    let e7 = document.createElement("br");
    e1.appendChild(e7);

    let e5 = document.createElement("div");
    e5.className = "resultdesc";
    e5.innerText = desc;
    e5.href = desc;
    e1.appendChild(e5);

    let e6 = document.createElement("br");
    e1.appendChild(e6);
}

function previewsite(url)
{
  if (url.includes("http:"))
  {
    url = "notsecurepreview.html";
  }
  document.getElementById("sitepreview").src = url;
  document.getElementById("sitepreview").style.visibility = "visible";
  console.log("Previewing site " + url);
}

function endsitepreview()
{
  document.getElementById("sitepreview").style.visibility = "hidden";
}