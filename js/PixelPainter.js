// Creates a grid width cells wide and height cells tall
// Has a control panel on the left
function PixelPainter(width, height) {
  this.cellSize = 40; // Cell size default is 40px by 40px

  var colorPalette = [
    ["#FFF62D", "#FCD640", "#FFF764", "#F4D478", "#356D00", "#3A7700"],
    ["#BDF232", "#74EF00", "#9DF113", "#63BB2B", "#72F071", "#A0E185"],
    ["#59A263", "#6EEC8D", "#767014", "#447A4C", "#E5362D", "#E84F2D"],
    ["#EE852D", "#F29C2D", "#D33E40", "#691814", "#8D312E", "#BD632D"],
    ["#EC7B53", "#C23340", "#D98F74", "#E5438D", "#992F2B", "#E871AE"],
    ["#B75A57", "#DD7D7A", "#F2B3BC", "#F09A76", "#E155FF", "#AC377D"],
    ["#C176D0", "#C46E8B", "#E77D6F", "#E59B5E", "#001D72", "#372175"],
    ["#0F2262", "#0040FA", "#672674", "#6B48DA", "#5D90E6", "#6AF8FA"],
    ["#357C7D", "#383D7D", "#45B7FA", "#2F8DFB", "#ACD1E0", "#4CA39D"],
    ["#89C8F6", "#A9BDD7", "#655A7D", "#656DE8", "#366AD9", "#565DC4"],
    ["#677584", "#4778A7", "#317172", "#6BD5C5", "#9F9F9F", "#CCCCCC"]
  ];

  var board = $("<div>", {
    class: "clearfix",
    id: "pixelPainter"
  });

  var renderColorPalette = function() {
    var palette = $("<div>", {
      id: "palette"
    });

    for (var rowIndex = 0; rowIndex < 11; rowIndex++) {
      var row = $("<div>", {
        class: "clearfix",
        id: "rowc" + rowIndex
      });

      for (var colIndex = 0; colIndex < 6; colIndex++) {
        var cells = $("<div>", {
          class: "color",
          id: "r" + rowIndex + "color" + colIndex,
          css: {
            "background-color": colorPalette[rowIndex][colIndex]
          }
        });
        row.append(cells);
      }

      palette.append(row);
    }

    return palette;
  } // renderColorPalette()

  var renderActions = function() {
    var actions = $("<div>", {
      id: "actions"
    });

    var eraseButton = $("<button>", {
      id: "eraseAction",
      text: "erase"
    });

    var clearButton = $("<button>", {
      id: "clearAction",
      text: "clear"
    });

    actions.append(eraseButton);
    actions.append(clearButton);

    return actions;
  }; // renderActions()

  var renderControls = function() {
    var controls = $("<div>", {
      id: "controls"
    });

    controls.append(renderColorPalette());
    controls.append(renderActions());
    // controls.append(renderDisplay());

    board.append(controls);
  }; // renderControls()

  var renderArtboard = function(cellSize) {
    var artboard = $("<div>", {
      id: "artboard"
    });

    for (var rowIndex = 0; rowIndex < height; rowIndex++) {
      var row = $("<div>", {
        class: "clearfix",
        id: "row" + rowIndex
      });

      for (var colIndex = 0; colIndex < width; colIndex++) {
        var cells = $("<div>", {
          class: "cell",
          id: "r" + rowIndex + "cell" + colIndex,
          text: rowIndex + ", " + colIndex,
          css: {
            width: cellSize + "px",
            height: cellSize + "px"
          }
        });
        row.append(cells);
      }

      artboard.append(row);
    }

    board.append(artboard);
  }; // renderArtboard()

  var registerEventListeners = function() {
    var colorSelected = "#000000"; // Default color if none selected
    var eraseMode = false; // Default false

    $("body").on("click", ".color", function() {
      eraseMode = false;
      colorSelected = $(this).css("background-color");
    });

    $("body").on("click", "#eraseAction", function() {
      eraseMode = true;
    });

    $("body").on("click", "#clearAction", function() {
      var confirmed = confirm("Are you sure you want to clear the entire artboard?");
      if (confirmed) {
        $("#artboard .cell").css("background-color", "transparent");
      }
    });

    $("body").on("click", ".cell", function() {
      if (!eraseMode) {
        $(this).css("background-color", colorSelected);
      }
      else {
        $(this).css("background-color", "transparent");
      }
    });
  }; // registerEventListeners()

  this.render = function() {
    renderControls();
    renderArtboard(this.cellSize);
    registerEventListeners();
    return board;
  };
}
