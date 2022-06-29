// --------------------------------------
// for drag to upload
// --------------------------------------
function dragenter(_0x595871) {
  _0x595871["stopPropagation"]();
  _0x595871["preventDefault"]();
}

function dragover(_0x20d195) {
  _0x20d195["stopPropagation"]();
  _0x20d195["preventDefault"]();
}

function drop(_0x1ffad3) {
  _0x1ffad3["stopPropagation"]();
  _0x1ffad3["preventDefault"]();
  var _0x310a77 = _0x1ffad3["dataTransfer"];
  var _0x27b2b7 = _0x310a77["files"];
  if (_0x27b2b7["length"]) {
    var _0x52b4c2 = _0x27b2b7[0x0];
    var fileReader = new FileReader();
    fileReader["onload"] = function () {
      document["getElementById"]("input-text")["value"] = this["result"];
    };
    fileReader["readAsText"](
      _0x52b4c2,
      document["getElementById"]("encoding")["value"]
    );
    fileReader = null;
  }
}
var dropbox = document["getElementById"]("kratos-wrapper");
dropbox["addEventListener"]("dragenter", dragenter, ![]);
dropbox["addEventListener"]("dragover", dragover, ![]);
dropbox["addEventListener"]("drop", drop, ![]);

(function () {
  var uploadElement = document["querySelector"]("#inputBrow");
  var inputTextElement = document["querySelector"]("#input-text");
  uploadElement.addEventListener("change", function (event) {
    readFile(event.target.files[0]);
  });

  function readFile(file) {
    console["log"]("hand");
    var fileReader = new FileReader();
    fileReader.onload = function (event) {
      inputTextElement["value"] = event.target.result;
    };
    fileReader["readAsText"](
      file,
      document["getElementById"]("encoding")["value"]
    );
    fileReader = null;
  }
})();
