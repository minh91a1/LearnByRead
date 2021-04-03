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
    },
}