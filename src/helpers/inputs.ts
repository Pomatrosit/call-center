export const disableBrowserAutocomplete = (): void => {
  const $inputs = document.querySelectorAll("input");
  $inputs.forEach(($input) => {
    $input?.setAttribute("autocomplete", "off");
  });
};
