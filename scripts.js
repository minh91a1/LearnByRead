// A $( document ).ready() block.
$( document ).ready(async function() {
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

    // SELECTION
    
    // LOAD FROM LIBRARY
    let allDocKeys = await logic.getAllDocFrom_Library_Index();

    var x = document.getElementById("selectReadItem");
    for (let i = 0; i < allDocKeys.length; i++) {
        const element = allDocKeys[i];
        var option = document.createElement("option");
        option.text = element;
        x.add(option);
    }

    $('#selectReadItem').on('change', function() {
        logic.saveCurrentDocToDb(()=> {
            logic.loadPageIndexFromDb()
        });
    });

    logic.getBasicInfoFromDb();
    
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

    logic.buildReadDataPanel(true);

    // MOUSE DOWN
    document.addEventListener('pointerdown', selectionMan.pointerDown)

    // MOUSE MOVING
    document.addEventListener('pointermove', selectionMan.pointerMove)

    // MOUSE UP
    document.addEventListener('pointerup', selectionMan.pointerUp)

    // PREV PAGE
    document.getElementById('prevPageBtn').addEventListener('click', function() {
        logic.currentPage -= 1
        if (logic.currentPage < 0) {
            logic.currentPage = 0
        }

        var startIndex = logic.currentPage * logic.maxPanelNum
        var endIndex = startIndex + logic.maxPanelNum
        endIndex = Math.min(endIndex, logic.currentData.length)

        for (let index = startIndex; index < endIndex; index++) {
            const element = logic.currentData[index];
            
            var letterPanel = document.getElementById(''+index-startIndex)
            letterPanel.innerText = element
        }

        logic.savePageIndexToDb(logic.currentPage)
        selectionMan.clearSelection()
    })

    // NEXT PAGE
    document.getElementById('nextPageBtn').addEventListener('click', function() {
        logic.currentPage += 1
        if (logic.currentPage > logic.maxPageCount - 1) {
            logic.currentPage = logic.maxPageCount - 1
        }

        var startIndex = logic.currentPage * logic.maxPanelNum
        var endIndex = startIndex + logic.maxPanelNum
        endIndex = Math.min(endIndex, logic.currentData.length)

        for (let index = startIndex; index < endIndex; index++) {
            const element = logic.currentData[index];
            
            var letterPanel = document.getElementById('' + index - startIndex)
            letterPanel.innerText = element
        }

        for (let index = endIndex - startIndex; index < logic.maxPanelNum; index++) {
            var letterPanel = document.getElementById(''+index)
            letterPanel.innerText = ''
        }

        selectionMan.clearSelection()
        logic.savePageIndexToDb(logic.currentPage)
    })

    // TRANS
    document.getElementById('transBtn').addEventListener('click', function() {
        logic.hideMinibox();
        $('#wordToSave').text(selectionMan.getSelectedText())
        logic.showTransbox(selectionMan.getSelectedText());
    })

    // TRANS
    document.getElementById('maziiBtn').addEventListener('click', function() {
        logic.hideSaveWordBox()

        var newMaziiURL = 'https://mazii.net/search?dict=javi&type=w&query='+ selectionMan.getSelectedText() +'&hl==vi-VN';

        if  (logic.lastMaziiURL != newMaziiURL) {
            document.getElementById('transWeb').src = newMaziiURL;
            logic.lastMaziiURL = newMaziiURL;
        }
        
        $('.modal-trans').show();
    })

    // COPY
    document.getElementById('copyBtn').addEventListener('click', function() {
        let copyText = document.getElementById('copyBox');
        copyText.value = selectionMan.getSelectedText()
        copyText.select();
        copyText.setSelectionRange(0, 99999); 
        document.execCommand("copy");
    })


    // ADD DOC
    document.getElementById('addDocBtn').addEventListener('click', function() {
        $('#titleDoc').val('')
        $('#dataDoc').val('')
        $('.modal-addDoc').show();
        
    })

    document.getElementById('saveDocBtn').addEventListener('click', function() {
        let key = $('#titleDoc').val();
        let doc = $('#dataDoc').val()
        logic.addNewDocTo_Library(key, doc, () => {
            $('.modal-addDoc').hide();
        })
    })

    document.getElementById('cancelDocBtn').addEventListener('click', function() {
        $('.modal-addDoc').hide();
        
    })


    // FINALLY LOAD FROM DB
    logic.loadPageIndexFromDb();
    
});

