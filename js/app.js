$(function() {
  var pixelPainter = new PixelPainter(11, 11);
  // pixelPainter.cellSize = 32; // 32px by 32px
  $("#container").html(pixelPainter.render());
});
