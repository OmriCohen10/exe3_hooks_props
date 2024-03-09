import { VALIDATIONS, months } from "./collections";

//generic validation function
export function valueValidation(currentInput) {
  const key = currentInput.name;
  if (VALIDATIONS[key].regex.test(currentInput.value)) return true;
  else return false;
}

export function handleBday(bDay) {
  const date = bDay.split("-");
  return `${date[2]} ${months[date[1] - 1]}, ${date[0]}`;
}
