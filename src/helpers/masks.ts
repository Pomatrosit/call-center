import IMask from "imask";

let phoneMask: any;
let lastNameMask: any;
let firstNameMask: any;
let middleNameMask: any;
let regionMask: any;
let cityMask: any;
let passportSeriesMask: any;
let passportNumberMask: any;
let passportCodeMask: any;
let creditDurationMask: any;
let creditAmountMask: any;

export const applyMasks = (): void => {
  const $root: HTMLDivElement | null = document.querySelector(".new-bid");

  if ($root) {
    const $pnoneInput: HTMLInputElement | null = $root.querySelector(
      'input[name="phone"]'
    );
    if ($pnoneInput) {
      phoneMask = IMask($pnoneInput, {
        mask: "#@000000000",
        definitions: {
          "#": /[7-8]/,
          "@": /3|4|8|9/,
        },
      });
    }

    const $lastNameInput: HTMLInputElement | null = $root.querySelector(
      'input[name="lastName"]'
    );
    if ($lastNameInput) {
      lastNameMask = IMask($lastNameInput, {
        mask: /[А-Яа-я\-\s]+$/,
      });
    }

    const $firstNameInput: HTMLInputElement | null = $root.querySelector(
      'input[name="firstName"]'
    );
    if ($firstNameInput) {
      firstNameMask = IMask($firstNameInput, {
        mask: /[А-Яа-я\-\s]+$/,
      });
    }

    const $middleNameInput: HTMLInputElement | null = $root.querySelector(
      'input[name="middleName"]'
    );
    if ($middleNameInput) {
      middleNameMask = IMask($middleNameInput, {
        mask: /[А-Яа-я\-\s]+$/,
      });
    }

    const $regionInput: HTMLInputElement | null = $root.querySelector(
      'input[name="region"]'
    );
    if ($regionInput) {
      regionMask = IMask($regionInput, {
        //eslint-disable-next-line
        mask: /[А-Яа-я\-\.\,\s]+$/,
      });
    }

    const $cityInput: HTMLInputElement | null =
      $root.querySelector('input[name="city"]');
    if ($cityInput) {
      cityMask = IMask($cityInput, {
        //eslint-disable-next-line
        mask: /[А-Яа-я\-\.\,\s]+$/,
      });
    }

    const $passportSeriesInput: HTMLInputElement | null = $root.querySelector(
      'input[name="passportSeries"]'
    );
    if ($passportSeriesInput) {
      passportSeriesMask = IMask($passportSeriesInput, {
        mask: "0000",
      });
    }

    const $passportNumberInput: HTMLInputElement | null = $root.querySelector(
      'input[name="passportNumber"]'
    );
    if ($passportNumberInput) {
      passportNumberMask = IMask($passportNumberInput, {
        mask: "000000",
      });
    }

    const $passportCodeInput: HTMLInputElement | null = $root.querySelector(
      'input[name="passportCode"]'
    );
    if ($passportCodeInput) {
      passportCodeMask = IMask($passportCodeInput, {
        mask: "000-000",
      });
    }

    const $creditDurationInput: HTMLInputElement | null = $root.querySelector(
      'input[name="creditDuration"]'
    );
    if ($creditDurationInput) {
      $creditDurationInput.setAttribute("placeholder", "от 1 до 180 дней");
      creditDurationMask = IMask($creditDurationInput, {
        mask: Number,
        min: 1,
        max: 180,
      });
    }

    const $creditAmountInput: HTMLInputElement | null = $root.querySelector(
      'input[name="creditAmount"]'
    );
    if ($creditAmountInput) {
      $creditAmountInput.setAttribute(
        "placeholder",
        "от 2000 до 100000 рублей"
      );
      creditAmountMask = IMask($creditAmountInput, {
        mask: Number,
        min: 2000,
        max: 100000,
      });
    }
  }
};

export const destroyMasks = (): void => {
  phoneMask.destroy();
  lastNameMask.destroy();
  firstNameMask.destroy();
  middleNameMask.destroy();
  regionMask.destroy();
  cityMask.destroy();
  passportSeriesMask.destroy();
  passportNumberMask.destroy();
  passportCodeMask.destroy();
  creditDurationMask.destroy();
  creditAmountMask.destroy();
};

export const applyWebPhoneMasks = () => {
  const $root: HTMLDivElement | null =
    document.querySelector(".web-phone-root");

  if ($root) {
    const $pnoneInput: HTMLInputElement | null = $root.querySelector(
      'input[name="phone"]'
    );
    if ($pnoneInput) {
      IMask($pnoneInput, {
        mask: "#@000000000",
        definitions: {
          "#": /[7-8]/,
          "@": /3|4|8|9/,
        },
      });
    }

    const $lastNameInput: HTMLInputElement | null = $root.querySelector(
      'input[name="lastName"]'
    );
    if ($lastNameInput) {
      IMask($lastNameInput, {
        mask: /[А-Яа-я\-\s]+$/,
      });
    }

    const $firstNameInput: HTMLInputElement | null = $root.querySelector(
      'input[name="firstName"]'
    );
    if ($firstNameInput) {
      IMask($firstNameInput, {
        mask: /[А-Яа-я\-\s]+$/,
      });
    }

    const $middleNameInput: HTMLInputElement | null = $root.querySelector(
      'input[name="middleName"]'
    );
    if ($middleNameInput) {
      IMask($middleNameInput, {
        mask: /[А-Яа-я\-\s]+$/,
      });
    }

    const $regionInput: HTMLInputElement | null = $root.querySelector(
      'input[name="region"]'
    );
    if ($regionInput) {
      IMask($regionInput, {
        //eslint-disable-next-line
        mask: /[А-Яа-я\-\.\,\s]+$/,
      });
    }

    const $cityInput: HTMLInputElement | null =
      $root.querySelector('input[name="city"]');
    if ($cityInput) {
      IMask($cityInput, {
        //eslint-disable-next-line
        mask: /[А-Яа-я\-\.\,\s]+$/,
      });
    }
  }
};

export const applyMinifiedWebPhoneMasks = () => {
  const $root: HTMLDivElement | null = document.querySelector(
    ".minified-web-phone-root"
  );

  if ($root) {
    const $pnoneInput: HTMLInputElement | null = $root.querySelector(
      'input[name="phone"]'
    );
    if ($pnoneInput) {
      IMask($pnoneInput, {
        mask: "#@000000000",
        definitions: {
          "#": /[7-8]/,
          "@": /3|4|8|9/,
        },
      });
    }
  }
};
