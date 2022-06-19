let inputText = document["getElementById"]("input-text");
let hintSpan = document["getElementById"]("rn-hint"); //hint element
let outputDivArray = [];
let RN = "\x0d\x0a"; //default is windows
const extraXmlRegex = /(<[^><]+>)/g;

// for changing next line
function onChange(lineSeperator) {
  switch (lineSeperator) {
    case "rn": //windows
      RN = "\x0d\x0a";
      break;
    case "n": //linux
      RN = "\x0a";
      break;
    default:
  }
  if (outputDivArray["length"]) {
    //show hint element when the output is not empty
    hintSpan["style"]["display"] = "inline-block";
  }
}

function onClearClick() {
  inputText["value"] = "";
}

//for srt
function onGenerateClick() {
  try {
    let tempSrtNode = document["getElementById"]("texttosrt-temp");
    if (tempSrtNode) {
      tempSrtNode["parentNode"]["removeChild"](tempSrtNode);
      // console["log"]("Removed default output");
    }
    hintSpan["style"]["display"] = "none"; //hide hint

    let rawInput;
    while (outputDivArray["length"]) {
      rawInput = outputDivArray["pop"]();
      rawInput["parentNode"]["removeChild"](rawInput);
    }
    rawInput = JSON["parse"](inputText["value"]);
    let srtObject = convertJSON2SRT(rawInput);
    let srtText;
    for (let srtNode in srtObject) {
      srtText = srtObject[srtNode];
      rawInput = document["createElement"]("div");
      rawInput["innerHTML"] =
        "<textarea\x20class=\x22texttosrt\x22\x20readonly>" +
        srtText +
        "</textarea>";
      rawInput["appendChild"](
        getDownloadLink("jy_" + srtNode + ".srt", srtText)
      );
      document["getElementById"]("jytosrt")["appendChild"](rawInput);
      outputDivArray["push"](rawInput);
    }
    console["log"]("Successfully generated SRT!");
  } catch (err) {
    console["log"](err);
    alert("Error in compiling JSON, please check your file/input");
  }
}

//for txt
function onGenerateTextClick() {
  try {
    let tempOutputNode = document["getElementById"]("texttosrt-temp");
    if (tempOutputNode) {
      tempOutputNode["parentNode"]["removeChild"](tempOutputNode);
      // console["log"]("Removed default output");
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
    console["log"]("Successfully Generated TXT!");
  } catch (_0x4e0018) {
    console["log"](_0x4e0018);
    alert("Error in compiling JSON, please check your file/input");
  }
}

function convertJSON2SRT(rawInput) {
  let operatingSystem = rawInput["platform"]["os"];
  let srtContentObject = {},
    srtContent = rawInput["materials"]["texts"];
  for (let srtLine in srtContent) {
    srtContentObject[srtContent[srtLine]["id"]] =
      srtContent[srtLine]["content"];
  }
  let tracks = rawInput["tracks"],
    tempTrack;
  let srtObject = {};
  for (let trackNode in tracks) {
    tempTrack = tracks[trackNode];
    srtContent = convertTrack2Srt(tempTrack, srtContentObject, operatingSystem);
    if (srtContent) {
      srtObject[tempTrack["id"]] = srtContent;
    }
  }
  return srtObject;
}

function convertJSON2Text(rawInput) {
  let operatingSystem = rawInput["platform"]["os"];
  let rawSrtObject = {},
    textLines = rawInput["materials"]["texts"];
  for (let textLine in textLines) {
    rawSrtObject[textLines[textLine]["id"]] = textLines[textLine]["content"];
  }
  let tracks = rawInput["tracks"],
    tempTrack;
  let subtitleOutputObject = {};
  for (let trackNode in tracks) {
    tempTrack = tracks[trackNode];
    textLines = convertTrack2Text(tempTrack, rawSrtObject, operatingSystem);
    if (textLines) {
      subtitleOutputObject[tempTrack["id"]] = textLines;
    }
  }
  return subtitleOutputObject;
}

function convertTrack2Srt(track, rawSubtitleObject, operatingSystem) {
  let segments = track["segments"],
    _0x2a9691;
  let srtItemObject = {
    content: null,
    start: null,
    end: null,
  };
  let _0x36d598 = "",
    _0x2416e5 = 0x0;
  for (let segmentNode in segments) {
    _0x2a9691 = segments[segmentNode];
    srtItemObject["content"] = rawSubtitleObject[_0x2a9691["material_id"]];
    if (!srtItemObject["content"]) {
      continue;
    }
    srtItemObject["content"] = srtItemObject["content"].replace(
      extraXmlRegex,
      ""
    );
    srtItemObject["start"] = _0x2a9691["target_timerange"]["start"];
    srtItemObject["end"] =
      srtItemObject["start"] + _0x2a9691["target_timerange"]["duration"];
    srtItemObject["start"] = getSrtTimeText(
      srtItemObject["start"],
      operatingSystem
    );
    srtItemObject["end"] = getSrtTimeText(
      srtItemObject["end"],
      operatingSystem
    );
    _0x2416e5++;
    _0x36d598 += formatSrt(_0x2416e5, srtItemObject);
  }
  return _0x36d598;
}

function convertTrack2Text(track, rawSubtitleObject, operatingSystem) {
  let segments = track["segments"],
    _0xed1f7f;
  let subtitleObject = {
    content: null,
    start: null,
    end: null,
  };
  let _0x30efe7 = "",
    _0x311d00 = 0x0;
  for (let segmentNode in segments) {
    _0xed1f7f = segments[segmentNode];
    subtitleObject["content"] = rawSubtitleObject[_0xed1f7f["material_id"]];
    if (!subtitleObject["content"]) {
      continue;
    }
    subtitleObject["content"] = subtitleObject["content"].replace(
      extraXmlRegex,
      ""
    );
    _0x311d00++;
    _0x30efe7 += formatSrt2Text(_0x311d00, subtitleObject);
  }
  return _0x30efe7;
}

function getDownloadLink(_0x38bc07, _0x1c9cf5) {
  let anchorElement = document["createElement"]("a");
  const icon = document.createElement("i");
  const text = document.createElement("span");
  icon.className = "fa-solid fa-download";
  text.innerText = " Download File " + "\x0d\x0a\x0d\x0a";
  anchorElement.appendChild(icon);
  anchorElement.appendChild(text);
  anchorElement["download"] = _0x38bc07;
  let _0x3e5760 = new Blob([_0x1c9cf5], {
    type: "application/octet-stream",
  });
  anchorElement["href"] = URL["createObjectURL"](_0x3e5760);
  return anchorElement;
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

function formatSrt(documentIndex, srtJSON) {
  return (
    documentIndex +
    RN +
    srtJSON["start"] +
    "\x20-->\x20" +
    srtJSON["end"] +
    RN +
    srtJSON["content"] +
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
