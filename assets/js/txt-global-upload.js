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
  var _0x451cb5 = document["querySelector"]("#inputBrow");
  var _0x1fb2bd = document["querySelector"]("#input-text");
  _0x451cb5["addEventListener"]("change", function (_0x55f7f1) {
    _0x33a113(_0x55f7f1["target"]["files"][0x0]);
  });

  function _0x33a113(_0x108fad) {
    console["log"]("hand");
    var _0x1faf19 = new FileReader();
    _0x1faf19["onload"] = function (_0x390aa5) {
      _0x1fb2bd["value"] = _0x390aa5["target"]["result"];
    };
    _0x1faf19["readAsText"](
      _0x108fad,
      document["getElementById"]("encoding")["value"]
    );
    _0x1faf19 = null;
  }
})();
