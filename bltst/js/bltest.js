var SHEARICHARD = SHEARICHARD || function () { };
SHEARICHARD.BLCKTEST = function () {
    //Private vars
    var jscodekey = "blcktest.code";
    var blockscodekey = "blcktest.blocks";

    return {
    //**********************************************************
    //test for local storage support
    //**********************************************************
    supports_html5_storage: function() {
        try {
            return 'localStorage' in window && window['localStorage'] !== null;
        } catch (e) {
            return false;
        }
    },
    //**********************************************************
    //save js to local storage      
    //**********************************************************
    saveCodeState: function(code) {
        if (!SHEARICHARD.BLCKTEST.supports_html5_storage()) { return false; }
        localStorage[jscodekey] = code;
        return true;
    },
    //**********************************************************
    //retrieve js from local storage      
    //**********************************************************
    retrieveCodeState: function(code) {
        if (!SHEARICHARD.BLCKTEST.supports_html5_storage()) { return false; }
        if (localStorage.getItem(jscodekey) === null) {
            return false;
        }else{
            code = localStorage[jscodekey];
            return code;
        }
    },
    //**********************************************************
    //save blocks to local storage      
    //**********************************************************
    saveBlockState: function(blocks) {
        if (!SHEARICHARD.BLCKTEST.supports_html5_storage()) { return false; }
        localStorage[blockscodekey] = blocks;
        return true;
    },
    //**********************************************************
    //retrieve blocks from local storage      
    //**********************************************************
    retrieveBlockState: function(){
        if (!SHEARICHARD.BLCKTEST.supports_html5_storage()) { return false; }
        if (localStorage.getItem(blockscodekey) === null) {
            return false;
        }else{
            var xml = Blockly.Xml.textToDom(window.localStorage[blockscodekey]);
            Blockly.Xml.domToWorkspace(Blockly.getMainWorkspace(), xml);
            return true;
        }
    }
    };

}();
//**********************************************************
//Initialise blockly
//**********************************************************
function blocklyLoaded(blockly) {
    // Called once Blockly is fully loaded.
    window.Blockly = blockly;
    SHEARICHARD.BLCKTEST.retrieveBlockState();
    
}
window.addEventListener("load",function() { // Wait for the window to finish loading
    //**********************************************************
    //Inject code into display area after every change
    //**********************************************************
    function myUpdateFunction() {
        var code = window.Blockly.JavaScript.workspaceToCode();
        document.getElementById('samplecodechunk').innerHTML = code;
        SHEARICHARD.BLCKTEST.saveCodeState(code);
        var xml = Blockly.Xml.workspaceToDom(Blockly.getMainWorkspace());
        SHEARICHARD.BLCKTEST.saveBlockState(Blockly.Xml.domToText(xml));
    }
    Blockly.addChangeListener(myUpdateFunction);
});
