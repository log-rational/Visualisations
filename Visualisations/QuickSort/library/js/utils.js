Utils = {
    setTouches:function(element){
        element.ontouchstart=function(e){
            element.onmousedown(e.touches[0]);
        };
        element.ontouchend=function(e){
            element.onmouseup(e.touches[0]);
        };
        element.ontouchmove=function(e){
            element.onmousemove(e.touches[0]);
        };
    },
 
    newButton:function(x, y, text, fn, style, type, id, group) {
        var div, button, label;
        div = document.createElement("div");
        document.body.appendChild(div);
        div.setAttribute("style","position:absolute; top:" + y + "; left:" + x + 
                         "; display:block; z-index:9999999; font-size:100%;" + style);
        if(type) {
            if (type === 'b') {
                div.innerHTML="<input name='" + text + "' type='button' class='btn' id='" + 
                                id + "' value='" + text + "'/>";
                button = document.getElementById(id);
                button.onclick = fn;
            } else {
                div.innerHTML = "<input class='cbtn' id='" + id + "' name='" + group + 
                                "' type='" + (type === 'r' ? 'radio' : 'checkbox') + "'/>" +                                
                                "<button id='" + id + "_label' class='cbtn_label'>" + text + "</a=button>";
                button=document.getElementById(id);
                button.onclick = function() {this.fn();}
                label = document.getElementById(id + "_label");                
                label.onclick = function() {
                    button.checked = !button.checked;
                    button.fn();
                }          
                
            }
        } else {
            div.innerHTML = "<a href='#' style='" + style + "' class='btn' id='" + id + 
                          "' >" + text + "</a>";
            button = document.getElementById(id);
            button.onclick = fn;            
        }
        button.fn = fn;        
        button.setEnabled = function(isEnabled) {
            this.disabled = !isEnabled;
            if (isEnabled) 
                this.onclick = this.fn;
            else this.onclick = function() {};
            return "disabled: " + this.disabled;
        }
        button.enable = function() {
            this.setEnabled(true);
        }
        button.disable = function() {
            this.setEnabled(false);
        }
        button.setVisible = function(isVisible) {
            this.style.display = (isVisible ? "block" : "none");
            this.parentNode.style.display = (isVisible ? "block" : "none");
        }
        ///this.setTouches(button);
        return button;
    }  
};
