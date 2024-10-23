const panValidatorRegex = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/;
const aadharValidatorRegex = /^[2-9]{1}[0-9]{3}[0-9]{4}[0-9]{4}$/;
const mobileNumberValidatorRegex = /^[0-9]{10}$/;
const nameValidatorRegex = /^[a-zA-Z]{1}[a-zA-Z \\s]{1,50}$/;

const emailValidatorRegex =
  /^(?:[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+\.)*[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+@(?:(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!\.)){0,61}[a-zA-Z0-9]?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!$)){0,61}[a-zA-Z0-9]?)|(?:\[(?:(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\.){3}(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\]))$/;

const passwordValidatorRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

export {
  panValidatorRegex,
  aadharValidatorRegex,
  mobileNumberValidatorRegex,
  nameValidatorRegex,
  emailValidatorRegex,
  passwordValidatorRegex,
};
