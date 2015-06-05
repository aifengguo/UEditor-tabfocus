//  Inspired by tinymce tabfocus plugin
//  git@github.com:icai/UEditor-tabfocus.git
//  depend on jQuery selector

UE.plugin.register('tabfocus', function() {
    var me = this;
    var editor = this;
    var jQ;
    editor.setOpt('tabfocus_elements', ':prev,:next');
    editor.setOpt('tab_focus', editor.getOpt('tabfocus_elements'));

    function tabCancel(e) {
        if (e.keyCode === 9 && !e.ctrlKey && !e.altKey && !e.metaKey) {
            e.preventDefault();
        }
    }

    function tabHandler(type, e) {
        var x, el, v, i;
        jQ = jQ || jQuery || function(){
            throw Error('depend on jQuery selector');
        }
        if (e.keyCode !== 9 || e.ctrlKey || e.altKey || e.metaKey) { // || e.isDefaultPrevented()
            return;
        }

        function find(direction) {
            el = jQ(':input:enabled,*[tabindex]:not(iframe)'); // use jQuery
            function canSelectRecursive(e) {
                return e.nodeName === "BODY" || (e.type != 'hidden' &&
                    e.style.display != "none" &&
                    e.style.visibility != "hidden" && canSelectRecursive(e.parentNode));
            }

            function canSelect(el) {
                return /INPUT|TEXTAREA|BUTTON/.test(el.tagName)  && el.tabIndex != -1 && canSelectRecursive(el);
            }

            for (i = 0; i < el.length; i++) {
                if (el[i] == editor.textarea) {
                    x = i;
                    break;
                }
            };
            if (direction > 0) {
                for (i = x + 1; i < el.length; i++) {
                    if (canSelect(el[i])) {
                        return el[i];
                    }
                }
            } else {
                for (i = x - 1; i >= 0; i--) {
                    if (canSelect(el[i])) {
                        return el[i];
                    }
                }
            }

            return null;
        }

        v = editor.getOpt('tab_focus').split(',').map(function(el){
            return UE.utils.trim(el);
        });

        if (v.length == 1) {
            v[1] = v[0];
            v[0] = ':prev';
        }

        // Find element to focus
        if (e.shiftKey) {
            if (v[0] == ':prev') {
                el = find(-1);
            } else {
                el = jQ(v[0])[0];
            }
        } else {
            if (v[1] == ':next') {
                el = find(1);
            } else {
                el = jQ(v[1])[0];
            }
        }
        if (el) {
            var focusEditor = editor.textarea == el;
            if (el.id && focusEditor) {
                editor.focus();
            } else {
                window.setTimeout(function() {
                    if (!browser.webkit) {
                        window.focus();
                    }

                    el.focus();
                }, 10);
            }

            UE.dom.domUtils.preventDefault(e);
            //e.preventDefault();
        }
    }

    return {
        bindEvents: {
            'ready': function (){
                editor.addListener('keyup', tabCancel);
                if (browser.gecko) {
                    editor.addListener('keypress keydown', tabHandler);
                } else {
                    editor.addListener('keydown', tabHandler);
                }
            }
        }
    }
});
