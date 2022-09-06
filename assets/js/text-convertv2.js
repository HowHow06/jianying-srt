var btnV = "转换成拼音";
function ShowData(
  str1,
  str2,
  str3,
  str4,
  str5,
  str6,
  str7,
  str8,
  str9,
  str10,
  str11,
  str12,
  str13,
  str14,
  str15,
  str16,
  str17,
  str18,
  str19,
  str20,
  str21,
  str22,
  str23,
  str24,
  str25,
  str26,
  str27,
  str28
) {
  if ($("#submit").val() == "转换中……") return;
  if (str1.split("\n").length - 1 > 2000) return alert("换行不要超过2000次！");
  if (str1.length > 0) {
    $("#wait").fadeIn(100);
    $("#submit").val("转换中……");
  } else {
    $("#py").html("");
    return;
  }
  var xmlhttp;
  if (window.XMLHttpRequest) {
    xmlhttp = new XMLHttpRequest();
  } else {
    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
  }
  xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState == 4) {
      if (xmlhttp.status == 200) {
        $("#py").html(xmlhttp.responseText);
        if (/(background-color|captchashow)/.test(xmlhttp.responseText))
          $(".dayin,#copy").css("display", "none");
        else {
          if (
            (str12 == "1" && (str19 == "2" || str19 == "3")) ||
            str20 == "1" ||
            str22 == "1"
          )
            $("#copy").css("display", "none");
          else $("#copy").css("display", "inline-block");
          if (/(Android|iOS|iPhone|iPad)/i.test(navigator.userAgent))
            $(".dayin").css("display", "none");
          else {
            $("input[name=content]").val($("#py").html());
            var hzzsstr = $("input[name=hzzs]").attr("checked")
              ? JSON.stringify([
                  $("#c1").val(),
                  $("#c2").val(),
                  $("#c3").val(),
                  $("#c4").val(),
                  $("#c5").val(),
                ])
              : "";
            $("input[name=cs]").val(
              JSON.stringify({
                duizhao: str9,
                tk: str12,
                tzg: str20,
                hzzs: hzzsstr,
                dzms: str26,
              })
            );
            $(".dayin").css("display", "inline-block");
          }
        }
        setColor("");
        setColorOfHZ("", "");
      } else if (xmlhttp.status == 403) {
        $("#py").html("被拒绝！请明天再来。");
        $(".dayin,#copy").css("display", "none");
      }
      $("#wait").fadeOut(500);
      $("#submit").val(btnV);
    }
  };
  xmlhttp.open("POST", "show.php", true);
  xmlhttp.timeout = 10000;
  xmlhttp.ontimeout = function () {
    $("#py").html("");
    $("#submit").val("重试");
    $("#wait").fadeOut(100);
    $(".dayin,#copy").css("display", "none");
  };
  var captcha = $("#rotateimg").length > 0 ? $("#rotateimg").val() : "";
  xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xmlhttp.send(
    "t=" +
      encodeURIComponent(str1) +
      "&d=" +
      str2 +
      "&s=" +
      str3 +
      "&k=" +
      str4 +
      "&b=" +
      str5 +
      "&h=" +
      str6 +
      "&u=" +
      str7 +
      "&v=" +
      str8 +
      "&y=" +
      str9 +
      "&z=" +
      str10 +
      "&f=" +
      str11 +
      "&p=" +
      str12 +
      "&g=" +
      str13 +
      "&q=" +
      str14 +
      "&r=" +
      str15 +
      "&j=" +
      str16 +
      "&x=" +
      str17 +
      "&u_=" +
      str18 +
      "&p_=" +
      str19 +
      "&tzg=" +
      str20 +
      "&tzgzt=" +
      str21 +
      "&sxsg=" +
      str22 +
      "&sxsgxx=" +
      str23 +
      "&f_=" +
      str24 +
      "&hzzs=" +
      str25 +
      "&zydzms=" +
      str26 +
      "&zczy=" +
      str27 +
      "&yzdy=" +
      str28 +
      "&token=fac6e5829c6dedacc8f6af2e1318c7d6&captcha=" +
      captcha
  );
}
function keysubmit() {
  ShowData(
    $("#text").val(),
    $("#dx").val(),
    ValueGroup("sd"),
    ValueGroup("kg"),
    ValueGroup("bd"),
    ValueGroup("hh"),
    ValueGroup("yu"),
    ValueGroup("gz"),
    ValueGroup("zy"),
    ValueGroup("szm"),
    ValueGroup("fyc"),
    ValueGroup("tk"),
    ValueGroup("gy"),
    ValueGroup("qzy"),
    ValueGroup("rm"),
    ValueGroup("jx"),
    ValueGroup("xs"),
    ValueGroup("yu_"),
    ValueGroup("tkk"),
    ValueGroup("tianzige"),
    ValueGroup("tzgzt"),
    ValueGroup("sxsg"),
    ValueGroup("sxsgxx"),
    ValueGroup("fyc_z"),
    ValueGroup("hzzs"),
    ValueGroup("zydzms"),
    ValueGroup("zczy"),
    ValueGroup("yzdy")
  );
}
function ValueGroup(name) {
  var obj;
  obj = document.getElementsByName(name);
  if (obj != null) {
    var i;
    for (i = 0; i < obj.length; i++) {
      if (obj[i].checked) {
        return obj[i].value;
      }
    }
  }
  return null;
}
tooltip = {
  tipTag: "a",
  tipID: "tip",
  offsetX: -82,
  offsetY: 15,
  tip: null,
};
tooltip.init = function () {
  var tipBox = document.getElementById(this.tipID);
  if (!tipBox) {
    tipBox = document.createElement("div");
    tipBox.setAttribute("id", this.tipID);
    tipBox.setAttribute("class", "style");
    document.getElementsByTagName("body").item(0).appendChild(tipBox);
  }
  this.tip = document.getElementById(this.tipID);
  if (this.tip)
    window.onclick = function (evt) {
      tooltip.move(evt);
    };
};
tooltip.move = function (evt) {
  if (!$(evt.target).closest(tooltip.tipTag).length == 0) {
    var x = 0,
      y = 0,
      oX = this.offsetX,
      w = document.documentElement.clientWidth;
    x = evt.pageX;
    y = evt.pageY;
    if (w < 1440) {
      if (x < w / 2) oX = 0;
      else oX = this.tip.offsetWidth;
    } else oX = this.tip.offsetWidth;
    this.tip.style.left = x - oX + "px";
    this.tip.style.top = y + this.offsetY + "px";
  }
};
tooltip.show = function (text) {
  if (!this.tip) return;
  this.tip.innerHTML = text;
  this.tip.style.display = "block";
};
tooltip.hide = function () {
  if (!this.tip) return;
  this.tip.innerHTML = "";
  this.tip.style.display = "none";
};
function ct(e) {
  var py = e.getAttribute("tiptitle");
  var id = e.getAttribute("id");
  var divAdd = e.getAttribute("class") ? ' class="biandiao"' : "";
  tooltip.show(
    '<span id="n">' +
      id +
      "</span><div" +
      divAdd +
      '><span onclick="x(this)">' +
      py.replace(/ /g, '</span><span onclick="x(this)">') +
      "</span></div>"
  );
}
function x(e) {
  var pyid = $("#n").html(),
    tpy = e.innerHTML,
    sd = pysd(tpy);
  $("#" + pyid).html(tpy);
  if (
    $("input[name='zy']").attr("checked") &&
    $("input[name='hzzs']").attr("checked")
  ) {
    if ($("#" + pyid).parents("ruby").length)
      $("#" + pyid)
        .parents("ruby")
        .find("span")
        .attr("class", "c c" + sd)
        .css("color", $("#c" + sd).val());
    else {
      if ($("input[name='zczy']").attr("checked"))
        $("#z" + pyid)
          .attr("class", "c c" + sd)
          .css("color", $("#c" + sd).val());
      else {
        var node = $("#" + pyid)
          .parent()
          .next();
        if (!$("input[name='tk']").attr("checked")) {
          if ($("input[name='zydzms']:checked").val() == "1")
            node = node.children("div:last");
          else
            node = $("#" + pyid)
              .parent()
              .prev();
        }
        node.attr("class", "c" + sd).css("color", $("#c" + sd).val());
      }
    }
  } else {
    if ($("#" + pyid).parents("ruby").length)
      $("#" + pyid)
        .parents("ruby")
        .find("span")
        .attr("class", "c")
        .css("color", "#111");
    else {
      if (!$("input[name='tk']").attr("checked"))
        $("#" + pyid)
          .parent()
          .next()
          .children("div:last")
          .removeAttr("class")
          .css("color", "#111");
    }
  }
  $("input[name=content]").val($("#py").html());
}
function et(e) {
  var ts = e.getAttribute("tiptitle");
  tooltip.show('<div class="ts">' + ts + "</div>");
}
function pysd(py) {
  var tone;
  if (/[āēīōūǖ]/.test(py)) tone = 1;
  else if (/[áéíóúǘńḿ]/.test(py)) tone = 2;
  else if (/[ǎěǐǒǔǚň]/.test(py)) tone = 3;
  else if (/[àèìòùǜǹ\u0300]/.test(py)) tone = 4;
  else tone = 5;
  return tone;
}
function copy(id) {
  var t = $("#" + id).html();
  if (t == "") return false;
  $("#copytext").html(t);
  var element = document.getElementById("copytext"),
    error = "浏览器不支持，请手动复制！";
  if (document.body.createTextRange) {
    var range = document.body.createTextRange();
    range.moveToElementText(element);
    range.select();
  } else if (window.getSelection) {
    var selection = window.getSelection(),
      range = document.createRange();
    range.selectNodeContents(element);
    selection.removeAllRanges();
    selection.addRange(range);
  } else return alert(error);
  try {
    if (document.execCommand("copy", false, null)) {
      $("#copytip").text("已复制！");
    } else alert(error);
  } catch (err) {
    alert(error);
  }
}
function setColor(c) {
  if (c != "") localStorage.setItem("pydyz", c);
  if (localStorage.getItem("pydyz")) {
    $("#py a[class!=dyj]").css("color", localStorage.getItem("pydyz"));
    $("#py a[class=bd]").css("color", "fuchsia");
  }
}
function setColorOfHZ(n, c) {
  if (c != "") {
    localStorage.setItem(n, c);
    $("#py ." + n).css("color", localStorage.getItem(n));
  } else {
    for (var i = 1; i < 6; i++) {
      var v = localStorage.getItem("c" + i);
      if (v) {
        $("#py .c" + i).css("color", v);
        $("#c" + i).val(v);
      }
    }
  }
}
function dxqh(e) {
  btnV = e.value == "5" ? "转注音符号" : "转换成拼音";
  $("#submit").val(btnV);
  if (e.value == "5") {
    $("#yu,#gz,#sxsg,.sxsgxx,#tk,.tk,#rmpy").css("display", "none");
    $("input[name='rm']").attr("checked", false);
    rmpy(0);
  } else {
    $("#yu,#tk,#rmpy").css("display", "block");
    if (!$("input[name='sd']").attr("checked"))
      $("#gz").css("display", "block");
    if (!$("input[name='zy']").attr("checked"))
      $("#sxsg").css("display", "block");
    if ($("input[name='tk']").attr("checked")) $(".tk").css("display", "block");
    if ($("input[name='sxsg']").attr("checked"))
      $(".sxsgxx").css("display", "block");
  }
}
