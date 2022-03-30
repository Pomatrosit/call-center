import IMask from "imask";

let phoneMask: any;
let lastNameMask: any;
let firstNameMask: any;
let middleNameMask: any;
let regionMask: any;
let cityMask: any;

export const applyMasks = (): void => {
  const $pnoneInput: HTMLInputElement | null = document.querySelector(
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

  const $lastNameInput: HTMLInputElement | null = document.querySelector(
    'input[name="lastName"]'
  );
  if ($lastNameInput) {
    lastNameMask = IMask($lastNameInput, {
      mask: /[А-Яа-я\-\s]+$/,
    });
  }

  const $firstNameInput: HTMLInputElement | null = document.querySelector(
    'input[name="firstName"]'
  );
  if ($firstNameInput) {
    firstNameMask = IMask($firstNameInput, {
      mask: /[А-Яа-я\-\s]+$/,
    });
  }

  const $middleNameInput: HTMLInputElement | null = document.querySelector(
    'input[name="middleName"]'
  );
  if ($middleNameInput) {
    middleNameMask = IMask($middleNameInput, {
      mask: /[А-Яа-я\-\s]+$/,
    });
  }

  const $regionInput: HTMLInputElement | null = document.querySelector(
    'input[name="region"]'
  );
  if ($regionInput) {
    regionMask = IMask($regionInput, {
      //eslint-disable-next-line
      mask: /[А-Яа-я\-\.\,\s]+$/,
    });
  }

  const $cityInput: HTMLInputElement | null =
    document.querySelector('input[name="city"]');
  if ($cityInput) {
    cityMask = IMask($cityInput, {
      //eslint-disable-next-line
      mask: /[А-Яа-я\-\.\,\s]+$/,
    });
  }
};

export const destroyMasks = (): void => {
  phoneMask.destroy();
  lastNameMask.destroy();
  firstNameMask.destroy();
  middleNameMask.destroy();
  regionMask.destroy();
  cityMask.destroy();
};
