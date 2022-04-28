/*Obfuscated by Guihet.com*/ let inputText =
  document["getElementById"]("input-text");
let hintSpan = document["getElementById"]("rn-hint");
let outputDivArray = [];
let RN = "\x0d\x0a";
let vtemp = document["getElementById"]("texttosrt-temp");
function onChange(_0x4019d4) {
  switch (_0x4019d4) {
    case "rn":
      RN = "\x0d\x0a";
      break;
    case "n":
      RN = "\x0a";
      break;
    default:
  }
  if (outputDivArray["length"]) {
    hintSpan["style"]["display"] = "inline-block";
  }
}
function onClearClick() {
  inputText["value"] = "";
}
function onGenerateClick() {
  try {
    let _0x2e4ae8 = document["getElementById"]("texttosrt-temp");
    if (_0x2e4ae8) {
      _0x2e4ae8["parentNode"]["removeChild"](_0x2e4ae8);
      console["log"]("移除默认区域");
    }
    hintSpan["style"]["display"] = "none";
    let _0x288f14;
    while (outputDivArray["length"]) {
      _0x288f14 = outputDivArray["pop"]();
      _0x288f14["parentNode"]["removeChild"](_0x288f14);
    }
    _0x288f14 = JSON["parse"](inputText["value"]);
    let _0x447303 = convertJSON2SRT(_0x288f14);
    let _0x1e8f3a;
    for (let _0xcdeb10 in _0x447303) {
      _0x1e8f3a = _0x447303[_0xcdeb10];
      _0x288f14 = document["createElement"]("div");
      _0x288f14["innerHTML"] =
        "<textarea\x20class=\x22texttosrt\x22\x20readonly>" +
        _0x1e8f3a +
        "</textarea>";
      _0x288f14["appendChild"](
        getDownloadLink("jy_" + _0xcdeb10 + ".srt", _0x1e8f3a)
      );
      document["getElementById"]("jytosrt")["appendChild"](_0x288f14);
      outputDivArray["push"](_0x288f14);
    }
    console["log"]("生成完毕");
  } catch (_0x41a480) {
    console["log"](_0x41a480);
    alert("JSON\x20解析错误");
  }
}
function onGenerateTextClick() {
  try {
    let _0x424102 = document["getElementById"]("texttosrt-temp");
    if (_0x424102) {
      _0x424102["parentNode"]["removeChild"](_0x424102);
      console["log"]("移除默认区域");
    }
    hintSpan["style"]["display"] = "none";
    let _0x59a777;
    while (outputDivArray["length"]) {
      _0x59a777 = outputDivArray["pop"]();
      _0x59a777["parentNode"]["removeChild"](_0x59a777);
    }
    _0x59a777 = JSON["parse"](inputText["value"]);
    let _0x313b8f = convertJSON2Text(_0x59a777);
    let _0x232daf;
    for (let _0x2049d6 in _0x313b8f) {
      _0x232daf = _0x313b8f[_0x2049d6];
      _0x59a777 = document["createElement"]("div");
      _0x59a777["innerHTML"] =
        "<textarea\x20class=\x22texttosrt\x22\x20readonly>" +
        _0x232daf +
        "</textarea>";
      _0x59a777["appendChild"](
        getDownloadLink("jy_" + _0x2049d6 + ".txt", _0x232daf)
      );
      document["getElementById"]("jytosrt")["appendChild"](_0x59a777);
      outputDivArray["push"](_0x59a777);
    }
    console["log"]("生成TXT完毕");
  } catch (_0x4e0018) {
    console["log"](_0x4e0018);
    alert("JSON\x20解析错误");
  }
}
function convertJSON2SRT(_0x55a79c) {
  let _0x27dca6 = _0x55a79c["platform"]["os"];
  let _0x3e8bae = {},
    _0x4863ee = _0x55a79c["materials"]["texts"];
  for (let _0x5e6e6a in _0x4863ee) {
    _0x3e8bae[_0x4863ee[_0x5e6e6a]["id"]] = _0x4863ee[_0x5e6e6a]["content"];
  }
  let _0x41ea17 = _0x55a79c["tracks"],
    _0x456381;
  let _0x48bb54 = {};
  for (let _0x40bab4 in _0x41ea17) {
    _0x456381 = _0x41ea17[_0x40bab4];
    _0x4863ee = convertTrack2Srt(_0x456381, _0x3e8bae, _0x27dca6);
    if (_0x4863ee) {
      _0x48bb54[_0x456381["id"]] = _0x4863ee;
    }
  }
  return _0x48bb54;
}
function convertJSON2Text(_0x88155a) {
  let _0xa117a = _0x88155a["platform"]["os"];
  let _0x330106 = {},
    _0x330868 = _0x88155a["materials"]["texts"];
  for (let _0x398ab1 in _0x330868) {
    _0x330106[_0x330868[_0x398ab1]["id"]] = _0x330868[_0x398ab1]["content"];
  }
  let _0x10df17 = _0x88155a["tracks"],
    _0x27f40b;
  let _0x5cbb30 = {};
  for (let _0x18db3f in _0x10df17) {
    _0x27f40b = _0x10df17[_0x18db3f];
    _0x330868 = convertTrack2Text(_0x27f40b, _0x330106, _0xa117a);
    if (_0x330868) {
      _0x5cbb30[_0x27f40b["id"]] = _0x330868;
    }
  }
  return _0x5cbb30;
}
function convertTrack2Srt(_0x153be3, _0x5dba49, _0x47683f) {
  let _0x4003ba = _0x153be3["segments"],
    _0x2a9691;
  let _0x9c3cd4 = { content: null, start: null, end: null };
  let _0x36d598 = "",
    _0x2416e5 = 0x0;
  for (let _0x7f13b0 in _0x4003ba) {
    _0x2a9691 = _0x4003ba[_0x7f13b0];
    _0x9c3cd4["content"] = _0x5dba49[_0x2a9691["material_id"]];
    if (!_0x9c3cd4["content"]) continue;
    _0x9c3cd4["start"] = _0x2a9691["target_timerange"]["start"];
    _0x9c3cd4["end"] =
      _0x9c3cd4["start"] + _0x2a9691["target_timerange"]["duration"];
    _0x9c3cd4["start"] = getSrtTimeText(_0x9c3cd4["start"], _0x47683f);
    _0x9c3cd4["end"] = getSrtTimeText(_0x9c3cd4["end"], _0x47683f);
    _0x2416e5++;
    _0x36d598 += formatSrt(_0x2416e5, _0x9c3cd4);
  }
  return _0x36d598;
}
function convertTrack2Text(_0x4f60c8, _0x22dc9d, _0x1630ef) {
  let _0x58c978 = _0x4f60c8["segments"],
    _0xed1f7f;
  let _0x1f6622 = { content: null, start: null, end: null };
  let _0x30efe7 = "",
    _0x311d00 = 0x0;
  for (let _0x2e5ea9 in _0x58c978) {
    _0xed1f7f = _0x58c978[_0x2e5ea9];
    _0x1f6622["content"] = _0x22dc9d[_0xed1f7f["material_id"]];
    if (!_0x1f6622["content"]) continue;
    _0x311d00++;
    _0x30efe7 += formatSrt2Text(_0x311d00, _0x1f6622);
  }
  return _0x30efe7;
}
function getDownloadLink(_0x38bc07, _0x1c9cf5) {
  let _0x1f8462 = document["createElement"]("a");
  _0x1f8462["innerText"] = "保存到本地" + "\x0d\x0a\x0d\x0a";
  _0x1f8462["download"] = _0x38bc07;
  let _0x3e5760 = new Blob([_0x1c9cf5], { type: "application/octet-stream" });
  _0x1f8462["href"] = URL["createObjectURL"](_0x3e5760);
  return _0x1f8462;
}
function getSrtTimeText(_0x4cf97d, _0x2151fb) {
  if (_0x2151fb) {
    _0x4cf97d = Math["floor"](_0x4cf97d / 0x3e8);
  }
  let _0x70f51 = _0x4cf97d % 0x3e8;
  _0x4cf97d = Math["floor"](_0x4cf97d / 0x3e8);
  let _0x3bd982 = _0x4cf97d % 0x3c;
  _0x4cf97d = Math["floor"](_0x4cf97d / 0x3c);
  let _0x1af4f3 = _0x4cf97d % 0x3c;
  _0x4cf97d = Math["floor"](_0x4cf97d / 0x3c);
  let _0x1eec7a = _0x4cf97d;
  _0x1eec7a = formatDigit(_0x1eec7a, 0x2);
  _0x1af4f3 = formatDigit(_0x1af4f3, 0x2);
  _0x3bd982 = formatDigit(_0x3bd982, 0x2);
  _0x70f51 = formatDigit(_0x70f51, 0x3);
  return _0x1eec7a + ":" + _0x1af4f3 + ":" + _0x3bd982 + "," + _0x70f51;
}
function formatSrt(_0x4a213e, _0xe005d1) {
  return (
    _0x4a213e +
    RN +
    _0xe005d1["start"] +
    "\x20-->\x20" +
    _0xe005d1["end"] +
    RN +
    _0xe005d1["content"] +
    RN +
    RN
  );
}
function formatSrt2Text(_0x266e79, _0x2f3d42) {
  return _0x2f3d42["content"] + RN;
}
function formatDigit(_0x1c3fc9, _0x2e0b99) {
  let _0x2cdf92 = _0x1c3fc9["toString"]();
  while (_0x2cdf92["length"] < _0x2e0b99) {
    _0x2cdf92 = "0" + _0x2cdf92;
  }
  return _0x2cdf92;
}
function importTxt() {}
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
    var _0x341656 = new FileReader();
    _0x341656["onload"] = function () {
      document["getElementById"]("input-text")["value"] = this["result"];
    };
    _0x341656["readAsText"](
      _0x52b4c2,
      document["getElementById"]("encoding")["value"]
    );
    _0x341656 = null;
  }
}
var dropbox = document["getElementById"]("input-text");
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
