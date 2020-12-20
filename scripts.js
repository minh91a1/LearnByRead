logic = {
    lastMaziiURL: '',

    changeFontSize: function(val) {
        var currentFont = parseInt($('#readBox').css('font-size').split('px')[0])
        $('#readBox').css('font-size', (currentFont + val) + 'px')
    },

    handleSelection: function(e) {
        
        var allowHandleSelection = ['readBox','selectedTextContainer','selectedText'];
        if (allowHandleSelection.indexOf(e.target.id) == -1) {
            return;
        }
        
        const activeElement = document.getElementById('readBox')
        logic.hideMinibox();

        if (activeElement && activeElement.id === 'readBox') {
            const range = {
                start: activeElement.selectionStart,
                end: activeElement.selectionEnd
            }

            logic.getSelection(activeElement, e)
        }
    },

    getSelection: function(activeElement, e) {
        if (!activeElement) {
            activeElement = document.getElementById('readBox')
        }

        if (activeElement.selectionStart == activeElement.selectionEnd) {
            return;
        }

        var selectedText = activeElement.value.substring(activeElement.selectionStart,  activeElement.selectionEnd);
            
        selectedText = selectedText.substring(0, 20)

        logic.showMinibox();
        var clRect = document.getElementsByClassName('modal-content')[0].getBoundingClientRect();
        
        document.getElementById('selectedText').innerHTML = selectedText;
        
        if (e && e.offsetY && e.offsetX) {
            console.log(e.offsetY , e.offsetX)
            $('.modal-content').css('top', e.offsetY + 20)
            $('.modal-content').css('left', e.offsetX - clRect.width/2)
        }
    },

    onClickOnMinibox: function(e) {
        logic.hideMinibox();
        logic.showTransbox(document.getElementById('selectedText').innerHTML);

        e.stopPropagation();
        e.preventDefault();
    },

    showMinibox: function() {
        $('.modal-content').show();
    },

    hideMinibox: function() {
        if (!logic.isMobile()) {
            $('.modal-content').hide();
        }
    },
    
    showTransbox: function(word) {
        var newMaziiURL = 'https://mazii.net/search?dict=javi&type=w&query='+ word +'&hl==vi-VN';

        if  (logic.lastMaziiURL != newMaziiURL) {
            document.getElementById('transWeb').src = newMaziiURL;
            logic.lastMaziiURL = newMaziiURL;
        }
        
        $('.modal-trans').show();
    },

    hideTransbox: function() {
        $('.modal-trans').hide();
    },

    onClickOnTransBox: function() {
        logic.hideTransbox();

        e.stopPropagation();
        e.preventDefault();
    },

    onClickSaveBtn: function() {
        //console.log(document.getElementById('transWeb').contentWindow.document.body.innerHTML)
        //console.log(document.getElementsByTagName('html')[0].innerHTML);
        
        e.stopPropagation();
        e.preventDefault();
    },

    isMobile: function() {
        var isMobile = false; //initiate as false
        // device detection
        if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
            || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) { 
            isMobile = true;
        }
        return isMobile;
    }
}

// A $( document ).ready() block.
$( document ).ready(function() {
    $('#readBox').val(Data.text)

    $('#smallerFont').on('click', function() {
        logic.changeFontSize(-1);
    })

    $('#largerFont').on('click', function() {
        logic.changeFontSize(+1);
    })

    $(document).on("contextmenu",function(e){
        if(e.target.nodeName == "TEXTAREA")
             e.preventDefault();
    });

    document.getElementsByTagName('body')[0].addEventListener('mouseup', logic.handleSelection)
    document.getElementsByTagName('body')[0].addEventListener('touchend', logic.handleSelection)

    logic.hideMinibox();

    if (logic.isMobile()) {
        console.log('mobile')
        $('.modal-content').on('touchend', logic.onClickOnMinibox);
        $('.modal-content-trans').on('touchend', logic.onClickOnTransBox);
        $('.modal-trans').on('touchend', logic.onClickOnTransBox);
        $('#saveBtn').on('touchend', logic.onClickSaveBtn);

        $('.modal-content').addClass('modal-content-mobile')

    } else {
        console.log('desktop?')
        $('.modal-content').on('click', logic.onClickOnMinibox);
        $('.modal-content-trans').on('click', logic.onClickOnTransBox);
        $('.modal-trans').on('click', logic.onClickOnTransBox);
        $('#saveBtn').on('click', logic.onClickSaveBtn);
    }
});


