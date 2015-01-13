//**********************************************************
//Initialise blockly
//**********************************************************
function blocklyLoaded(blockly) {
    // Called once Blockly is fully loaded.
    window.Blockly = blockly;
    retrieveBlockState();
    
}
window.addEventListener("load",function() { // Wait for the window to finish loading
    //**********************************************************
    //Inject code into display area after every change
    //**********************************************************
    function myUpdateFunction() {
        var code = window.Blockly.JavaScript.workspaceToCode();
        document.getElementById('samplecodechunk').innerHTML = code;
        saveCodeState(code);
        var xml = Blockly.Xml.workspaceToDom(Blockly.getMainWorkspace());
        saveBlockState(Blockly.Xml.domToText(xml));
    }
    Blockly.addChangeListener(myUpdateFunction);
});
//**********************************************************
//test for local storage support
//**********************************************************
function supports_html5_storage() {
    try {
        return 'localStorage' in window && window['localStorage'] !== null;
    } catch (e) {
        return false;
    }
}
//**********************************************************
//save js to local storage      
//**********************************************************
function saveCodeState(code) {
    if (!supports_html5_storage()) { return false; }
    localStorage["blcktest.code"] = code;
    return true;
}
//**********************************************************
//retrieve js from local storage      
//**********************************************************
function retrieveCodeState(code) {
    if (!supports_html5_storage()) { return false; }
    code = localStorage["blcktest.code"];
    return code;
}
//**********************************************************
//save blocks to local storage      
//**********************************************************
function saveBlockState(blocks) {
    if (!supports_html5_storage()) { return false; }
    localStorage["blcktest.blocks"] = blocks;
    return true;
}
//**********************************************************
//retrieve blocks from local storage      
//**********************************************************
function retrieveBlockState(){
    if (!supports_html5_storage()) { return false; }
    var xml = Blockly.Xml.textToDom(window.localStorage['blcktest.blocks']);
    Blockly.Xml.domToWorkspace(Blockly.getMainWorkspace(), xml);
    return true;
}
