Blockly.Blocks['colour_rgb'] = {
  init: function() {
    this.setHelpUrl('http://www.example.com/');
    this.setColour(225);
    this.appendValueInput("NAME")
        .setCheck("Number")
        .appendField("-");
    this.setOutput(true);
    this.setTooltip('');
  }
};
