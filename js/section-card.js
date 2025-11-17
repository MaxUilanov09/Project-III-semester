if (window.location.hash == '')
{
  window.location.hash = '#page2';
}



var scrollReady = true;
function changeHash(move)
{
  var curPage = getPage();
  maybePage = curPage+move;
  if (maybePage > 0 && maybePage < 4 && scrollReady)
  {
    window.location.hash = '#page'+maybePage;
    scrollReady = false;
    setTimeout(function(){scrollReady = true;}, 300);
  }
}

function getPage()
{
  return parseInt(window.location.hash.charAt(5));
}

function handlePageClick(event, id)
{
  id = id.split(' ')[1];
  thisPage = parseInt(id.charAt(1));
  if (thisPage != getPage())
  {
    event.preventDefault();
    window.location.hash = '#page'+thisPage
  }
}