export const disableBrowserAutocomplete = (
  $root: HTMLElement | null = null
): void => {
  const root = $root ? $root : document;

  const $inputs = root.querySelectorAll("input");
  $inputs.forEach(($input) => {
    $input?.setAttribute("autocomplete", "off");
  });
};
