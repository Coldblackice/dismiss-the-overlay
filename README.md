### [<sub>⬇</sub> Dismiss The Overlay](https://github.com/JustOff/dismiss-the-overlay/releases)

**What's it all about?**

Some websites will use an overlay to mask its content with a transparent background to force you to read a message before you can see the actual content.

This is very annoying as every site will have a different way to close that overlay popup.

This extension solves this problem by offering **one button to close any overlay** on any website you may ever encounter.

**Does it work everywhere ?**

The extension should work on most sites that have overlays. Here is a list of some of the websites that the extension is know to work: [WORKS_ON.md](WORKS_ON.md).

**Features**

* Requires no special permissions.
* Extremely lightweight, relies on little known ``document.elementFromPoint`` browser's function to find elements that are in front with the highest z-index.
* Non-intrusive. The extension activates only when you click its button, thereby it has no impact on navigation performance when you don't use the extension. Doesn't inject tons of CSS rules as AdBlock extension is doing for example.
* Supports hiding of multiple DOM overlay elements.
* Enables overflow auto of the body when overlay script hides it to disable the scroll of the page.

**Licence**
Licensed under the [MIT License](http://www.opensource.org/licenses/mit-license.php).
