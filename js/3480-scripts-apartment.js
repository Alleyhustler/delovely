// onionring.js is made up of four files - onionring-widget.js (this one!), onionring-index.js, onionring-variables.js and onionring.css
// it's licensed under the cooperative non-violent license (CNPL) v4+ (https://thufie.lain.haus/NPL.html)
// it was originally made by joey + mord of allium (è’œ) house, last updated 2020-11-24

// === ONIONRING-WIDGET ===
//this file contains the code which builds the widget shown on each page in the ring. ctrl+f 'EDIT THIS' if you're looking to change the actual html of the widget

var tag = document.getElementById(ringID); //find the widget on the page

thisSite = 'https://delovely.neocities.org/'; //get the url of the site we're currently on
thisIndex = null;

// go through the site list to see if this site is on it and find its position
for (i = 0; i < sites.length; i++) {
  if (thisSite.startsWith(sites[i])) { //we use startswith so this will match any subdirectory, users can put the widget on multiple pages
    thisIndex = i;
    break; //when we've found the site, we don't need to search any more, so stop the loop
  }
}

function apartmentrandomSite() {
  otherSites = apartmentsites.slice(); //create a copy of the sites list
  otherSites.splice(thisIndex, 1); //remove the current site so we don't just land on it again
  randomIndex = Math.floor(Math.random() * otherSites.length);
  location.href = otherSites[randomIndex];
}

//if we didn't find the site in the list, the widget displays a warning instead
if (thisIndex == null) {
  tag.insertAdjacentHTML('afterbegin', `
<table>
  <tr>
    <td>This site isn't part of the ${ringName} webring yet. You should talk to the manager to have your room added to the apartment building!</td>
  </tr>
</table>
  `);
}
else {
  //find the 'next' and 'previous' sites in the ring. this code looks complex
  //because it's using a shorthand version of an if-else statement to make sure
  //the first and last sites in the ring join together correctly
  previousIndex = (thisIndex-1 < 0) ? sites.length-1 : thisIndex-1;
  nextIndex = (thisIndex+1 >= sites.length) ? 0 : thisIndex+1;

  indexText = ""
  //if you've chosen to include an index, this builds the link to that
  if (useIndex) {
    indexText = `<a href='${indexPage}'>Apply for a Room</a>`;
  }

  randomText = ""
  //if you've chosen to include a random button, this builds the link that does that
  if (useRandom) {
    randomText = `<a href='javascript:void(0)' onclick='apartmentrandomSite()'>Visit a Random Room</a>`;
  }

  //this is the code that displays the widget - EDIT THIS if you want to change the structure
  tag.insertAdjacentHTML('afterbegin', `
   <div id="apartment-webring">
     <img src="https://darkosparko.nekoweb.org/webrings%2Fapartments-webring%2Fwebring-images/apartment-webring-logo.png" alt="The Apartment Webring!" class="building-icon">
     <div class="apartment-navigation">
     <a href='${sites[previousIndex]}'><img alt="Previous Room" src="https://darkosparko.nekoweb.org/webrings%2Fapartments-webring%2Fwebring-images/apartment-previous-button.png" class="prev button"></a>
     <a href="https://darkosparko.nekoweb.org/webrings%2Fapartments-webring/apartment-webring-main.html?z=/webrings/apartments-webring/apartment-rooms/${ownernames[thisIndex]}-room.html"><img alt="The webmaster is lounging on her bed inside a cozy room, reading a book." src="${roomimages[thisIndex]}" class="room-picture"></a>
     <a href='${sites[nextIndex]}'><img src="https://darkosparko.nekoweb.org/webrings%2Fapartments-webring%2Fwebring-images/apartment-next-button.png" class="next button" alt="Next Room"></a>
     </div>
     <div class="linkboxtitle">Accepting tenants! No rent required! Call us for inquiries!</div>
     <div class="linkbox">
     <div><a href='javascript:void(0)' onclick='apartmentrandomSite()'>Random Visit!</a></div>
     <div><a href='${indexPage}'>Apply For A Room!</a></div>
     <div><a href="https://garlic.garden/onionring/">What Is This?</a></div>
     </div>
     </div>
  `);

}