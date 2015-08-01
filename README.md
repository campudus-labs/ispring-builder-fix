# iSpring Builder

After making a ppt to html5 conversion with iSpring extension for MS Powerpoint, you might see some flashing on the iPad due to loading CSS styles.

If you put all CSS styles into the presentation in the beginning, the flashing is gone as the browser does not need to load the stylesheets dynamically.

This script fixes the problem by adding the stylesheets in the resulting `index.html` file.

Usage:

After exporting ppt to html5, you get a folder structure like this:

```
your/export/folder/index.html
your/export/folder/data/player.js
your/export/folder/data/slide1.js
your/export/folder/data/slide2.js
your/export/folder/data/slide3.js
your/export/folder/data/slide1.css
your/export/folder/data/slide2.css
your/export/folder/data/slide3.css
```

You need to point the script to the `index.html` file like this and it will add the `slide*.js` and `slide*.css` files to the `index.html` itself.

Be aware: This will overwrite your `index.html` and change it directly!

```
node index.js path/to/your/index.html
```
