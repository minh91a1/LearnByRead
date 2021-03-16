logic = {
    lastMaziiURL: '',
    lastSaveWord: '',
    maxPanelNum: 0,

    changeFontSize: function(val) {
        var currentFont = parseInt($('#readBox').css('font-size').split('px')[0])
        $('#readBox').css('font-size', (currentFont + val) + 'px')
    },

    // handleSelection: function(e) {
        
    //     var allowHandleSelection = ['readBox','selectedTextContainer','selectedText'];
    //     if (allowHandleSelection.indexOf(e.target.id) == -1) {
    //         return;
    //     }
        
    //     const activeElement = document.getElementById('readBox')
    //     logic.hideMinibox();

    //     if (activeElement && activeElement.id === 'readBox') {
    //         const range = {
    //             start: activeElement.selectionStart,
    //             end: activeElement.selectionEnd
    //         }

    //         logic.getSelection(activeElement, e)
    //     }
    // },

    // getSelection: function(activeElement, e) {
    //     if (!activeElement) {
    //         activeElement = document.getElementById('readBox')
    //     }

    //     if (activeElement.selectionStart == activeElement.selectionEnd) {
    //         return;
    //     }

    //     var selectedText = activeElement.value.substring(activeElement.selectionStart,  activeElement.selectionEnd);
            
    //     selectedText = selectedText.substring(0, 20)

    //     logic.showMinibox();
    //     var clRect = document.getElementsByClassName('modal-content')[0].getBoundingClientRect();
        
    //     document.getElementById('selectedText').innerHTML = selectedText;
        
    //     if (e && e.offsetY && e.offsetX) {
    //         console.log(e.offsetY , e.offsetX)
    //         $('.modal-content').css('top', e.offsetY + 20)
    //         $('.modal-content').css('left', e.offsetX - clRect.width/2)
    //     }
    // },

    onClickOnMinibox: function(e) {
        logic.hideMinibox();
        //logic.showTransbox(document.getElementById('selectedText').innerHTML);
        logic.showTransbox(selectionMan.getSelectedText());

        e.stopPropagation();
        e.preventDefault();
    },

    showMinibox: function() {
        $('.modal-content').show();
    },

    hideMinibox: function() {
        $('.modal-content').hide();
    },
    
    showTransbox: function(word) {
        fb.getSingle_Words_FromDb(word, (data) => {
            var readFromDb = false
            if (data) {
                if (confirm("Word exists! Read from Firebase ?")) {
                    readFromDb = true
                } else {
                    readFromDb = false
                }
            }

            if (readFromDb) {
                logic.showSaveWordBox(data)

            } else {
                var newMaziiURL = 'https://mazii.net/search?dict=javi&type=w&query='+ word +'&hl==vi-VN';

                if  (logic.lastMaziiURL != newMaziiURL) {
                    document.getElementById('transWeb').src = newMaziiURL;
                    logic.lastMaziiURL = newMaziiURL;
                }
                
                $('.modal-trans').show();
            }

        });

    },

    hideTransbox: function() {
        $('.modal-trans').hide();
    },

    showSaveWordBox: function(existData) {
        var word = document.getElementById('selectedText').innerHTML;

        if (logic.lastSaveWord != word) {
            // clear previous data
            logic.parseDataToSaveWordBox({ read: '', hantu: '', mean: '' })
        }

        if (existData) {
            logic.parseDataToSaveWordBox(existData)

            // show the box
            logic.lastSaveWord = word
            $('.modal-save-word').show();

        } else {
            fb.getSingle_Words_FromDb(word, (data) => {
                logic.parseDataToSaveWordBox(data)

                // show the box
                logic.lastSaveWord = word
                $('.modal-save-word').show();
            });
        }
    
    },

    parseDataToSaveWordBox: function(data) {
        if (!data) {
            return
        }

        document.getElementById('pronunciationTextbox').value = data.read
        document.getElementById('hantuTextbox').value = data.hantu
        $('#meanTextbox').text(data.mean)
    },

    hideSaveWordBox: function() {
        $('.modal-save-word').hide();
    },

    onClickSaveBtn: function(e) {
        logic.showSaveWordBox()

        e.stopPropagation();
        e.preventDefault();
    },

    onClickCancelBtn: function(e) {
        logic.hideTransbox();

        e.stopPropagation();
        e.preventDefault();
    },

    onClickClearWordBtn: function(e) {
        logic.parseDataToSaveWordBox({ read: '', hantu: '', mean: '' })

        setTimeout(()=>{
            document.getElementById('pronunciationTextbox').focus()
        }, 200)
    },

    onClickSaveWordBtn: function(e) {
        var word = document.getElementById('selectedText').innerHTML;

        var pr = document.getElementById('pronunciationTextbox').value
        var ht = document.getElementById('hantuTextbox').value
        var mn = $('#meanTextbox').text()

        if (pr != "" || mn != "") {
            console.log(pr,mn)
            fb.set__Words__ToDb(word, {
                read: pr,
                mean: mn,
                link: 'https://mazii.net/search?dict=javi&type=w&query='+ word +'&hl==vi-VN',
                hantu: ht,
            })
        }

        logic.hideSaveWordBox()
        logic.hideTransbox();

        e.stopPropagation();
        e.preventDefault();
    },

    onClickCancelSaveWordBtn: function(e) {
        logic.hideSaveWordBox()

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
    },

    onClickSaveToServerBtn: function(e) {
        let textarea = document.getElementById('readBox');
        var currentFont = parseInt($('#readBox').css('font-size').split('px')[0])

        fb.update__Infos_Basic__ToDb({
            fontsize: currentFont,
        });

    },

    onClickBookmarkBtn: function(e) {
        const activeElement = document.getElementById('readBox')

        if (activeElement.selectionStart == activeElement.selectionEnd) {
            return;
        }

        fb.update__Infos_Basic__ToDb({
            selectionStart: activeElement.selectionStart,
            selectionEnd: activeElement.selectionEnd
        });
    },

    scrollIntoSelection: function(selectionStart, selectionEnd) {
        console.log('scrollIntoSelection', selectionStart, selectionEnd)
        
        if (!selectionStart || !selectionEnd) {
            return;
        }

        let textArea = document.getElementById('readBox');

        textArea.focus();

        const fullText = textArea.value;
        textArea.value = fullText.substring(0, selectionEnd);
        const lastHeight = textArea.scrollHeight;
        
        setTimeout(() => {
            textArea.value = fullText;
            textArea.scrollTop = lastHeight - 100
            textArea.setSelectionRange(selectionStart, selectionEnd);
            logic.hideMinibox()
        }, 100);
    },

    getDataFromDb: function() {
        fb.get__Infos_Basic__FromDb((data) => {
            let textarea = document.getElementById('readBox');
            $('#readBox').css('font-size', (data.fontsize) + 'px')

            console.log('data selection: ',data.selectionStart, data.selectionEnd)

            setTimeout(() => logic.scrollIntoSelection(data.selectionStart, data.selectionEnd), 100)
            
        });
    },

    savePageIndexToDb: function(pageIndex) {
        fb.update__Infos_Basic__ToDb({
            pageIndex: pageIndex,
        });
    },

    loadPageIndexFromDb: function() {
        fb.get__Infos_Basic__FromDb((data) => {
            if (data && data.pageIndex) {
                let pageIndex = data.pageIndex
                var startIndex = pageIndex * logic.maxPanelNum
                var endIndex = startIndex + logic.maxPanelNum
                endIndex = Math.min(endIndex, Data.text.length)
        
                for (let index = startIndex; index < endIndex; index++) {
                    const element = Data.text[index];
                    
                    var letterPanel = document.getElementById('' + index - startIndex)
                    letterPanel.innerText = element
                }
        
                for (let index = endIndex - startIndex; index < logic.maxPanelNum; index++) {
                    var letterPanel = document.getElementById(''+index)
                    letterPanel.innerText = ''
                }
            }
        });
    },
}

selectionMan = {
    canSelect: false,
    firstSelectedId: -1,
    lastSelectedId: -1,

    pointerDown: function(e) {
        elementFromPoint = document.elementFromPoint(e.pageX - window.pageXOffset, e.pageY - window.pageYOffset);
        if (elementFromPoint) {
            if (elementFromPoint.parentNode.id != 'myTextArea') {
                return
            }

            if ($('.selected').length > 0) {
                $('.selected').removeClass('selected')
                $('.selected-1st').removeClass('selected-1st')
                //return
            }
    
            if (selectionMan.canSelect == true) {
                return
            }
    
            elementFromPoint.classList.add('selected')
            elementFromPoint.classList.add('selected-1st')
            selectionMan.canSelect = true
            selectionMan.firstSelectedId = elementFromPoint.id
        }
    },

    pointerMove: function(e) {
        elementFromPoint = document.elementFromPoint(e.pageX - window.pageXOffset, e.pageY - window.pageYOffset);
        if (elementFromPoint) {
            if (selectionMan.canSelect) {
                $('.selected').removeClass('selected')
                elementFromPoint.classList.add('selected')
    
                var startId = Math.min(selectionMan.firstSelectedId, elementFromPoint.id)
                var endId = Math.max(selectionMan.firstSelectedId, elementFromPoint.id)
                for (let i = startId; i <= endId; i++) {
                    $('#'+i)[0].classList.add('selected')
                }
            }
        }
    },

    pointerUp: function(e) {
        selectionMan.canSelect = false

        elementFromPoint = document.elementFromPoint(e.pageX - window.pageXOffset, e.pageY - window.pageYOffset);
        if (elementFromPoint.parentNode.id != 'myTextArea') {
            return
        }
        selectionMan.lastSelectedId = elementFromPoint.id
    },

    getSelectedText: function() {
        let startIndex = Math.min(selectionMan.firstSelectedId, selectionMan.lastSelectedId)
        let endIndex = Math.max(selectionMan.firstSelectedId, selectionMan.lastSelectedId)

        let selectedText = ''
        for (let index = startIndex; index <= endIndex; index++) {
            var letterPanel = document.getElementById('' + index)
            selectedText += letterPanel.innerText
        }

        return selectedText
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

    logic.hideMinibox();

    if (logic.isMobile()) {
        console.log('mobile')
        $('.modal-content').on('touchend', logic.onClickOnMinibox);
        $('.modal-content-trans').on('touchend', logic.onClickOnTransBox);
        $('.modal-trans').on('touchend', logic.onClickOnTransBox);
        
        $('#saveBtn').on('touchend', logic.onClickSaveBtn);
        $('#cancelBtn').on('touchend', logic.onClickCancelBtn);
        
        $('#saveToServer').on('touchend', logic.onClickSaveToServerBtn);

        $('#bookmark').on('touchend', logic.onClickBookmarkBtn);

        $('#clearWordBtn').on('touchend', logic.onClickClearWordBtn);
        $('#saveWordBtn').on('touchend', logic.onClickSaveWordBtn);
        $('#cancelSaveWordBtn').on('touchend', logic.onClickCancelSaveWordBtn);

        $('.modal-content').addClass('modal-content-mobile')

    } else {
        console.log('desktop?')
        $('.modal-content').on('click', logic.onClickOnMinibox);
        $('.modal-content-trans').on('click', logic.onClickOnTransBox);
        $('.modal-trans').on('click', logic.onClickOnTransBox);
        
        $('#saveBtn').on('click', logic.onClickSaveBtn);
        $('#cancelBtn').on('click', logic.onClickCancelBtn);
        
        $('#saveToServer').on('click', logic.onClickSaveToServerBtn);

        $('#bookmark').on('click', logic.onClickBookmarkBtn);

        $('#clearWordBtn').on('click', logic.onClickClearWordBtn);
        $('#saveWordBtn').on('click', logic.onClickSaveWordBtn);
        $('#cancelSaveWordBtn').on('click', logic.onClickCancelSaveWordBtn);
    }

    logic.getDataFromDb();
    
    // MY TEXT AREA CONTAINER
    var containerPanel = document.getElementById('myTextAreaContainer')
    var containerPanelWidth = containerPanel.offsetWidth
    var containerPanelHeight = containerPanel.offsetHeight

    console.log("container size: ",containerPanelWidth, containerPanelHeight)

    // build MY TEXT AREA
    var textArea = document.getElementById('myTextArea')
    textArea.style.width = "340px"
    textArea.style.height = "450px"

    // SET MINI BOX POSITION
    logic.showMinibox();
    var rectContainerPanel = containerPanel.getBoundingClientRect();
    var rect = textArea.getBoundingClientRect();
    console.log('rect: ',rect)
    $('.modal-content').css('top', rect.y + rect.height - rectContainerPanel.y)
    $('.modal-content').css('left', rect.x + rect.width - 40)

    var demoData = Data.text

    var margin = 0
    var panelWidth = 22 + 2*margin
    var panelHeight = 26 + 2*margin
    var fontSize = 20

    var panelXNum = Math.floor(textArea.offsetWidth / panelWidth)
    var panelYNum = Math.floor(textArea.offsetHeight / panelHeight)

    console.log(textArea.offsetWidth, textArea.offsetHeight)

    var maxPanelNum = panelXNum*panelYNum
    logic.maxPanelNum = maxPanelNum
    var maxPageCount = Math.ceil(demoData.length / maxPanelNum)

    var pageIndex = 0
    var startIndex = pageIndex*maxPanelNum
    var endIndex = startIndex + maxPanelNum
    endIndex = Math.min(endIndex, demoData.length)

    for (let index = startIndex; index < endIndex; index++) {
        const element = demoData[index];
        
        var letterPanel = document.createElement('span')
        letterPanel.id = index
        letterPanel.innerText = element
        letterPanel.style.fontSize  = fontSize + "px"

        textArea.appendChild(letterPanel)
    }

    logic.loadPageIndexFromDb()

    // MOUSE DOWN
    document.addEventListener('pointerdown', selectionMan.pointerDown)

    // MOUSE MOVING
    document.addEventListener('pointermove', selectionMan.pointerMove)

    // MOUSE UP
    document.addEventListener('pointerup', selectionMan.pointerUp)

    // PREV PAGE
    document.getElementById('prevPageBtn').addEventListener('click', function() {
        pageIndex -= 1
        if (pageIndex < 0) {
            pageIndex = 0
        }

        var startIndex = pageIndex*maxPanelNum
        var endIndex = startIndex + maxPanelNum
        endIndex = Math.min(endIndex, demoData.length)

        for (let index = startIndex; index < endIndex; index++) {
            const element = demoData[index];
            
            var letterPanel = document.getElementById(''+index-startIndex)
            letterPanel.innerText = element
        }

        logic.savePageIndexToDb(pageIndex)
    })

    // NEXT PAGE
    document.getElementById('nextPageBtn').addEventListener('click', function() {
        pageIndex += 1
        if (pageIndex > maxPageCount - 1) {
            pageIndex = maxPageCount - 1
        }

        var startIndex = pageIndex*maxPanelNum
        var endIndex = startIndex + maxPanelNum
        endIndex = Math.min(endIndex, demoData.length)

        for (let index = startIndex; index < endIndex; index++) {
            const element = demoData[index];
            
            var letterPanel = document.getElementById('' + index - startIndex)
            letterPanel.innerText = element
        }

        for (let index = endIndex - startIndex; index < maxPanelNum; index++) {
            var letterPanel = document.getElementById(''+index)
            letterPanel.innerText = ''
        }

        logic.savePageIndexToDb(pageIndex)
    })

    // TRANS
    document.getElementById('transBtn').addEventListener('click', function() {
        logic.hideMinibox();
        logic.showTransbox(selectionMan.getSelectedText());        
    })
});

