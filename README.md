# UEditor-tabfocus
Tab Focus plugin,  adds the possibility to tab in/out of UEditor.

---
The Tab Focus plugin allows you to choose where your cursor will go when pressing the TAB key while editing your document. You can tab and shift+tab to and from the editor.

Configuration:

    var ue = UE.getEditor(youreditorholder,{
		...
        tab_focus : ':prev,:next' // default
		...
    });



**notice**: keep the ueditor tab key behavior.

---
Inspired by `tinymce` tabfocus plugin, depend on jQuery Selector
<br>

MIT license