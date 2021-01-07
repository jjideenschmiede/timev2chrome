#Google Chrome Extension
To give you the best experience with our app, we have programmed a Google Chrome extension. This accesses your app installation via the **domainkey** and the **token**.

Currently only times can be added via the applications. Other functions are currently not planned.

##manifest.json
Here, as with any extension, the permissions and metadata are stored.

##popup.html
In the popup HTML only a form is stored and the possibility to make the settings.

##main.js
In the JavaScript file the brain of this extension is hidden. Everything is controlled here.

The keys are read or stored here via the Google Chrome Storage. The customers and projects are loaded directly via two functions. And via the token our backend recognizes which user it is.

The complete communication with our backend runs over this file.

##style.sass / main.min.css
Actually only serves to beautify the HTML file.