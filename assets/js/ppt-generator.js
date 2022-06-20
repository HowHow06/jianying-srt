const primaryElement = document.getElementById("input-text");
const defaultSecondaryElement = document.getElementById("output-temp");
const backgroundImageElement = document.getElementById("uploadBackgroundImage");
const backgroundColorElement = document.getElementById("colorPickerBackground");
const advancedPrimaryOptionElement = document.getElementById(
  "txt-advanced-primary-options"
);
const advancedSecondaryOptionElement = document.getElementById(
  "txt-advanced-secondary-options"
);
const DEFAULT_BACKGROUND_COLOR = "000000";
const DEFAULT_FONT_COLOR = "FFFFFF";
const DEFAULT_AUTHOR = "Howard Lim";
const DEFAULT_SUBJECT = "Lyrics Presentation - Generated by PPT Generator";
const DEFAULT_TITLE = "PPT Generator Presentation";
const DEFAULT_PPT_LAYOUT = "LAYOUT_16x9";
const DEFAULT_LINE_COUNT_PER_ROW = 2;
const LYRIC_POSITION = {
  UPPER: "upper",
  LOWER: "lower",
};
const LYRIC_TYPE = {
  PRIMARY: "primary",
  SECONDARY: "secondary",
};

const DEFAULT_TEXT_OPTION = {
  x: "0%",
  w: "100%",
  bold: true,
  color: DEFAULT_FONT_COLOR,
  fontFace: "Microsoft Yahei",
  fontSize: "48",
  align: "center",
  isTextBox: true,
};

function onGeneratePptClick() {
  // Swal.fire({
  //   title: "Please Wait...",
  //   html: "Generating PPT...",
  //   didOpen: () => {
  //     Swal.showLoading();
  //   },
  // });

  const hasSecondaryContent = !document.getElementById(
    "chbHasIgnoreSecondaryContent"
  ).checked;

  generateFullPpt({ hasSecondaryContent: hasSecondaryContent });
  // Swal.close();
}

// to convert file to data url
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

// this function requires pptxgen library imported at the first place
async function generateFullPpt({ hasSecondaryContent = true }) {
  const linePerRow = DEFAULT_LINE_COUNT_PER_ROW;

  const primaryLyric = primaryElement.value;
  const secondaryLyric = document.getElementById("outputPinyin")
    ? document.getElementById("outputPinyin").value
    : defaultSecondaryElement.value;

  const primaryLinesArray = primaryLyric.split("\n");
  const secondaryLinesArray = secondaryLyric.split("\n");

  if (
    hasSecondaryContent &&
    primaryLinesArray.length !== secondaryLinesArray.length &&
    !confirm(
      `主内容有 ${primaryLinesArray.length} 行，而副内容有 ${secondaryLinesArray.length} 行，确定继续吗？`
    )
  ) {
    return;
  }

  // 1. Create a new Presentation
  let pres = new PptxGenJS();
  pres.author = DEFAULT_AUTHOR;
  pres.subject = DEFAULT_SUBJECT;
  pres.title = DEFAULT_TITLE;
  pres.layout = DEFAULT_PPT_LAYOUT;

  // 2. Create Slides Master with Background
  const backgroundProp = await GetPptBackgroundProp();

  pres.defineSlideMaster({
    title: "MASTER_SLIDE",
    background: backgroundProp,
  });

  // 3.0 Get Options
  const customPrimaryOption = GetCustomPrimaryOption();
  const customSecondaryOption = GetCustomSecondaryOption();

  // 3. Create Slides
  primaryLinesArray.forEach((primaryLine, index) => {
    let slide = GetWorkingSlide({ pres, currentIndex: index, linePerRow });

    const currentLyricPosition =
      index % linePerRow == 0 ? LYRIC_POSITION.UPPER : LYRIC_POSITION.LOWER;

    // add primary content
    AddLyricToSlide({
      slide,
      line: primaryLine,
      type: LYRIC_TYPE.PRIMARY,
      lyricPosition: currentLyricPosition,
      primaryOption: customPrimaryOption,
      secondaryOption: customSecondaryOption,
    });

    if (hasSecondaryContent) {
      //add secondary content
      AddLyricToSlide({
        slide,
        line: secondaryLinesArray[index] ?? "",
        type: LYRIC_TYPE.SECONDARY,
        lyricPosition: currentLyricPosition,
        primaryOption: customPrimaryOption,
        secondaryOption: customSecondaryOption,
      });
    }
  });

  //   4. Save the Presentation
  pres.writeFile({ fileName: "Sample Presentation.pptx" });
}

async function GetPptBackgroundProp() {
  const backgroundProp = {
    color: backgroundColorElement?.value ?? DEFAULT_BACKGROUND_COLOR,
  };
  return backgroundImageElement.value !== ""
    ? {
        ...backgroundProp,
        data: await getBase64(backgroundImageElement.files[0]),
      }
    : backgroundProp;
}

function GetCustomPrimaryOption() {
  let option;
  try {
    option = JSON.parse(advancedPrimaryOptionElement.value);
  } catch (err) {
    console.log(err);
    alert(
      "Error in compiling Primary Advanced Option, please check your input"
    );
    return;
  }
  return option;
}

function GetCustomSecondaryOption() {
  let option;
  try {
    option = JSON.parse(advancedSecondaryOptionElement.value);
  } catch (err) {
    console.log(err);
    alert(
      "Error in compiling Secondary Advanced Option, please check your input"
    );
    return;
  }
  return option;
}

function GetWorkingSlide({ pres, currentIndex, linePerRow }) {
  const remainder = currentIndex % linePerRow; //create new slide if remainder is 0
  if (remainder === 0) {
    return pres.addSlide({ masterName: "MASTER_SLIDE" });
  }
  const slidesCount = pres.slides.length;
  return pres.getSlide(slidesCount);
}

function AddLyricToSlide({
  slide,
  line,
  type = LYRIC_TYPE.PRIMARY,
  lyricPosition = LYRIC_POSITION.UPPER,
  primaryOption,
  secondaryOption,
}) {
  let customOption;
  if (type == LYRIC_TYPE.PRIMARY) {
    const customYValue =
      lyricPosition == LYRIC_POSITION.UPPER
        ? primaryOption.y?.upper
        : primaryOption.y?.lower;

    customOption = {
      ...primaryOption,
      y: customYValue,
    };
  } else if (type == LYRIC_TYPE.SECONDARY) {
    const customYValue =
      lyricPosition == LYRIC_POSITION.UPPER
        ? secondaryOption.y?.upper
        : secondaryOption.y?.lower;

    customOption = {
      ...secondaryOption,
      y: customYValue,
    };
  }

  const finalOption = { ...DEFAULT_TEXT_OPTION, ...customOption };
  // had to do like below because somehow the shadow value cannot be parsed correctly

  slide.addText(line, {
    ...finalOption,
    shadow: {
      ...(finalOption.shadow ?? null),
      type: "outer",
      blur: finalOption.shadow?.blur ?? 3,
      offset: finalOption.shadow?.offset ?? 3,
      angle: finalOption.shadow?.angle ?? 45,
      opacity: finalOption.shadow?.opacity ?? 0.5,
    },
  });
}

//set default settings
$(document).ready(function () {
  const primaryDefaultOption = {
    x: "0%",
    y: {
      upper: "27%",
      lower: "55%",
    },
    bold: true,
    color: "FFFFFF",
    fontFace: "Microsoft Yahei",
    fontSize: 48,
    outline: { size: "0", color: "FFFFFF" },
    shadow: {
      type: "outer",
      color: "000000",
      blur: 3,
      offset: 3,
      angle: 45,
      opacity: "0.5",
    },
    charSpacing: 2,
  };
  const secondaryDefaultOption = {
    x: "0%",
    y: {
      upper: "37%",
      lower: "65%",
    },
    bold: true,
    color: "FFFFFF",
    fontFace: "Microsoft Yahei",
    fontSize: 24, //28 for national park
    outline: { size: "0", color: "FFFFFF" },
    shadow: {
      type: "outer",
      color: "000000",
      blur: 3,
      offset: 3,
      angle: 45,
      opacity: "0.5",
    },
    charSpacing: 0,
  };
  advancedPrimaryOptionElement.value = JSON.stringify(
    primaryDefaultOption,
    null,
    4
  );
  advancedSecondaryOptionElement.value = JSON.stringify(
    secondaryDefaultOption,
    null,
    4
  );
});